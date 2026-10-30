// The home page's one-time motion graphic is remembered for the browser tab's session: it plays once each time someone
// opens the site fresh. The check also runs in the layout's <head> script, so it's already gone from the first paint.
export const interludeKey = "rydco-interlude";
export const interludeSeenClass = "interlude-seen";

export const interludeHeadCheck = `try{if(sessionStorage.getItem('${interludeKey}'))document.documentElement.classList.add('${interludeSeenClass}')}catch(e){}`;

export function interludeWasSeen() {
  try {
    return Boolean(sessionStorage.getItem(interludeKey));
  } catch {
    return false;
  }
}

export function rememberInterlude() {
  try {
    sessionStorage.setItem(interludeKey, "1");
  } catch {
    // Without storage it just plays again next time.
  }
}

// For anything that jumps past it on purpose: it's gone before the page starts moving, so the jump lands in the right place.
export function skipInterlude() {
  rememberInterlude();
  document.documentElement.classList.add(interludeSeenClass);
}
