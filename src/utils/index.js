const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

// rgbToHex(0, 51, 255);
// Result: #0033ff`

