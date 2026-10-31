// The chrome star: a four-pointed star of liquid metal drawn by a small WebGL shader, with a star-shaped hole that can open
// in it and a white sparkle at its centre. Its colours come from the theme. Returns null without WebGL2, and the
// safety section then stays a plain board.

const vertex = `#version 300 es
in vec2 corner;
void main() { gl_Position = vec4(corner, 0.0, 1.0); }`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 centre;
uniform float outer, hole, sparkle, time, pixel;
uniform vec3 light, warm, accent, dark;
out vec4 colour;

// How far out a point is, measured so that points of equal distance form a four-pointed star.
float star(vec2 p) {
  p = abs(p) + 0.001;
  return pow(pow(p.x, 0.55) + pow(p.y, 0.55), 1.0 / 0.55);
}

void main() {
  vec2 p = gl_FragCoord.xy - centre;
  float m = star(p);
  float edge = fwidth(m) * 1.2;
  float inside = (1.0 - smoothstep(outer - edge, outer + edge, m)) * smoothstep(hole - edge, hole + edge, m);

  // The surface: a rounded edge of fixed width around flat metal, with broad, slow swells running through it.
  float width = min(outer * 0.22 + 14.0 * pixel, 96.0 * pixel);
  float band = clamp(min(outer - m, hole > 0.0 ? m - hole : 1e6) / width, 0.0, 1.0);
  float dome = sqrt(max(0.0, 1.0 - (1.0 - band) * (1.0 - band)));
  float swell = sin(length(p) / (150.0 * pixel) - time * 1.1 + 1.5 * sin(atan(p.y, p.x) * 2.0)) * 0.5 + sin(p.x / (210.0 * pixel) + time * 0.7) * sin(p.y / (170.0 * pixel) - time * 0.5) * 0.5;
  // The swells die away towards the centre, where their pattern comes to a point.
  swell *= smoothstep(40.0 * pixel, 260.0 * pixel, length(p));
  float height = (dome * 30.0 + swell * 11.0) * pixel;
  vec3 normal = normalize(vec3(-dFdx(height), -dFdy(height), 1.0));

  // Black chrome: flat metal reflects a dark room, and only what tilts catches the bright strip of light above it.
  vec3 silver = mix(light, warm, 0.25) * 0.94;
  vec3 bounce = reflect(vec3(0.0, 0.0, -1.0), normal);
  float look = bounce.y * 0.5 + 0.5 + 0.05 * sin(bounce.x * 6.0 + time);
  float strip = smoothstep(0.58, 0.68, look) * (1.0 - smoothstep(0.86, 1.02, look));
  float under = smoothstep(0.44, 0.2, look);
  vec3 metal = dark * 0.55 + (dark * 0.5 + accent * 0.06) * smoothstep(0.42, 0.56, look);
  metal = mix(metal, silver, strip);
  metal = mix(metal, accent * 0.8, under * 0.55);

  // All around the rim the light breaks up into a fine dotted mesh.
  float tilt = length(normal.xy);
  vec2 cell = fract(gl_FragCoord.xy / (4.0 * pixel)) - 0.5;
  float dots = smoothstep(0.44, 0.26, length(cell));
  float rim = (1.0 - smoothstep(0.0, 0.55, band)) * smoothstep(0.05, 0.4, tilt);
  metal = mix(metal, silver, rim * dots);
  metal += pow(max(dot(normal, normalize(vec3(0.42, 0.58, 0.7))), 0.0), 90.0) * 0.5;

  float spark = 1.0 - smoothstep(sparkle - edge, sparkle + edge, m);
  float alpha = max(inside, spark);
  vec3 finished = mix(metal, vec3(1.0), spark);
  colour = vec4(finished * alpha, alpha);
}`;

export type ChromeStar = {
  draw: (values: { x: number; y: number; outer: number; hole: number; sparkle: number; time: number }) => void;
  clear: () => void;
  resize: (width: number, height: number, pixel: number) => void;
};

const themeColour = (name: string): [number, number, number] => {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`).trim().replace("#", "");
  return [parseInt(hex.slice(0, 2), 16) / 255, parseInt(hex.slice(2, 4), 16) / 255, parseInt(hex.slice(4, 6), 16) / 255];
};

export function createChromeStar(canvas: HTMLCanvasElement): ChromeStar | null {
  const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false });
  if (!gl) return null;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const vs = compile(gl.VERTEX_SHADER, vertex);
  const fs = compile(gl.FRAGMENT_SHADER, fragment);
  const program = gl.createProgram();
  if (!vs || !fs || !program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const corner = gl.getAttribLocation(program, "corner");
  gl.enableVertexAttribArray(corner);
  gl.vertexAttribPointer(corner, 2, gl.FLOAT, false, 0, 0);

  const at = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = { centre: at("centre"), outer: at("outer"), hole: at("hole"), sparkle: at("sparkle"), time: at("time"), pixel: at("pixel") };
  gl.uniform3fv(at("light"), themeColour("surface"));
  gl.uniform3fv(at("warm"), themeColour("brand"));
  gl.uniform3fv(at("accent"), themeColour("accent"));
  gl.uniform3fv(at("dark"), themeColour("ink-deep"));

  let pixel = 1;
  let height = 0;

  return {
    resize(cssWidth, cssHeight, ratio) {
      pixel = ratio;
      height = Math.round(cssHeight * ratio);
      canvas.width = Math.round(cssWidth * ratio);
      canvas.height = height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uniforms.pixel, ratio);
    },
    draw({ x, y, outer, hole, sparkle, time }) {
      // The shader counts up from the bottom, in real pixels.
      gl.uniform2f(uniforms.centre, x * pixel, height - y * pixel);
      gl.uniform1f(uniforms.outer, outer * pixel);
      gl.uniform1f(uniforms.hole, hole * pixel);
      gl.uniform1f(uniforms.sparkle, sparkle * pixel);
      gl.uniform1f(uniforms.time, time);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    clear() {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },
  };
}
