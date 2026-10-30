import type { CSSProperties } from "react";

// RydCo's one motif: the route line that ends under the wordmark, with the car parked at its end.
// Geometry follows the app's splash screen (app-mocks/v8.html).

type Tone = { ink: string; line: string; glass: string };

const toneOn = {
  apricot: { ink: "fill-cocoa", line: "stroke-cocoa", glass: "fill-apricot" },
  cream: { ink: "fill-cocoa", line: "stroke-cocoa", glass: "fill-cream" },
  cocoa: { ink: "fill-cream", line: "stroke-apricot", glass: "fill-cocoa" },
} satisfies Record<string, Tone>;

function Car({ tone, transform, scale, live }: { tone: Tone; transform: string; scale: number; live?: boolean }) {
  const body = tone.line.replace("stroke-", "fill-");
  return (
    <g
      transform={transform}
      {...(live ? { "data-route-car": "", "data-scale": scale, suppressHydrationWarning: true } : {})}
    >
      <rect className={body} x="-15" y="-10" width="30" height="8" rx="3" />
      <path className={body} d="M-9 -10 L-5 -16 H6 L10 -10Z" />
      <rect className={tone.glass} x="-4" y="-14.5" width="8" height="3.5" rx="1" />
      <circle className={body} cx="-8.5" cy="-1.5" r="3.2" />
      <circle className={body} cx="8.5" cy="-1.5" r="3.2" />
    </g>
  );
}

function Wordmark({ tone, x, y, size, length }: { tone: Tone; x: number; y: number; size: number; length: number }) {
  return (
    <text x={x} y={y} textLength={length} lengthAdjust="spacing" className={`${tone.ink} font-display`} style={{ fontSize: size, fontWeight: 800 }}>
      RydCo
    </text>
  );
}

const hero = {
  desktop: {
    viewBox: "0 0 1200 440",
    d: "M1580 70 C1200 30 560 36 240 110 C40 150 -30 408 170 408 L780 408",
    stroke: 16,
    word: { x: 170, y: 320, size: 200, length: 590 },
    car: { x: 780, y: 408, scale: 3.4 },
  },
  mobile: {
    viewBox: "0 0 360 260",
    d: "M470 40 C330 14 150 18 80 52 C18 82 -4 216 36 216 L316 216",
    stroke: 8,
    word: { x: 36, y: 176, size: 92, length: 272 },
    car: { x: 316, y: 216, scale: 1.6 },
  },
};

// The signature animation. It lives in the layout's <head> script (see app/layout.tsx), not beside the SVG:
// React warns about, and never runs, a <script> it creates in the browser, which happens on in-app navigation.
//
// Before the first paint it marks the page "route-pending", so CSS (globals.css) holds the line undrawn and the car
// hidden. Once the page is parsed it draws the line in from the right edge and the car rides its tip until it parks
// under the wordmark. Reduced motion or no JavaScript: no class, so the finished logo shows and nothing moves.
// If anything here fails, the CSS fallback reveals the finished logo after 4 seconds.
export const heroScript = `(function(){var d=document.documentElement;
try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return}catch(e){return}
d.classList.add('route-pending');
document.addEventListener('DOMContentLoaded',function(){var p,c;try{
var all=document.querySelectorAll('[data-route-hero]'),s=null;
for(var i=0;i<all.length;i++){if(all[i].getBoundingClientRect().width>0){s=all[i];break}}
if(!s){d.classList.remove('route-pending');return}
p=s.querySelector('[data-route-path]');c=s.querySelector('[data-route-car]');
var L=p.getTotalLength(),sc=+c.getAttribute('data-scale'),D=1600,W=120,t0=null;
function ease(x){return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2}
function place(t){var a=p.getPointAtLength(t*L),b=p.getPointAtLength(Math.min(L,t*L+1));
var g=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI,f=Math.cos(g*Math.PI/180)<0;
c.setAttribute('transform','translate('+a.x+' '+a.y+') rotate('+(f?g-180:g)+') scale('+(f?-sc:sc)+' '+sc+')')}
p.style.strokeDasharray='1 1';p.style.strokeDashoffset='1';place(0);c.style.opacity='1';
d.classList.remove('route-pending');
function step(now){if(t0===null)t0=now;var x=Math.min(1,Math.max(0,(now-t0-W)/D)),t=ease(x);
p.style.strokeDashoffset=String(1-t);place(t);
if(x<1)requestAnimationFrame(step);else{p.style.strokeDasharray='';p.style.strokeDashoffset='';c.style.opacity=''}}
requestAnimationFrame(step)
}catch(e){d.classList.remove('route-pending');if(p){p.style.strokeDasharray='';p.style.strokeDashoffset=''}if(c)c.style.opacity=''}})})();`;

