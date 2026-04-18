// Villa geometry — builds the 3D massing as a THREE.Group
import * as THREE from 'three';
import { VILLA, ROOMS_GF, ROOMS_L1 } from './dims.js';
import { ACTIVE } from './palette.js';

const mat = (hex, opts={}) => new THREE.MeshStandardMaterial({ color:hex, roughness:opts.rough ?? 0.85, metalness:opts.metal ?? 0.0, flatShading: opts.flat ?? false, transparent:!!opts.transparent, opacity:opts.opacity ?? 1, side: opts.side || THREE.FrontSide });

// Build a simple louvered shutter: a charcoal rectangle with a subtle gradient is fine schematic.
function shutterMaterial(p){
  return mat(p.teak, { rough:0.7 });
}

// A single room floor tile — helps read plan when roof/L1 hidden
function roomFloor(p, room, yBase, isL1){
  const g = new THREE.BoxGeometry(room.w, 0.02, room.d);
  const color = room.flag==='service' ? p.renderShade : (room.flag==='void' ? p.sand : (room.flag==='circulation' ? p.linen : p.renderHi));
  const m = new THREE.Mesh(g, mat(color, {rough:0.9}));
  m.position.set(room.x + room.w/2, yBase + 0.01, room.z + room.d/2 - VILLA.depth/2 + VILLA.depth/2);
  // we want z = room.z (0..12) mapped into world where villa south wall is z=0 and north at +12
  m.position.z = room.z + room.d/2;
  m.receiveShadow = true;
  m.userData = { roomId: room.id, room };
  return m;
}

// Build shutters along a wall line. Returns a Group.
// Orientation: wall along X axis if axis='x', along Z if axis='z'.
// Position bays at given x or z list.
function shutterRow(p, bays, wallAxisValue, y, axis='x', height=1.6){
  const g = new THREE.Group();
  const mShutter = shutterMaterial(p);
  const w = 0.9, t = 0.06;
  for (const bay of bays){
    const geom = new THREE.BoxGeometry(axis==='x'?w:t, height, axis==='x'?t:w);
    const m = new THREE.Mesh(geom, mShutter);
    if (axis==='x'){ m.position.set(bay, y + height/2, wallAxisValue); }
    else           { m.position.set(wallAxisValue, y + height/2, bay); }
    m.castShadow = true;
    g.add(m);

    // slats — thin horizontal lines via repeated thin boxes
    for (let i=0;i<7;i++){
      const slatGeom = new THREE.BoxGeometry(axis==='x'? w*0.95: t*1.1, 0.02, axis==='x'? t*1.1 : w*0.95);
      const slat = new THREE.Mesh(slatGeom, mat(0x1a0e06,{rough:0.9}));
      const sy = y + 0.12 + i*(height-0.2)/6;
      if (axis==='x') slat.position.set(bay, sy, wallAxisValue + (axis==='x'?0.02:0));
      else            slat.position.set(wallAxisValue, sy, bay);
      g.add(slat);
    }
  }
  return g;
}

