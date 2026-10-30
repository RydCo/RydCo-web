// The home hero's launch (views/home/components/HeroLaunch) plays on the first scroll of each page load, unless someone
// has already chosen to jump ahead.
let off = false;

export const skipHeroLaunch = () => {
  off = true;
};

export const launchIsOff = () => off;
