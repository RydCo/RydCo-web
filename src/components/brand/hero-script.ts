// The signature animation. It lives in the layout's <head> script (see app/layout.tsx), not beside the SVG:
// React warns about, and never runs, a <script> it creates in the browser, which happens on in-app navigation.
//
// Before the first paint it marks the page "route-pending", so CSS (styles/motion/hero-route.css) holds the line undrawn and the car
// hidden. Once the page is parsed it draws the line in from the right edge and the car rides its tip until it parks
// under the label. Reduced motion or no JavaScript: no class, so the finished line shows and nothing moves.
// If anything here fails, the CSS fallback reveals the finished line after 4 seconds.
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
