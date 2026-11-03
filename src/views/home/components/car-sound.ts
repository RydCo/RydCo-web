// The sound of the hero launch's little car (views/home/components/HeroLaunch.tsx), made in the browser with Web Audio,
// so there's no file to download. A starter motor cranks three times, the engine catches with a short rev and pulls away,
// rising in pitch as it drives and panning across with the car, then it's muffled and gone, with a soft whoosh, as the car
// goes into the phone's screen. About 1.2s, timed to the launch: it starts with it, the engine catches at `catchAt` and the
// car is inside the screen by `goneAt` (both in seconds from the start).

export type SoundTiming = { catchAt: number; driveEnd: number; enterAt: number; goneAt: number; pan: [number, number] };

export function playCarSound(ctx: AudioContext, timing: SoundTiming) {
  const { catchAt, driveEnd, enterAt, goneAt, pan } = timing;
  const t0 = ctx.currentTime + 0.02;
  const at = (s: number) => t0 + s;
  const end = at(goneAt + 0.25);

  // Everything goes through one level, a pan that follows the car, and a gentle limiter.
  const level = ctx.createGain();
  level.gain.value = 0.22;
  const panner = ctx.createStereoPanner();
  panner.pan.setValueAtTime(pan[0], at(catchAt));
  panner.pan.linearRampToValueAtTime(pan[1], at(driveEnd));
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -12;
  limiter.ratio.value = 6;
  level.connect(panner).connect(limiter).connect(ctx.destination);

  // White noise, for the starter's grind and the whoosh.
  const noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * (goneAt + 0.4)), ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noiseSource = () => {
    const s = ctx.createBufferSource();
    s.buffer = noise;
    return s;
  };

  // The starter motor: three short grinding cranks, each with a low chug as the engine turns over.
  const grind = noiseSource();
  const grindTone = ctx.createBiquadFilter();
  grindTone.type = "bandpass";
  grindTone.frequency.value = 520;
  grindTone.Q.value = 1.4;
  const grindLevel = ctx.createGain();
  grindLevel.gain.value = 0;
  grind.connect(grindTone).connect(grindLevel).connect(level);
  const crank = catchAt / 3;
  for (let i = 0; i < 3; i++) {
    const s = at(i * crank);
    grindLevel.gain.setValueAtTime(0, s);
    grindLevel.gain.linearRampToValueAtTime(3.2, s + 0.012);
    grindLevel.gain.setValueAtTime(2.6, s + crank * 0.62);
    grindLevel.gain.linearRampToValueAtTime(0, s + crank * 0.9);
    const chug = ctx.createOscillator();
    chug.type = "sine";
    chug.frequency.setValueAtTime(95, s);
    chug.frequency.exponentialRampToValueAtTime(55, s + crank * 0.8);
    const chugLevel = ctx.createGain();
    chugLevel.gain.setValueAtTime(0.0001, s);
    chugLevel.gain.exponentialRampToValueAtTime(0.9, s + 0.015);
    chugLevel.gain.exponentialRampToValueAtTime(0.0001, s + crank * 0.85);
    chug.connect(chugLevel).connect(level);
    chug.start(s);
    chug.stop(s + crank);
  }
  // The starter's whine and flutter, riding on the grind.
  const flutter = ctx.createOscillator();
  flutter.type = "square";
  flutter.frequency.value = 34;
  const flutterDepth = ctx.createGain();
  flutterDepth.gain.value = 1.2;
  flutter.connect(flutterDepth).connect(grindLevel.gain);
  grind.start(t0);
  grind.stop(at(catchAt + 0.02));
  flutter.start(t0);
  flutter.stop(at(catchAt + 0.02));

  // The engine: one firing rate (in Hz) drives three tones, a sub an octave down for the lumpy idle, the note itself and
  // a rougher one above, all through a low-pass filter that opens as it revs and closes as the car goes into the screen.
  const rate = ctx.createConstantSource();
  rate.offset.setValueAtTime(22, at(catchAt));
  rate.offset.exponentialRampToValueAtTime(64, at(catchAt + 0.09)); // the catch: a short rev
  rate.offset.exponentialRampToValueAtTime(40, at(catchAt + 0.24));
  rate.offset.exponentialRampToValueAtTime(66, at(driveEnd)); // pulling away
  rate.offset.setValueAtTime(66, at(goneAt));
  const engine = ctx.createGain();
  engine.gain.value = 0;
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.Q.value = 3;
  tone.frequency.setValueAtTime(380, at(catchAt));
  tone.frequency.exponentialRampToValueAtTime(1500, at(catchAt + 0.09));
  tone.frequency.exponentialRampToValueAtTime(760, at(catchAt + 0.24));
  tone.frequency.exponentialRampToValueAtTime(1300, at(enterAt));
  tone.frequency.exponentialRampToValueAtTime(260, at(goneAt)); // muffled, inside the phone
  // A soft clip, for the engine's grit.
  const grit = ctx.createWaveShaper();
  const curve = new Float32Array(1024);
  for (let i = 0; i < curve.length; i++) {
    const x = (i / (curve.length - 1)) * 2 - 1;
    curve[i] = Math.tanh(x * 2.4);
  }
  grit.curve = curve;
  engine.connect(grit).connect(tone).connect(level);
  const parts: [OscillatorType, number, number][] = [
    ["square", 0.5, 0.35],
    ["sawtooth", 1, 0.5],
    ["sawtooth", 2.02, 0.22],
  ];
  const oscillators = parts.map(([type, ratio, volume]) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = 0;
    const scale = ctx.createGain();
    scale.gain.value = ratio;
    rate.connect(scale).connect(osc.frequency);
    const v = ctx.createGain();
    v.gain.value = volume;
    osc.connect(v).connect(engine);
    return osc;
  });
  engine.gain.setValueAtTime(0, at(catchAt - 0.01));
  engine.gain.linearRampToValueAtTime(0.9, at(catchAt + 0.03));
  engine.gain.setValueAtTime(0.9, at(enterAt));
  engine.gain.linearRampToValueAtTime(0, at(goneAt + 0.05));

  // A soft whoosh as the car goes into the screen.
  const whoosh = noiseSource();
  const whooshTone = ctx.createBiquadFilter();
  whooshTone.type = "bandpass";
  whooshTone.Q.value = 0.9;
  whooshTone.frequency.setValueAtTime(2400, at(enterAt));
  whooshTone.frequency.exponentialRampToValueAtTime(420, at(goneAt + 0.15));
  const whooshLevel = ctx.createGain();
  whooshLevel.gain.setValueAtTime(0, at(enterAt));
  whooshLevel.gain.linearRampToValueAtTime(0.28, at(enterAt + (goneAt - enterAt) * 0.6));
  whooshLevel.gain.linearRampToValueAtTime(0, at(goneAt + 0.18));
  whoosh.connect(whooshTone).connect(whooshLevel).connect(level);
  whoosh.start(at(enterAt), enterAt);
  whoosh.stop(end);

  rate.start(t0);
  rate.stop(end);
  oscillators.forEach((o) => {
    o.start(at(catchAt - 0.01));
    o.stop(end);
  });
}