// Main build
export function buildVilla(scene){
  const p = ACTIVE.p;
  const group = new THREE.Group();
  group.name = 'villa';

  // --- stone base (slightly larger than GF footprint, includes veranda) ---
  const baseGroup = new THREE.Group(); baseGroup.name = 'base';
  const baseW = VILLA.width + VILLA.verandaWest + 0.3;
  const baseD = VILLA.depth + VILLA.verandaSouth + 0.3;
  const baseX = -VILLA.verandaWest - 0.15;
  const baseZ = -VILLA.verandaSouth - 0.15;
  const baseGeom = new THREE.BoxGeometry(baseW, VILLA.baseTop, baseD);
  const baseMesh = new THREE.Mesh(baseGeom, mat(p.base,{rough:0.95,flat:true}));
  baseMesh.position.set(baseX + baseW/2, VILLA.baseTop/2, baseZ + baseD/2);
  baseMesh.castShadow = true; baseMesh.receiveShadow = true;
  baseGroup.add(baseMesh);

  // veranda deck (teak) sitting on top of base — south & west
  const vDeckS = new THREE.Mesh(
    new THREE.BoxGeometry(VILLA.width + VILLA.verandaWest, 0.06, VILLA.verandaSouth),
    mat(p.teakFloor,{rough:0.7}));
  vDeckS.position.set(-VILLA.verandaWest/2 + VILLA.width/2, VILLA.baseTop + 0.03, -VILLA.verandaSouth/2);
  vDeckS.receiveShadow = true;
  baseGroup.add(vDeckS);
  const vDeckW = new THREE.Mesh(
    new THREE.BoxGeometry(VILLA.verandaWest, 0.06, VILLA.depth),
    mat(p.teakFloor,{rough:0.7}));
  vDeckW.position.set(-VILLA.verandaWest/2, VILLA.baseTop + 0.03, VILLA.depth/2);
  vDeckW.receiveShadow = true;
  baseGroup.add(vDeckW);
  group.add(baseGroup);

  const floorY = VILLA.baseTop; // building "0" is on top of base

  // --- GF walls (simple box shell with notched porte-cochère) ---
  const gfGroup = new THREE.Group(); gfGroup.name = 'gf';
  const wallH = VILLA.gfCeil;

  // South wall (bay side) — z=0
  const sWallGeom = new THREE.BoxGeometry(VILLA.width, wallH, VILLA.wallThk);
  const sWall = new THREE.Mesh(sWallGeom, mat(p.render,{rough:0.9}));
  sWall.position.set(VILLA.width/2, floorY + wallH/2, VILLA.wallThk/2);
  sWall.castShadow = true; sWall.receiveShadow = true;
  gfGroup.add(sWall);

  // North wall — with porte-cochère notch: we'll draw two segments
  const pc = VILLA.porteCochere;
  const nLeftW  = pc.x - 0;
  const nRightW = VILLA.width - (pc.x + pc.w);
  const nLeft  = new THREE.Mesh(new THREE.BoxGeometry(nLeftW, wallH, VILLA.wallThk), mat(p.render,{rough:0.9}));
  nLeft.position.set(nLeftW/2, floorY + wallH/2, VILLA.depth - VILLA.wallThk/2);
  nLeft.castShadow = true; nLeft.receiveShadow = true;
  gfGroup.add(nLeft);
  const nRight = new THREE.Mesh(new THREE.BoxGeometry(nRightW, wallH, VILLA.wallThk), mat(p.render,{rough:0.9}));
  nRight.position.set(pc.x + pc.w + nRightW/2, floorY + wallH/2, VILLA.depth - VILLA.wallThk/2);
  nRight.castShadow = true; nRight.receiveShadow = true;
  gfGroup.add(nRight);
  // lintel above porte-cochère opening
  const pcLintel = new THREE.Mesh(new THREE.BoxGeometry(pc.w, 0.5, VILLA.wallThk), mat(p.render,{rough:0.9}));
  pcLintel.position.set(pc.x + pc.w/2, floorY + wallH - 0.25, VILLA.depth - VILLA.wallThk/2);
  gfGroup.add(pcLintel);

  // East / west gable walls
  const eWall = new THREE.Mesh(new THREE.BoxGeometry(VILLA.wallThk, wallH, VILLA.depth), mat(p.render,{rough:0.9}));
  eWall.position.set(VILLA.width - VILLA.wallThk/2, floorY + wallH/2, VILLA.depth/2);
  eWall.castShadow = true; eWall.receiveShadow = true;
  gfGroup.add(eWall);
  const wWall = new THREE.Mesh(new THREE.BoxGeometry(VILLA.wallThk, wallH, VILLA.depth), mat(p.render,{rough:0.9}));
  wWall.position.set(VILLA.wallThk/2, floorY + wallH/2, VILLA.depth/2);
  wWall.castShadow = true; wWall.receiveShadow = true;
  gfGroup.add(wWall);

  // GF floor slab
  const gfFloor = new THREE.Mesh(new THREE.BoxGeometry(VILLA.width, 0.05, VILLA.depth), mat(p.teakFloor,{rough:0.8}));
  gfFloor.position.set(VILLA.width/2, floorY + 0.025, VILLA.depth/2);
  gfFloor.receiveShadow = true;
  gfGroup.add(gfFloor);

  // Room tiles on floor (interior rhythm)
  for (const room of ROOMS_GF){
    if (room.flag==='void') continue;
    const tile = new THREE.Mesh(new THREE.BoxGeometry(room.w, 0.01, room.d),
      mat(room.flag==='service' ? p.renderShade : p.teakFloor, {rough:0.8}));
    tile.position.set(room.x + room.w/2, floorY + 0.055, room.z + room.d/2);
    tile.userData = { roomId: room.id, room, level:'GF' };
    gfGroup.add(tile);
  }

  // GF shutters on south & parts of north
  const gfShutY = floorY + 0.7;
  const bayXs = [2.2, 5.5, 8.5, 12.0, 15.0, 18.5, 22.5, 26.0];
  gfGroup.add(shutterRow(p, bayXs, 0.0 - 0.02, gfShutY, 'x', 1.6));
  // west wall shutters
  const bayZs = [2.0, 5.0, 8.0, 11.0];
  gfGroup.add(shutterRow(p, bayZs, 0.02, gfShutY, 'z', 1.6));

  group.add(gfGroup);

  // --- L1 (same outline) ---
  const l1Group = new THREE.Group(); l1Group.name = 'l1';
  const l1Y = floorY + VILLA.gfCeil;
  const l1H = VILLA.l1Eave - VILLA.gfCeil; // ~3.0

  // L1 floor slab
  const l1Slab = new THREE.Mesh(new THREE.BoxGeometry(VILLA.width, 0.2, VILLA.depth), mat(p.renderShade,{rough:0.95}));
  l1Slab.position.set(VILLA.width/2, l1Y - 0.1, VILLA.depth/2);
  l1Slab.receiveShadow = true; l1Slab.castShadow = true;
  l1Group.add(l1Slab);

  // L1 walls — simple full rectangle (no porte-cochère notch)
  const wallMat = mat(p.render,{rough:0.9});
  const lS = new THREE.Mesh(new THREE.BoxGeometry(VILLA.width, l1H, VILLA.wallThk), wallMat);
  lS.position.set(VILLA.width/2, l1Y + l1H/2, VILLA.wallThk/2);
  lS.castShadow = true; lS.receiveShadow = true; l1Group.add(lS);
  const lN = new THREE.Mesh(new THREE.BoxGeometry(VILLA.width, l1H, VILLA.wallThk), wallMat);
  lN.position.set(VILLA.width/2, l1Y + l1H/2, VILLA.depth - VILLA.wallThk/2);
  lN.castShadow = true; lN.receiveShadow = true; l1Group.add(lN);
  const lE = new THREE.Mesh(new THREE.BoxGeometry(VILLA.wallThk, l1H, VILLA.depth), wallMat);
  lE.position.set(VILLA.width - VILLA.wallThk/2, l1Y + l1H/2, VILLA.depth/2);
  lE.castShadow = true; lE.receiveShadow = true; l1Group.add(lE);
  const lW = new THREE.Mesh(new THREE.BoxGeometry(VILLA.wallThk, l1H, VILLA.depth), wallMat);
  lW.position.set(VILLA.wallThk/2, l1Y + l1H/2, VILLA.depth/2);
  lW.castShadow = true; lW.receiveShadow = true; l1Group.add(lW);

  // L1 room tiles
  for (const room of ROOMS_L1){
    if (room.flag==='void') continue;
    const tile = new THREE.Mesh(new THREE.BoxGeometry(room.w, 0.01, room.d),
      mat(room.flag==='circulation' ? p.linen : p.teakFloor, {rough:0.8}));
    tile.position.set(room.x + room.w/2, l1Y + 0.12, room.z + room.d/2);
    tile.userData = { roomId: room.id, room, level:'L1' };
    l1Group.add(tile);
  }

  // L1 shutters — same bay rhythm
  const l1ShutY = l1Y + 0.5;
  l1Group.add(shutterRow(p, bayXs, 0.0 - 0.02, l1ShutY, 'x', 1.9));
  l1Group.add(shutterRow(p, bayZs, 0.02, l1ShutY, 'z', 1.9));

  // Upper veranda balustrade (south & west edges)
  const balMat = mat(p.teak,{rough:0.8});
  const railS = new THREE.Mesh(new THREE.BoxGeometry(VILLA.width + VILLA.verandaWest, 0.08, 0.08), balMat);
  railS.position.set(VILLA.width/2 - VILLA.verandaWest/2, l1Y - 0.05, -VILLA.verandaSouth + 0.05);
  l1Group.add(railS);
  const railW = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, VILLA.depth), balMat);
  railW.position.set(-VILLA.verandaWest + 0.05, l1Y - 0.05, VILLA.depth/2);
  l1Group.add(railW);

  group.add(l1Group);

  // --- veranda columns ---
  const columnsGroup = new THREE.Group(); columnsGroup.name='veranda';
  const colH = VILLA.l1Eave; // floor to eave
  const colMat = mat(p.teak,{rough:0.7});
  const colXs = [0, 5.5, 11.0, 16.5, 22.0, 28.05];
  for (const cx of colXs){
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.22, colH, 0.22), colMat);
    c.position.set(cx, floorY + colH/2, -VILLA.verandaSouth + 0.15);
    c.castShadow = true;
    columnsGroup.add(c);
  }
  // west row columns
  for (const cz of [2.5, 6.0, 9.5]){
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.22, colH, 0.22), colMat);
    c.position.set(-VILLA.verandaWest + 0.15, floorY + colH/2, cz);
    c.castShadow = true;
    columnsGroup.add(c);
  }
  // fascia beam above columns (south)
  const fascia = new THREE.Mesh(new THREE.BoxGeometry(VILLA.width + VILLA.verandaWest, 0.35, 0.3),
    mat(p.teakMed,{rough:0.8}));
  fascia.position.set(VILLA.width/2 - VILLA.verandaWest/2, floorY + colH - 0.17, -VILLA.verandaSouth + 0.15);
  columnsGroup.add(fascia);

  group.add(columnsGroup);

  // --- roof: hipped clay tile ---
  const roofGroup = new THREE.Group(); roofGroup.name='roof';
  const roofY = floorY + VILLA.l1Eave;
  const roofH = VILLA.ridge - VILLA.l1Eave;

  // Extend roof slightly past walls as eave overhang
  const eaveX = 0.6, eaveZ = 0.6;
  const rw = VILLA.width + eaveX*2 + VILLA.verandaWest; // includes west overhang
  const rd = VILLA.depth + eaveZ*2 + VILLA.verandaSouth; // includes south overhang
  const cx0 = VILLA.width/2 - VILLA.verandaWest/2;  // roof centred over villa + veranda
  const cz0 = VILLA.depth/2 - VILLA.verandaSouth/2;

  // Ridge length = rw - rd (hipped: ridge length = longDim - shortDim)
  const ridgeLen = rw - rd;
  const halfRd = rd/2;
  // Build with 8 triangles assembled as a BufferGeometry
  const rx0 = cx0 - rw/2, rx1 = cx0 + rw/2;
  const rz0 = cz0 - rd/2, rz1 = cz0 + rd/2;
  const rxR0 = cx0 - ridgeLen/2, rxR1 = cx0 + ridgeLen/2;

  // eave corners (y = roofY) and ridge points (y = roofY + roofH)
  const v = [
    // south eave
    rx0, roofY, rz0,  // 0 SW
    rx1, roofY, rz0,  // 1 SE
    rx1, roofY, rz1,  // 2 NE
    rx0, roofY, rz1,  // 3 NW
    // ridge ends
    rxR0, roofY + roofH, cz0,  // 4 ridge W
    rxR1, roofY + roofH, cz0,  // 5 ridge E
  ];
  const idx = [
    // south slope (quad 0,1,5,4)
    0,1,5, 0,5,4,
    // north slope
    3,4,5, 3,5,2,
    // west hip (triangle 0,4,3)
    0,4,3,
    // east hip (triangle 1,2,5)
    1,5,2,
  ];
  const roofGeom = new THREE.BufferGeometry();
  roofGeom.setAttribute('position', new THREE.Float32BufferAttribute(v,3));
  roofGeom.setIndex(idx);
  roofGeom.computeVertexNormals();
  const roofMesh = new THREE.Mesh(roofGeom, mat(p.roof,{rough:0.95,flat:true,side:THREE.DoubleSide}));
  roofMesh.castShadow = true; roofMesh.receiveShadow = true;
  roofGroup.add(roofMesh);

  // Ridge line (copper patina)
  const ridgeGeom = new THREE.BoxGeometry(ridgeLen + 0.1, 0.12, 0.12);
  const ridgeMesh = new THREE.Mesh(ridgeGeom, mat(p.copperPat,{rough:0.6,metal:0.4}));
  ridgeMesh.position.set(cx0, roofY + roofH + 0.06, cz0);
  roofGroup.add(ridgeMesh);

  // Roof lantern (small clerestory) at centre over atrium
  const lanternGeom = new THREE.BoxGeometry(2.6, 0.9, 1.6);
  const lantern = new THREE.Mesh(lanternGeom, mat(p.render,{rough:0.9}));
  lantern.position.set(cx0, roofY + roofH - 0.5, cz0);
  roofGroup.add(lantern);

  group.add(roofGroup);

  scene.add(group);

  // Return handles so we can toggle layers
  return {
    group, base:baseGroup, gf:gfGroup, l1:l1Group, roof:roofGroup,
    veranda:columnsGroup,
    getAllInteractive(){
      const out = [];
      gfGroup.traverse(o=>{ if (o.userData && o.userData.roomId) out.push(o); });
      l1Group.traverse(o=>{ if (o.userData && o.userData.roomId) out.push(o); });
      return out;
    },
    setShuttersVisible(v){
      gfGroup.traverse(o=>{ if (o.material && o.material.color && o.material.color.getHex()===ACTIVE.p.teak && o.geometry.type==='BoxGeometry' && o.geometry.parameters.height<2.1 && o.geometry.parameters.height>1.4) o.visible=v; });
      l1Group.traverse(o=>{ if (o.material && o.material.color && o.material.color.getHex()===ACTIVE.p.teak && o.geometry.type==='BoxGeometry' && o.geometry.parameters.height<2.1 && o.geometry.parameters.height>1.4) o.visible=v; });
    }
  };
}
