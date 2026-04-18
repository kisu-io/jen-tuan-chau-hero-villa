// Main entry — scene, camera, renderer, controls, interactions
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ACTIVE, setPalette } from './palette.js';
import { VILLA, ROOMS_GF, ROOMS_L1, CAMERAS, ROOM_CAMS } from './dims.js';
import { buildVilla } from './villa.js';
import { buildLandscape } from './landscape.js';

const stageEl = document.getElementById('stage');
const loadingEl = document.getElementById('loading');
const hudEl = document.getElementById('hud');
const tipEl = document.getElementById('tip');

const scene = new THREE.Scene();
scene.background = new THREE.Color(ACTIVE.p.sky1);
scene.fog = new THREE.Fog(ACTIVE.p.sky2, 60, 180);

const camera = new THREE.PerspectiveCamera(40, stageEl.clientWidth/stageEl.clientHeight, 0.1, 500);
camera.position.set(-18, 10, -18);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(stageEl.clientWidth, stageEl.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
stageEl.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(14, 3, 4);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 4;
controls.maxDistance = 120;
controls.maxPolarAngle = Math.PI * 0.49;

// Lights
const hemi = new THREE.HemisphereLight(0xE8DEC9, 0x6a6658, 0.55);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xfff1d9, 1.15);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -40;
sun.shadow.camera.right = 40;
sun.shadow.camera.top = 40;
sun.shadow.camera.bottom = -40;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 120;
sun.shadow.bias = -0.0003;
scene.add(sun);
scene.add(sun.target);

const fill = new THREE.DirectionalLight(0xc4d7e0, 0.35);
fill.position.set(-20, 15, 20);
scene.add(fill);

// Build model
const villa = buildVilla(scene);
const landscape = buildLandscape(scene);

loadingEl.style.display = 'none';

// --- Sun position driven by time-of-day (6..20) ---
function setTimeOfDay(h){
  // Simple arc: sun rises E (x + z slight), culminates S, sets W
  // Treat 13:00 as solar noon. Angle from -90 (sunrise E, hour 6) to +90 (sunset W, hour 20)
  const t = (h - 6) / 14; // 0..1
  const az = -Math.PI/2 + t * Math.PI;  // radians, east→west
  const elev = Math.sin(t * Math.PI) * 1.1; // 0..~1.1
  const dist = 40;
  sun.position.set(
    Math.cos(az) * dist * 0.8,
    Math.max(2, Math.sin(t*Math.PI) * dist),
    -Math.sin(az) * dist * 0.5 + 6  // bias to bay side
  );
  sun.target.position.set(VILLA.width/2, 3, VILLA.depth/2);
  // Warm up near sunset
  const warm = Math.max(0, 1 - Math.abs((h-13)/7));
  const sunsetFactor = h < 8 ? (8-h)/2 : (h > 18 ? (h-18)/2 : 0);
  const c = new THREE.Color().setHSL(0.11 - sunsetFactor*0.06, 0.55 + sunsetFactor*0.2, 0.75 - sunsetFactor*0.15);
  sun.color.copy(c);
  sun.intensity = 0.6 + Math.sin(Math.max(0, t)*Math.PI)*0.9;

  // Tint sky
  const s1 = new THREE.Color(ACTIVE.p.sky1);
  const sunset = new THREE.Color(0xE9B388);
  const night = new THREE.Color(0x2A3346);
  let skyC;
  if (h < 7) skyC = night.clone().lerp(sunset, (h-6));
  else if (h < 9) skyC = sunset.clone().lerp(s1, (h-7)/2);
  else if (h <= 17) skyC = s1;
  else if (h < 19) skyC = s1.clone().lerp(sunset, (h-17)/2);
  else skyC = sunset.clone().lerp(night, (h-19));
  scene.background = skyC;
  scene.fog.color = skyC;
  renderer.toneMappingExposure = h < 7 || h > 19 ? 0.85 : 1.05;
}
setTimeOfDay(16);

// --- Section cut via clipping planes ---
const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 20);  // disabled state
renderer.localClippingEnabled = true;

