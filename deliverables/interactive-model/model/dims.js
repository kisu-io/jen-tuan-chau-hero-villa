// Villa dimensions in METERS, lifted from the source drawings.
// Origin (0,0,0) at the SW corner of the villa outline, at ground level.
// X = east, Y = up, Z = south->north  (so -Z is "toward the bay")
//
// Grid (east-west bays):  A-B 3.85, B-C 5.50, C-D 5.50, D-E 7.15, E-F 6.05  -> total 28.05 m
// Villa depth (north-south): 12.0 m
// Veranda depth: 2.4 m wrap on south & west
// FFL GF = 2.93, FFL L1 = 6.48, eave = 6.50, ridge = 9.00 (all above +0.00 ground)
// Floor-to-floor derived: 6.48 - 2.93 = 3.55 m (GF); 9.00 - 6.48 = 2.52 m ridge clearance

export const VILLA = {
  width: 28.05,   // E-W total along grid A..F
  depth: 12.0,    // N-S
  // Gridlines from A at x=0
  grid: { A:0, B:3.85, C:9.35, D:14.85, E:22.0, F:28.05 },

  verandaSouth: 2.4,   // south wrap (bay side)
  verandaWest:  2.4,   // west wrap

  baseTop: 0.8,        // top of stone base (schematic ground to plinth)
  gfFfl:   0.0,        // we treat building ground as 0 for simplicity
  gfCeil:  3.55,       // floor-to-floor
  l1Ffl:   3.55,
  l1Eave:  3.55 + 3.00, // 6.55 — will visually match "eave +6.5"
  ridge:   3.55 + 3.00 + 2.5, // 9.05
  wallThk: 0.35,

  porteCochere: { x: 12.35, z: 0, w: 2.5, d: 1.0, h: 3.2 }, // north side notch

  // Site (28 x 30 m plot around villa)
  plotW: 36.0,  // extra margin to show context
  plotD: 30.0,

  // Pool deck
  pool: { x: 6.0, z: -6.0, w: 18.0, d: 5.0, depth: 1.6 },
  deck: { x: 3.0, z: -9.0, w: 24.0, d: 3.2 },

  // Sala pavilion on east lawn
  sala: { x: 30.0, z: -6.0, w: 3.6, d: 3.6, h: 3.4 },
};

// Rooms — rectangles in plan (x, z=south, w, d) at GF
// Note: +z would be NORTH (motor court side); -z is SOUTH (bay).
// The villa bay edge is at z = 0 (south wall); service at z = +12.
// Rooms reference gridlines.
const G = VILLA.grid;
export const ROOMS_GF = [
  { id:'living',   name:'Formal Living',     sub:'bay view · raffia ceiling · 66 m²',  x:G.A+0.2, z:1.8, w:G.C-G.A-0.4, d:6.0 },
  { id:'primary',  name:'Primary Suite',     sub:'teak four-poster · 36 m²',            x:G.A+0.2, z:7.8, w:G.C-G.A-0.4, d:4.0 },
  { id:'foyer',    name:'Foyer',             sub:'double-height · 18 m²',               x:G.C+0.1, z:1.8, w:(G.D-G.C)-0.2, d:3.0 },
  { id:'stair',    name:'Stair',             sub:'to L1',                                x:G.C+0.1, z:4.8, w:1.4, d:2.8 },
  { id:'dining',   name:'Formal Dining',     sub:'10-seat teak · bay view · 40 m²',     x:G.D+0.2, z:1.8, w:(G.E-G.D)-0.4, d:4.0 },
  { id:'study',    name:'Study / Library',   sub:'half-panel teak · 20 m²',              x:G.D+0.2, z:6.0, w:(G.E-G.D)-0.4, d:3.2 },
  { id:'family',   name:'Family Living + Open Kitchen', sub:'Carrara island · 52 m²',     x:G.E+0.2, z:1.8, w:(G.F-G.E)-0.4, d:5.0 },
  { id:'ensuite',  name:'Primary Ensuite',   sub:'freestanding brass tub · 30 m²',       x:G.C+0.2, z:8.0, w:(G.D-G.C)-0.4, d:3.8 },
  { id:'powder',   name:'Powder',            sub:'4 m²',                                 x:G.D+0.2, z:9.2, w:2.5, d:2.0 },
  // northern service spine
  { id:'service',  name:'Service Kitchen',   sub:'+ pantry · 22 m²',                     x:G.B+0.2, z:0.2, w:(G.C-G.B)-0.4, d:1.6, flag:'service' },
  { id:'utility',  name:'Utility',           sub:'8 m²',                                 x:G.A+0.2, z:0.2, w:1.8, d:1.6, flag:'service' },
  { id:'maid',     name:'Maid',              sub:'12 m²',                                x:G.A+2.1, z:0.2, w:G.B-G.A-2.1, d:1.6, flag:'service' },
];

export const ROOMS_L1 = [
  { id:'guestA',   name:'Guest Suite A',  sub:'king · bay view · 32 m²',            x:G.A+0.2, z:1.8, w:(G.B-G.A)+2.0, d:4.5 },
  { id:'guestB',   name:'Guest Suite B',  sub:'king · bay view · 32 m²',            x:G.B+2.2, z:1.8, w:(G.D-G.B)-2.2, d:4.5 },
  { id:'atrium',   name:'Atrium void',    sub:'double-height over foyer',            x:G.C+0.1, z:6.4, w:(G.D-G.C)-0.2, d:2.8, flag:'void' },
  { id:'lounge',   name:'Guest Lounge / Gallery', sub:'half-panel teak · 58 m²',     x:G.D+0.2, z:1.8, w:(G.F-G.D)-0.4, d:4.5 },
  { id:'guestC',   name:'Guest Suite C',  sub:'twin · garden view · 28 m²',         x:G.A+0.2, z:9.2, w:(G.C-G.A)-0.4, d:2.6 },
  { id:'upperLounge', name:'Upper Lounge', sub:'reading nook · +148 m² new extension', x:G.C+0.1, z:9.2, w:(G.F-G.C)-0.2, d:2.6 },
  { id:'corridor', name:'Axial Corridor', sub:'ivory plaster · teak herringbone',    x:G.A+0.2, z:6.4, w:(G.F-G.A)-0.4, d:1.4, flag:'circulation' },
];

// Camera presets (orbit targets in world coords + camera position)
// World Y up. Villa centre ≈ (14, 5, 6).
export const CAMERAS = {
  sw:      { pos:[ -18, 10, -18], look:[14, 3, 2] },
  arrival: { pos:[  14, 6,  28], look:[14, 3, 6] },
  bay:     { pos:[  14, 8, -24], look:[14, 4, 2] },
  axon:    { pos:[  44, 28,-22], look:[14, 4, 4] },
  plan:    { pos:[  14, 55, 6],  look:[14, 0, 6] },
  sala:    { pos:[  42, 4, -14], look:[14, 2, -2] },
};

export const ROOM_CAMS = {
  foyer:   { pos:[ 11, 7, 16], look:[12.5, 3,  3] },
  living:  { pos:[ -8, 5,  -12], look:[ 5,  2,  3] },
  dining:  { pos:[ 15, 5, -10], look:[18, 2,  3] },
  primary: { pos:[ -8, 5,  12], look:[ 5,  2,  9] },
  guestA:  { pos:[ -6, 8,  -10], look:[ 4, 5,  4] },
  guestB:  { pos:[  8, 8,  -10], look:[ 11, 5, 4] },
  lounge:  { pos:[ 32, 8,  -10], look:[ 22, 5, 4] },
};
