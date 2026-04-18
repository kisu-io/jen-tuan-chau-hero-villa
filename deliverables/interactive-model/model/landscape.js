// Landscape, pool, sala, trees, site plate, karst backdrop, bay plane
import * as THREE from 'three';
import { VILLA } from './dims.js';
import { ACTIVE } from './palette.js';

const mat = (hex, opts={}) => new THREE.MeshStandardMaterial({ color:hex, roughness:opts.rough ?? 0.9, metalness:opts.metal ?? 0.0, flatShading:opts.flat ?? false, transparent:!!opts.transparent, opacity:opts.opacity ?? 1 });

function makeTree(p, height=4, radius=1.4, trunkColor=0x4a3820){
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, height*0.5, 6),
    mat(trunkColor,{rough:0.95,flat:true}));
  trunk.position.y = height*0.25;
  trunk.castShadow = true;
  g.add(trunk);
  const canopy = new THREE.Mesh(new THREE.SphereGeometry(radius, 8, 6),
    mat(p.foliage,{rough:0.95,flat:true}));
  canopy.position.y = height*0.5 + radius*0.5;
  canopy.scale.y = 0.75;
  canopy.castShadow = true;
  g.add(canopy);
  const canopy2 = new THREE.Mesh(new THREE.SphereGeometry(radius*0.7, 8, 6),
    mat(p.foliageLt,{rough:0.95,flat:true}));
  canopy2.position.set(radius*0.3, height*0.5 + radius*0.8, radius*0.2);
  canopy2.scale.y = 0.7;
  g.add(canopy2);
  return g;
}

function makeFrangipani(p, height=3){
  const g = new THREE.Group();
  // Sculptural — sparse crown
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, height*0.65, 6), mat(0x807261,{rough:0.9,flat:true}));
  trunk.position.y = height*0.32;
  g.add(trunk);
  for (let i=0;i<4;i++){
    const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.07, 0.8, 5), mat(0x807261,{rough:0.9,flat:true}));
    branch.position.set(Math.cos(i*Math.PI/2)*0.25, height*0.7, Math.sin(i*Math.PI/2)*0.25);
    branch.rotation.z = Math.cos(i*Math.PI/2)*0.7;
    branch.rotation.x = Math.sin(i*Math.PI/2)*0.7;
    g.add(branch);
    const blossoms = new THREE.Mesh(new THREE.SphereGeometry(0.45, 6,5), mat(p.frangipani,{rough:1}));
    blossoms.position.set(Math.cos(i*Math.PI/2)*0.7, height*0.85, Math.sin(i*Math.PI/2)*0.7);
    blossoms.scale.y = 0.7;
    g.add(blossoms);
  }
  return g;
}

