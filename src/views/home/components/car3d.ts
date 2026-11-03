import {
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  Color,
  ConeGeometry,
  CustomBlending,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  OneFactor,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Shape,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
  ZeroFactor,
} from "three";

// The hero launch's car in 3D (views/home/components/HeroLaunch.tsx): the brand car (components/brand/Car.tsx) given depth,
// wheels and lights. Seen exactly side-on, as at the start, it has the flat car's outline, so it can take over from the car
// parked in the hero. Loaded only once someone interacts with the page, so a visit that never scrolls doesn't pay for
// three.js. It draws into one square canvas; the launch moves and scales that canvas across the screen, and this turns the
// car, spins its wheels and works its lights on the same clock.

// `facing` is 1 when the car drives to the right, -1 to the left.
export type Timing = { lights: number; drive: number; impact: number; facing: 1 | -1 };
export type CarShow = {
  canvas: HTMLCanvasElement;
  size: number; // the canvas's size on screen, in CSS px, at scale 1
  carWidth: number; // how wide the car is in the canvas at the start, in CSS px, to match it to the parked car
  play: (start: number, timing: Timing) => void;
  dispose: () => void;
};

const size = 520;
// Car units are the flat car's SVG units: 30 long, with y turned to point up.
const depth = 14;
const centre = new Vector3(0, 7.15, 0);
const distance = 275;

// Light that adds to whatever is behind the canvas, on the page as well as on the car: colour is added and the canvas's
// transparency is left alone, so a beam brightens the phone's light screen instead of laying grey over it.
const addLight = { blending: CustomBlending, blendSrc: OneFactor, blendDst: OneFactor, blendSrcAlpha: ZeroFactor, blendDstAlpha: OneFactor } as const;

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#000";
const clamp = (t: number) => Math.min(1, Math.max(0, t));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const span = (t: number, from: number, to: number) => clamp((t - from) / (to - from));