function setSectionZ(z /* world z; villa meshes north of z get clipped */){
  // plane normal pointing +Z, constant is -z => keeps points where z < constant.
  clipPlane.normal.set(0, 0, 1);
  clipPlane.constant = -z;
  villa.group.traverse(o=>{
    if (o.material){
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats){
        m.clippingPlanes = z >= VILLA.depth + 0.5 ? null : [clipPlane];
        m.clipShadows = true;
      }
    }
  });
}
setSectionZ(VILLA.depth + 1);

// --- Exploded axon ---
let explodeAmount = 0;
function setExplode(amt /* 0..1 */){
  explodeAmount = amt;
  villa.roof.position.y = amt * 4.0;
  villa.l1.position.y = amt * 2.0;
  // hidden details: lift columns slightly
  villa.veranda.position.y = amt * 1.0;
}

// --- Cameras ---
function flyTo(posArr, lookArr){
  const startP = camera.position.clone();
  const startT = controls.target.clone();
  const endP = new THREE.Vector3(...posArr);
  const endT = new THREE.Vector3(...lookArr);
  let t = 0;
  const dur = 0.8;
  const startTs = performance.now();
  function step(){
    t = Math.min(1, (performance.now() - startTs)/1000/dur);
    const e = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2; // easeInOutQuad
    camera.position.lerpVectors(startP, endP, e);
    controls.target.lerpVectors(startT, endT, e);
    controls.update();
    if (t < 1) requestAnimationFrame(step);
  }
  step();
}

// --- Raycaster for room labels on hover ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let showTips = true;
renderer.domElement.addEventListener('pointermove', (e)=>{
  const r = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  if (!showTips) { tipEl.classList.remove('show'); return; }
  raycaster.setFromCamera(mouse, camera);
  const interactive = villa.getAllInteractive();
  const hits = raycaster.intersectObjects(interactive, false);
  if (hits.length){
    const o = hits[0].object;
    const room = o.userData.room;
    tipEl.innerHTML = `<b>${o.userData.level} · ${room.name}</b>${room.sub}`;
    tipEl.style.left = (e.clientX - r.left) + 'px';
    tipEl.style.top = (e.clientY - r.top) + 'px';
    tipEl.classList.add('show');
  } else {
    tipEl.classList.remove('show');
  }
});
renderer.domElement.addEventListener('pointerleave', ()=> tipEl.classList.remove('show'));

// --- UI wiring ---
function tog(id, cb, initial=true){
  const el = document.getElementById(id);
  if (!el) return;
  let on = initial;
  el.classList.toggle('on', on);
  el.addEventListener('click', ()=>{
    on = !on;
    el.classList.toggle('on', on);
    cb(on);
  });
}

tog('t-roof',   v => villa.roof.visible = v);
tog('t-l1',     v => villa.l1.visible = v);
tog('t-gf',     v => villa.gf.visible = v);
tog('t-veranda',v => villa.veranda.visible = v);
tog('t-shutters', v => {
  // toggle by traversing and matching shutter-sized boxes
  villa.group.traverse(o=>{
    if (o.geometry && o.geometry.type==='BoxGeometry'){
      const p = o.geometry.parameters;
      if ((p.height===1.6 || p.height===1.9) && (p.width===0.9 || p.depth===0.9)) o.visible = v;
      if (p.height===0.02 && (p.width<1 || p.depth<1) && o.material && o.material.color.getHex()===0x1a0e06) o.visible = v;
    }
  });
});
tog('t-landscape', v => { landscape.trees.visible = v; landscape.group.children.forEach(c=>{ if (c!==landscape.karst && c!==landscape.bay) c.visible = v; }); });
tog('t-context',   v => { landscape.karst.visible = v; landscape.bay.visible = v; });
tog('t-rooms',     v => { showTips = v; if (!v) tipEl.classList.remove('show'); });

// Sliders
const rSection = document.getElementById('r-section');
const vSection = document.getElementById('v-section');
rSection.addEventListener('input', ()=>{
  const pct = +rSection.value;
  if (pct === 0){ setSectionZ(VILLA.depth + 1); vSection.textContent = 'off'; }
  else {
    const z = VILLA.depth * (1 - pct/100);
    setSectionZ(z); vSection.textContent = `${z.toFixed(1)} m`;
  }
});

