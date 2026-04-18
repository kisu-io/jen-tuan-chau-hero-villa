#!/usr/bin/env bash
# Jen Tuan Chau · push-to-github.sh
# Installs gh CLI (if missing), authenticates, creates a PRIVATE repo on GitHub,
# and pushes this folder to it. Safe to re-run.

set -euo pipefail

REPO_NAME="jen-tuan-chau-hero-villa"
REPO_DESC="Jen Tuan Chau · Hero Villa concept package — Capella Sentosa peer on Hạ Long Bay"

cd "$(dirname "$0")"

echo ""
echo "────────────────────────────────────────────────────────────────"
echo "  Jen Tuan Chau · Hero Villa — push to GitHub"
echo "────────────────────────────────────────────────────────────────"
echo ""

# 1. Install gh CLI if needed
if ! command -v gh >/dev/null 2>&1; then
  echo "→ gh CLI not found. Installing via Homebrew…"
  if ! command -v brew >/dev/null 2>&1; then
    echo "✗ Homebrew not found. Install it first from https://brew.sh and re-run."
    exit 1
  fi
  brew install gh
else
  echo "✓ gh CLI already installed ($(gh --version | head -1))"
fi

# 2. Authenticate if needed
if ! gh auth status >/dev/null 2>&1; then
  echo ""
  echo "→ You need to authenticate. A browser window will open."
  echo "   When prompted, choose: GitHub.com → HTTPS → Yes → Login with web browser"
  echo ""
  gh auth login
else
  echo "✓ gh CLI already authenticated as $(gh api user --jq .login)"
fi

# 3. Create the private repo and push (skip if it already exists)
if gh repo view "$REPO_NAME" >/dev/null 2>&1; then
  echo "→ Repo $REPO_NAME already exists on your account. Pushing latest commits…"
  REMOTE_URL=$(gh repo view "$REPO_NAME" --json sshUrl --jq .sshUrl)
  git remote remove origin 2>/dev/null || true
  git remote add origin "$REMOTE_URL"
  git branch -M main
  git push -u origin main
else
  echo "→ Creating private repo: $REPO_NAME"
  gh repo create "$REPO_NAME" \
    --private \
    --description "$REPO_DESC" \
    --source=. \
    --push \
    --remote=origin
fi

# 4. Show result
REPO_URL=$(gh repo view "$REPO_NAME" --json url --jq .url)
echo ""
echo "────────────────────────────────────────────────────────────────"
echo "✓ Done."
echo "   Repo:  $REPO_URL"
echo "   Dashboard (local): open index.html"
echo "────────────────────────────────────────────────────────────────"
open "$REPO_URL" || true