function HeroSvg({ g, className }: { g: (typeof hero)["desktop"]; className: string }) {
  const tone = toneOn.apricot;
  return (
    <svg viewBox={g.viewBox} className={`block h-auto w-full overflow-visible ${className}`} aria-hidden="true" data-route-hero="">
      <path
        data-route-path=""
        suppressHydrationWarning
        pathLength={1}
        d={g.d}
        className={tone.line}
        fill="none"
        strokeWidth={g.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Wordmark tone={tone} {...g.word} />
      <Car tone={tone} transform={`translate(${g.car.x} ${g.car.y}) scale(${g.car.scale})`} scale={g.car.scale} live />
    </svg>
  );
}

export function HeroRoute() {
  return (
    <>
      <HeroSvg g={hero.desktop} className="hidden md:block" />
      <HeroSvg g={hero.mobile} className="md:hidden" />
    </>
  );
}

// The static logo: wordmark, underline and car, with the line's tail curling in from the left.
export function Lockup({ on = "cream", className = "", title }: { on?: keyof typeof toneOn; className?: string; title?: string }) {
  const tone = toneOn[on];
  return (
    <svg
      viewBox="0 0 580 232"
      className={`block h-auto overflow-visible ${className}`}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <path
        d="M8 118 C8 190 30 216 60 216 L520 216"
        className={tone.line}
        fill="none"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Wordmark tone={tone} x={60} y={150} size={150} length={440} />
      <Car tone={tone} transform="translate(520 216) scale(2.6)" scale={2.6} />
    </svg>
  );
}

// Several homes, one workplace: routes from different areas join one line before they reach the office.
export function RouteConverge({ from, to, className = "" }: { from: string[]; to: string; className?: string }) {
  // Labels sit to the left of each start, so no line ever crosses one.
  const merge = { x: 400, y: 220 };
  const end = { x: 560, y: 220 };
  const starts = from.map((name, i) => ({ name, x: 190, y: 40 + i * (360 / Math.max(1, from.length - 1)) }));
  return (
    <svg viewBox="0 0 620 440" className={`block h-auto w-full overflow-visible ${className}`} role="img" aria-label={`Routes from ${from.join(", ")} joining into one shared ride to ${to}`}>
      {starts.map((s) => (
        <path
          key={s.name}
          d={`M${s.x} ${s.y} C${s.x + 130} ${s.y} 300 ${merge.y} ${merge.x} ${merge.y} L${end.x} ${end.y}`}
          className="fill-none stroke-apricot"
          strokeWidth="9"
          strokeLinecap="round"
        />
      ))}
      {starts.map((s) => (
        <g key={s.name}>
          <circle cx={s.x} cy={s.y} r="10" className="fill-cocoa stroke-apricot" strokeWidth="5" />
          <text x={s.x - 24} y={s.y + 8} textAnchor="end" className="fill-cream font-sans text-[22px] font-semibold">
            {s.name}
          </text>
        </g>
      ))}
      <Car tone={toneOn.cocoa} transform={`translate(482 ${merge.y - 4}) scale(2.6)`} scale={2.6} />
      <circle cx={end.x} cy={end.y} r="18" className="fill-cream" />
      <circle cx={end.x} cy={end.y} r="7" className="fill-cocoa" />
      <text x={end.x} y={end.y + 56} textAnchor="middle" className="fill-cream font-display text-[26px] font-bold">
        {to}
      </text>
    </svg>
  );
}

// One full-width crossing of the line, used once per page between its two halves. As the band scrolls past, the car
// drives along the line from left to right (CSS in globals.css under "Route band", which gets the path through
// --band-path); without scroll-driven animations, or with reduced motion, it stays parked in the middle.
const bandPath = "M-40 104 C260 26 460 70 720 70 S1180 116 1480 36";

export function RouteBand({ on = "apricot" }: { on?: keyof typeof toneOn }) {
  const tone = toneOn[on];
  return (
    <div className="band overflow-hidden" aria-hidden="true" style={{ "--band-path": `path("${bandPath}")` } as CSSProperties}>
      <svg viewBox="0 0 1440 140" preserveAspectRatio="xMidYMid slice" className="block h-[96px] w-full md:h-[140px]">
        <path d={bandPath} className={tone.line} fill="none" strokeWidth="10" strokeLinecap="round" />
        <g className="band-car">
          <Car tone={tone} transform="translate(720 70) scale(2.4)" scale={2.4} />
        </g>
      </svg>
    </div>
  );
}