export function buildLandscape(scene){
  const p = ACTIVE.p;
  const group = new THREE.Group(); group.name = 'landscape';

  // --- Ground plate (plot) ---
  const plotW = 56, plotD = 44; // extend well beyond villa for context
  const grass = new THREE.Mesh(new THREE.BoxGeometry(plotW, 0.1, plotD),
    mat(p.lawn,{rough:1,flat:true}));
  grass.position.set(VILLA.width/2, -0.05, VILLA.depth/2 - 2);
  grass.receiveShadow = true;
  group.add(grass);

  // Motor court (north of villa)
  const mc = new THREE.Mesh(new THREE.BoxGeometry(VILLA.width - 2, 0.02, 6),
    mat(p.motorCourt,{rough:0.95,flat:true}));
  mc.position.set(VILLA.width/2, 0.01, VILLA.depth + 4);
  mc.receiveShadow = true;
  group.add(mc);

  // --- Pool + deck (south of villa, bay side) ---
  const pool = VILLA.pool;
  const deck = VILLA.deck;
  // Deck (teak) — frames the pool
  const deckMesh = new THREE.Mesh(new THREE.BoxGeometry(deck.w, 0.08, 8.0),
    mat(p.teakFloor,{rough:0.8,flat:true}));
  deckMesh.position.set(VILLA.width/2, 0.04, -VILLA.verandaSouth - 4.5);
  deckMesh.receiveShadow = true;
  group.add(deckMesh);

  // Basalt coping (darker rim)
  const coping = new THREE.Mesh(new THREE.BoxGeometry(pool.w + 0.8, 0.15, pool.d + 0.8),
    mat(p.base,{rough:0.9,flat:true}));
  coping.position.set(VILLA.width/2, 0.08, -VILLA.verandaSouth - 4.8);
  group.add(coping);

  // Water
  const water = new THREE.Mesh(new THREE.BoxGeometry(pool.w, 0.12, pool.d),
    mat(p.water,{rough:0.2,metal:0.1}));
  water.position.set(VILLA.width/2, 0.14, -VILLA.verandaSouth - 4.8);
  group.add(water);
  // deeper water bed
  const waterBed = new THREE.Mesh(new THREE.BoxGeometry(pool.w*0.9, 0.6, pool.d*0.85),
    mat(p.waterDeep,{rough:0.3}));
  waterBed.position.set(VILLA.width/2, -0.25, -VILLA.verandaSouth - 4.8);
  group.add(waterBed);

  // --- Sala pavilion on east lawn ---
  const sala = new THREE.Group();
  const salaFloor = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 3.6),
    mat(p.base,{rough:0.9,flat:true}));
  salaFloor.position.y = 0.1;
  sala.add(salaFloor);
  for (let i=0;i<4;i++){
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.0, 0.2), mat(p.teak,{rough:0.8}));
    c.position.set(i%2===0? -1.6: 1.6, 1.5, i<2? -1.6: 1.6);
    c.castShadow = true;
    sala.add(c);
  }
  // sala roof — pyramid clay tile
  const salaRoof = new THREE.Mesh(new THREE.ConeGeometry(2.7, 1.4, 4),
    mat(p.roof,{rough:0.95,flat:true}));
  salaRoof.rotation.y = Math.PI/4;
  salaRoof.position.y = 3.7;
  salaRoof.castShadow = true;
  sala.add(salaRoof);
  sala.position.set(VILLA.width + 6, 0, VILLA.depth/2 - 2);
  group.add(sala);

  // --- Trees ---
  const treesGroup = new THREE.Group(); treesGroup.name='trees';
  // frangipani pair at entry axis (north side)
  const f1 = makeFrangipani(p, 3.2); f1.position.set(VILLA.porteCochere.x - 3.5, 0, VILLA.depth + 2.2);
  const f2 = makeFrangipani(p, 3.2); f2.position.set(VILLA.porteCochere.x + 4.5, 0, VILLA.depth + 2.2);
  treesGroup.add(f1, f2);
  // palms / mature canopy around perimeter
  const positions = [
    [-8, 0, -6], [-10, 0, 2], [-8, 0, 10],
    [VILLA.width + 10, 0, -8], [VILLA.width + 12, 0, 2], [VILLA.width + 10, 0, 10],
    [6, 0, -13], [VILLA.width - 6, 0, -13],
    [-4, 0, VILLA.depth + 8], [VILLA.width + 4, 0, VILLA.depth + 8],
  ];
  for (const [x,y,z] of positions){
    const h = 4 + Math.random()*2;
    const r = 1.2 + Math.random()*0.6;
    const t = makeTree(p, h, r);
    t.position.set(x, y, z);
    t.rotation.y = Math.random() * Math.PI;
    treesGroup.add(t);
  }
  // heliconia/planting clumps at pool edge (low foliage)
  for (let i=0;i<8;i++){
    const x = 2 + Math.random()*24;
    const clump = new THREE.Mesh(new THREE.SphereGeometry(0.4 + Math.random()*0.3, 6, 4),
      mat(p.foliageLt,{rough:1,flat:true}));
    clump.scale.y = 0.6;
    clump.position.set(x, 0.3, -VILLA.verandaSouth - 0.6);
    treesGroup.add(clump);
  }
  group.add(treesGroup);

  // --- Bay water plane (south of plot) ---
  const bay = new THREE.Mesh(new THREE.PlaneGeometry(200, 80),
    mat(p.bay,{rough:0.3,metal:0.2}));
  bay.rotation.x = -Math.PI/2;
  bay.position.set(VILLA.width/2, -0.2, -30);
  group.add(bay);

  // --- Karst silhouette (distant peaks) ---
  const karstGroup = new THREE.Group(); karstGroup.name = 'karst';
  const karstMat = mat(p.karst,{rough:1,flat:true});
  for (let i=0;i<8;i++){
    const w = 8 + Math.random()*10;
    const h = 7 + Math.random()*10;
    const peak = new THREE.Mesh(new THREE.ConeGeometry(w/2, h, 5), karstMat);
    peak.position.set(-30 + i*12, h/2, -58 - Math.random()*6);
    peak.rotation.y = Math.random()*Math.PI;
    karstGroup.add(peak);
  }
  // mist overlay — a big semi-transparent plane in front of karst
  const mist = new THREE.Mesh(new THREE.PlaneGeometry(260, 24),
    mat(0xe9eef1,{rough:1,transparent:true,opacity:0.35}));
  mist.position.set(VILLA.width/2, 6, -54);
  karstGroup.add(mist);
  group.add(karstGroup);

  scene.add(group);

  return { group, trees: treesGroup, karst: karstGroup, bay };
}
