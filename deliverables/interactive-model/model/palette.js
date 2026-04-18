// Palette — lifted from the existing visualization
// All colors as hex integers for THREE.Color

export const PALETTES = {
  capella: {
    sky1:       0xD8E3EA,
    sky2:       0xE8DEC9,
    sky3:       0xD5C7A4,
    bay:        0x94B9C9,
    bayDeep:    0x5A8699,
    karst:      0x6B7A85,
    lawn:       0xCFD9A3,
    lawnEdge:   0xA3B373,
    motorCourt: 0xB6AFA4,
    sand:       0xD8CBB1,

    roof:       0xC87350,  // weathered terracotta
    roofShade:  0x8C5830,
    roofHi:     0xD88766,
    copper:     0x6F5828,  // patina'd copper ridge/gutter -> used dark
    copperPat:  0x4A7A6B,

    render:     0xEDE4D3,  // ivory lime-wash
    renderShade:0xD9CDB6,
    renderHi:   0xF5EEDE,

    base:       0x44403C,  // charcoal basalt
    baseHi:     0x6B6762,

    teak:       0x2E1B0F,  // ink-charcoal stained teak
    teakMed:    0x5A3A1B,
    teakHi:     0x8B6A45,
    teakFloor:  0x7A4F2A,

    raffia:     0xD7C69A,
    brass:      0x9B7A42,
    linen:      0xE8DCC4,
    velvet:     0x2B3442,
    rust:       0x8A4C2E,

    glass:      0xBCD7E2,
    water:      0xA8C8D6,
    waterDeep:  0x6A95A8,

    foliage:    0x3E5A2A,
    foliageLt:  0x6B8E4A,
    frangipani: 0xFAF7F2,

    label:      0x1F2937,
    accent:     0xB45309,
  },
  aman: {
    sky1:0xCBD5DC, sky2:0xDDD3C3, sky3:0xC9BBA0, bay:0x7FA7B7, bayDeep:0x4F7585,
    karst:0x5A6772, lawn:0xBECB9A, lawnEdge:0x8DA067, motorCourt:0xB2ABA0, sand:0xCCC0A7,
    roof:0xB66A4A, roofShade:0x7E502D, roofHi:0xCB8066, copper:0x5E4C24, copperPat:0x3E6A5C,
    render:0xEAE2D2, renderShade:0xCFC3AB, renderHi:0xF0E8D8,
    base:0x3B3835, baseHi:0x5B5852, teak:0x28170D, teakMed:0x523415, teakHi:0x7D5F3E, teakFloor:0x6E4725,
    raffia:0xCFBD91, brass:0x8B6B38, linen:0xDDD0B8, velvet:0x25303E, rust:0x7F4728,
    glass:0xAFC9D4, water:0x9CBCC8, waterDeep:0x5F8798,
    foliage:0x35502A, foliageLt:0x5F8343, frangipani:0xF5F1EC,
    label:0x1F2937, accent:0x96491E,
  },
  schematic: {
    sky1:0xF2F0EC, sky2:0xEDE9E2, sky3:0xE5E0D6, bay:0xCDD8DE, bayDeep:0xA5B8C2,
    karst:0x8A95A0, lawn:0xD5DBC3, lawnEdge:0xABB48E, motorCourt:0xC8C3BA, sand:0xD9CEB5,
    roof:0xC47358, roofShade:0x955C3E, roofHi:0xD48970, copper:0x707068, copperPat:0x7A8F89,
    render:0xF1ECE0, renderShade:0xDDD4C2, renderHi:0xF7F2E7,
    base:0x5E5A54, baseHi:0x807C74, teak:0x3E2C1D, teakMed:0x6B4725, teakHi:0x957653, teakFloor:0x8B5F34,
    raffia:0xD9CCA6, brass:0xA8884F, linen:0xE8DEC7, velvet:0x3A424E, rust:0x9A5B3A,
    glass:0xC9D9E0, water:0xB8C9D2, waterDeep:0x8BA1AB,
    foliage:0x5A7344, foliageLt:0x89A36E, frangipani:0xF8F5EE,
    label:0x1F2937, accent:0xB45309,
  }
};

export const ACTIVE = { name: 'capella', p: PALETTES.capella };
export const setPalette = (name) => {
  if (PALETTES[name]) { ACTIVE.name = name; ACTIVE.p = PALETTES[name]; }
};