function rounded(x: number, y: number, w: number, h: number, r: number) {
  const s = new Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

// A soft round glow, and a long thin one for the flare across each headlight.
function glowTexture(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  // A circle squashed to the canvas's shape.
  g.translate(w / 2, h / 2);
  g.scale(1, h / w);
  const grad = g.createRadialGradient(0, 0, 0, 0, 0, w / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.55)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(-w / 2, -w / 2, w, w);
  return new CanvasTexture(c);
}

export function makeCarShow(): CarShow | null {
  const canvas = document.createElement("canvas");
  // Asked for directly, so a device without WebGL just gets the flat car, with nothing in the console. (The launch only
  // loads this file where WebGL 2 runs on a real graphics chip.)
  const gl = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "high-performance" });
  if (!gl) return null;
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, context: gl, alpha: true, antialias: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(size, size, false);
  renderer.setClearColor(0x000000, 0);
  Object.assign(canvas.style, { width: `${size}px`, height: `${size}px`, display: "block" });

  const ink = new Color(css("--color-ink"));
  const accent = new Color(css("--color-accent"));
  const deep = new Color(css("--color-ink-deep"));
  const glassColour = new Color(css("--color-brand"));
  const surface = new Color(css("--color-surface"));
  const lampColour = new Color("#fff1d6");
  const tail = new Color(css("--color-sos"));

  const scene = new Scene();
  const camera = new PerspectiveCamera(22, 1, 1, 1000);
  scene.add(new HemisphereLight(surface, deep, 1.4));
  scene.add(new AmbientLight(0xffffff, 0.35));
  const key = new DirectionalLight(0xffffff, 2.4);
  key.position.set(-25, 45, 40);
  scene.add(key);
  const rim = new DirectionalLight(accent, 1.6);
  rim.position.set(30, 18, -40);
  scene.add(rim);

  // The body leans and turns inside `car`; `wheels` spin on their own axles.
  const car = new Group();
  scene.add(car);
  const paint = new MeshStandardMaterial({ color: ink.clone(), roughness: 0.34, metalness: 0.18 });
  const bevel = 0.7;
  const extrude = (shape: Shape, d: number) => {
    const g = new ExtrudeGeometry(shape, { depth: d - bevel * 2, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 10 });
    g.translate(0, 0, -(d - bevel * 2) / 2);
    return g;
  };
  // Shrunk by the bevel, so the outline side-on is the flat car's.
  car.add(new Mesh(extrude(rounded(-15 + bevel, 2 + bevel, 30 - bevel * 2, 8 - bevel * 2, 2.2), depth), paint));
  const cabin = new Shape();
  cabin.moveTo(-9 + bevel, 9.6);
  cabin.lineTo(-5 + bevel * 0.6, 16 - bevel);
  cabin.lineTo(6 - bevel * 0.6, 16 - bevel);
  cabin.lineTo(10 - bevel, 9.6);
  cabin.lineTo(-9 + bevel, 9.6);
  car.add(new Mesh(extrude(cabin, depth - 3), paint));

  const glass = new MeshStandardMaterial({ color: glassColour, roughness: 0.12, metalness: 0, emissive: glassColour, emissiveIntensity: 0.18 });
  for (const side of [1, -1]) {
    const pane = new Mesh(new BoxGeometry(8, 3.5, 0.2), glass);
    pane.position.set(0, 12.75, side * ((depth - 3) / 2 + 0.05));
    car.add(pane);
  }
  // Windscreen and rear window, laid along the cabin's slopes: the pane runs along the slope and across the car, facing out.
  const slope = (x1: number, y1: number, x2: number, y2: number) => {
    const along = new Vector3(x2 - x1, y2 - y1, 0);
    const length = along.length();
    along.normalize();
    const across = new Vector3(0, 0, 1);
    const out = new Vector3().crossVectors(along, across);
    const pane = new Mesh(new PlaneGeometry(length * 0.82, depth - 5), glass);
    pane.setRotationFromMatrix(new Matrix4().makeBasis(along, across, out));
    pane.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0).addScaledVector(out, 0.12);
    car.add(pane);
  };
  // Laid in the direction that makes "out" point away from the cabin: the windscreen up from the bonnet, the rear window
  // down from the roof.
  slope(10 - 0.4, 9.8, 6 - 0.4, 16 - 0.4);
  slope(-5 + 0.4, 16 - 0.4, -9 + 0.4, 9.8);

  const tyre = new MeshStandardMaterial({ color: deep, roughness: 0.85, metalness: 0 });
  const hub = new MeshStandardMaterial({ color: ink.clone(), roughness: 0.4, metalness: 0.3 });
  const wheels: Group[] = [];
  for (const x of [-8.5, 8.5]) {
    for (const side of [1, -1]) {
      const wheel = new Group();
      wheel.position.set(x, 1.5, side * (depth / 2 - 1.1));
      const t = new Mesh(new CylinderGeometry(3.2, 3.2, 2.4, 28), tyre);
      t.rotation.x = Math.PI / 2;
      wheel.add(t);
      // A hub with one spoke, so the spin shows.
      const cap = new Mesh(new CylinderGeometry(1.5, 1.5, 0.3, 20), hub);
      cap.rotation.x = Math.PI / 2;
      cap.position.z = side * 1.25;
      wheel.add(cap);
      const spoke = new Mesh(new BoxGeometry(2.6, 0.5, 0.2), hub);
      spoke.position.z = side * 1.42;
      wheel.add(spoke);
      car.add(wheel);
      wheels.push(wheel);
    }
  }

  // Lights: lamps on the front and back, a glow and a flare on each headlight, and a beam ahead of it.
  const lampMaterial = new MeshBasicMaterial({ color: lampColour.clone().multiplyScalar(0.35) });
  const tailMaterial = new MeshBasicMaterial({ color: tail });
  const round = glowTexture(128, 128);
  const long = glowTexture(256, 24);
  const glows: Sprite[] = [];
  const flares: Sprite[] = [];
  const beams: ShaderMaterial[] = [];
  for (const side of [1, -1]) {
    const lamp = new Mesh(new BoxGeometry(0.5, 1.6, 2.4), lampMaterial);
    lamp.position.set(15.05, 6.4, side * 4.1);
    car.add(lamp);
    const back = new Mesh(new BoxGeometry(0.5, 1.4, 2.2), tailMaterial);
    back.position.set(-15.05, 6.6, side * 4.4);
    car.add(back);

    const glow = new Sprite(new SpriteMaterial({ map: round, color: lampColour, ...addLight, depthWrite: false, transparent: true, opacity: 0 }));
    glow.position.set(15.6, 6.4, side * 4.1);
    car.add(glow);
    glows.push(glow);
    const flare = new Sprite(new SpriteMaterial({ map: long, color: lampColour, ...addLight, depthWrite: false, depthTest: false, transparent: true, opacity: 0 }));
    flare.position.copy(glow.position);
    car.add(flare);
    flares.push(flare);

    const length = 30;
    const beam = new ShaderMaterial({
      uniforms: { uI: { value: 0 }, uColour: { value: lampColour } },
      // Brightest at the lamp and fading ahead, and soft at the beam's edges, where the cone turns away from view.
      vertexShader: `varying float vAlong; varying vec3 vNormal; varying vec3 vView;
        void main() {
          vAlong = position.y / ${length.toFixed(1)} + 0.5;
          vec4 p = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vView = normalize(-p.xyz);
          gl_Position = projectionMatrix * p;
        }`,
      fragmentShader: `uniform float uI; uniform vec3 uColour; varying float vAlong; varying vec3 vNormal; varying vec3 vView;
        void main() {
          float facing = pow(abs(dot(vNormal, vView)), 1.6);
          float a = uI * pow(vAlong, 1.8) * facing * 0.9;
          gl_FragColor = vec4(uColour * a, a);
        }`,
      ...addLight,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });
    const cone = new Mesh(new ConeGeometry(6.5, length, 28, 1, true), beam);
    // The cone's tip sits on the lamp and it opens out ahead of the car.
    cone.rotation.z = Math.PI / 2;
    cone.position.set(15.3 + length / 2, 6.4, side * 4.1);
    car.add(cone);
    beams.push(beam);
  }

  const place = (pitch: number) => {
    camera.position.set(0, centre.y + Math.sin(pitch) * distance, Math.cos(pitch) * distance);
    camera.lookAt(centre);
  };
  place(0);
  camera.updateMatrixWorld();

  // How wide the car is in the canvas side-on, measured on its near side.
  const a = new Vector3(-15, 6, depth / 2).project(camera);
  const b = new Vector3(15, 6, depth / 2).project(camera);
  const carWidth = ((b.x - a.x) / 2) * size;

  // Compile the shaders now, not on the launch's first frame.
  renderer.compile(scene, camera);
  renderer.render(scene, camera);

  let raf = 0;
  const pose = (t: number, timing: Timing) => {
    const { lights, drive, impact, facing } = timing;
    // Ink to the launch's orange as night falls, and the hubs come up out of the tyres' colour.
    const warm = ease(span(t, 0, 300));
    paint.color.copy(ink).lerp(accent, warm);
    hub.color.copy(ink).lerp(surface, warm);

    // The camera rises to a three-quarter view, showing the car's depth, while the car turns its nose towards you.
    const turn = ease(span(t, 60, drive));
    place(turn * 0.38);
    const go = span(t, drive, impact);
    const gone = ease(go);
    // Driving right, it turns its nose a little towards you, then away into the phone. Driving left, it spins round to
    // face the same way mirrored, a half-turn drift as night falls, then turns away into the phone.
    car.rotation.y = facing === 1 ? -0.5 * turn + 1.25 * gone : (Math.PI + 0.5) * turn - 1.25 * gone;
    // A squat as it pulls away, then a slight nose-down as it rushes in.
    car.rotation.z = 0.05 * Math.sin(Math.min(1, go * 2.2) * Math.PI) - 0.04 * gone;
    car.position.y = 0.4 * Math.sin(span(t, 120, 360) * Math.PI);
    const roll = (span(t, drive - 80, impact) ** 2) * 14 + span(t, 200, drive) * 0.6;
    wheels.forEach((w) => (w.rotation.z = -roll));

    // The headlights: two blinks, then on.
    const blink = (from: number, peak: number) => {
      const d = t - from;
      return d < 0 ? 0 : peak * Math.exp(-d / 90) * Math.min(1, d / 30);
    };
    const first = blink(lights, 1.3);
    const second = blink(lights + 150, 2.2);
    const steady = span(t, lights + 150, lights + 330) * 0.9;
    const boost = span(t, impact - 160, impact) * 1.6;
    const on = Math.max(first, second, steady) + boost;
    lampMaterial.color.copy(lampColour).multiplyScalar(0.35 + Math.min(1, on) * 0.65);
    glows.forEach((g) => {
      g.material.opacity = Math.min(1, on);
      g.scale.setScalar(5 + on * 5);
    });
    const flash = Math.max(first, second) + boost * 0.6;
    flares.forEach((f) => {
      f.material.opacity = Math.min(1, flash * 0.8);
      f.scale.set(10 + flash * 26, 1.2 + flash * 0.8, 1);
    });
    beams.forEach((m) => (m.uniforms.uI.value = Math.min(1.4, steady + boost * 0.5)));
  };

  return {
    canvas,
    size,
    carWidth,
    play(start, timing) {
      cancelAnimationFrame(raf);
      const frame = () => {
        const t = performance.now() - start;
        pose(t, timing);
        renderer.render(scene, camera);
        if (t < timing.impact + 120) raf = requestAnimationFrame(frame);
      };
      frame();
    },
    dispose() {
      cancelAnimationFrame(raf);
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