const rTime = document.getElementById('r-time');
const vTime = document.getElementById('v-time');
rTime.addEventListener('input', ()=>{
  const h = +rTime.value;
  const hh = Math.floor(h); const mm = Math.round((h-hh)*60);
  vTime.textContent = `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
  setTimeOfDay(h);
});

const rExplode = document.getElementById('r-explode');
const vExplode = document.getElementById('v-explode');
rExplode.addEventListener('input', ()=>{
  const pct = +rExplode.value / 100;
  setExplode(pct);
  vExplode.textContent = `${(pct*4).toFixed(1)} m`;
});

// Mode buttons (orbit / section / explode quick presets)
document.querySelectorAll('.mode button').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.mode button').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    const m = b.dataset.mode;
    if (m==='orbit'){
      rSection.value = 0; rSection.dispatchEvent(new Event('input'));
      rExplode.value = 0; rExplode.dispatchEvent(new Event('input'));
    } else if (m==='section'){
      rExplode.value = 0; rExplode.dispatchEvent(new Event('input'));
      rSection.value = 55; rSection.dispatchEvent(new Event('input'));
      flyTo(CAMERAS.axon.pos, CAMERAS.axon.look);
    } else if (m==='explode'){
      rSection.value = 0; rSection.dispatchEvent(new Event('input'));
      rExplode.value = 65; rExplode.dispatchEvent(new Event('input'));
      flyTo(CAMERAS.axon.pos, CAMERAS.axon.look);
    }
  });
});

// Camera buttons
document.querySelectorAll('[data-cam]').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('[data-cam],[data-room]').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    const c = CAMERAS[b.dataset.cam];
    if (c){
      flyTo(c.pos, c.look);
      const titleEl = hudEl.querySelector('.n');
      if (titleEl) titleEl.textContent = b.querySelector('.n').textContent;
      hudEl.childNodes[hudEl.childNodes.length-1].textContent = b.querySelector('.d').textContent;
    }
  });
});
document.querySelectorAll('[data-room]').forEach(b=>{
  b.addEventListener('click', ()=>{
    document.querySelectorAll('[data-cam],[data-room]').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    const c = ROOM_CAMS[b.dataset.room];
    if (c){
      flyTo(c.pos, c.look);
      // When focusing a room, hide roof if room is GF
      const isL1 = b.dataset.room.startsWith('guest') || b.dataset.room==='lounge';
      villa.roof.visible = false;
      if (isL1) villa.l1.visible = true; else villa.l1.visible = false;
      villa.gf.visible = true;
      document.getElementById('t-roof').classList.remove('on');
      document.getElementById('t-l1').classList.toggle('on', isL1);
      const titleEl = hudEl.querySelector('.n');
      if (titleEl) titleEl.textContent = b.querySelector('.n').textContent;
      hudEl.childNodes[hudEl.childNodes.length-1].textContent = b.querySelector('.d').textContent;
    }
  });
});

// Tweaks
const twPalette = document.getElementById('tw-palette');
twPalette?.addEventListener('change', ()=>{
  setPalette(twPalette.value);
  location.reload(); // simplest: rebuild with new palette
});
const twTrees = document.getElementById('tw-trees');
twTrees?.addEventListener('click', ()=>{
  const on = !twTrees.classList.contains('on');
  twTrees.classList.toggle('on', on);
  landscape.trees.visible = on;
});
const twFog = document.getElementById('tw-fog');
twFog?.addEventListener('click', ()=>{
  const on = !twFog.classList.contains('on');
  twFog.classList.toggle('on', on);
  scene.fog = on ? new THREE.Fog(ACTIVE.p.sky2, 60, 180) : null;
});

// Resize
function resize(){
  const w = stageEl.clientWidth, h = stageEl.clientHeight;
  camera.aspect = w/h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
window.addEventListener('resize', resize);

// Loop
function animate(){
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Persist camera + time in localStorage so refreshes preserve state
const KEY = 'jtc-model-state-v1';
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
  if (saved.t != null){ rTime.value = saved.t; rTime.dispatchEvent(new Event('input')); }
  if (saved.cam){ camera.position.fromArray(saved.cam); }
  if (saved.tgt){ controls.target.fromArray(saved.tgt); }
} catch(e){}
setInterval(()=>{
  try {
    localStorage.setItem(KEY, JSON.stringify({
      t: +rTime.value,
      cam: camera.position.toArray(),
      tgt: controls.target.toArray(),
    }));
  } catch(e){}
}, 1500);
