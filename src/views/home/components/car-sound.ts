// The sound of the hero launch's little car (views/home/components/HeroLaunch.tsx): the starter cranks, the engine catches
// as the headlights come on, it pulls away and passes, and it's muffled, with a whoosh, as the car goes into the phone's
// screen. One short recording, public/sounds/car-launch.mp3 (mono, about 18 KB), mixed to the launch's timeline from three
// Mixkit sound effects: "Car engine start" (1566), "Fast car drive by" (1538) and "Cinematic whoosh fast transition"
// (1492). Mixkit's Sound Effects Free License (mixkit.co/license) lets a website use them, free and with no credit, but not
// pass them on by themselves. If the launch's timing changes, the recording has to be remixed to match.

const file = "/sounds/car-launch.mp3";

export type CarSound = { ctx: AudioContext; clip: Promise<AudioBuffer | null> };

// Fetched and decoded as soon as there's a context to play it in; null if that fails, and then the launch is silent.
export function loadCarSound(ctx: AudioContext): CarSound {
  const clip = fetch(file)
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(`${file}: ${r.status}`))))
    .then((bytes) => ctx.decodeAudioData(bytes))
    .catch(() => null);
  return { ctx, clip };
}

// Plays it from now, panned with the car from `pan[0]` to `pan[1]` between `from` and `to` (seconds from now). If it's still
// loading, it starts when it's ready, that far in, so it stays with the car; if it's more than a moment late, it's skipped.
export function playCarSound({ ctx, clip }: CarSound, pan: [number, number], from: number, to: number) {
  const t0 = ctx.currentTime;
  clip.then((buffer) => {
    const late = ctx.currentTime - t0;
    if (!buffer || late > 0.2 || ctx.state !== "running") return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(pan[0], 0);
    panner.pan.setValueAtTime(pan[0], t0 + from);
    panner.pan.linearRampToValueAtTime(pan[1], t0 + to);
    source.connect(panner).connect(ctx.destination);
    source.start(ctx.currentTime, late);
  });
}
