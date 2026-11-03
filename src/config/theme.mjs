// The one place to change how RydCo looks. Change `activeTheme`, or a colour below, and everything follows: the
// site's colours and gradients, the favicon and the link-preview image (scripts/build-theme.mjs generates them on
// `npm run dev` and `npm run build`, and stops the build if a theme's text wouldn't be readable).
//
// Colours are named for their job, never for how they look, so a class like `bg-brand` stays true in any theme.
// To add a theme, copy one, rename it, change its colours and point `activeTheme` at it.

export const themes = {
  // The app's own palette, from its Sky Sheet mockup. Keep the two in step.
  apricot: {
    surface: "#FFF6EE", //      Page background, light cards, light text on ink
    brand: "#FFE3CF", //        Hero and big colour blocks, where the gradient ends up
    panel: "#F5D3BD", //        Soft sections, cards, chips and the like: a clear step down from surface and brand
    screen: "#FFFFFF", //       Form fields, secondary buttons, the inside of phone mockups
    line: "#A9826B", //         The thin edge on a secondary button and fields: 3:1 on white, so the edge is seen
    accent: "#DB6A33", //       The app's orange: the top of the button gradient, bullets, stars, map routes
    accentStrong: "#C2551F", // Where button labels start sitting, route lines on brand or panel, selected states
    accentDeep: "#983A0B", //   The foot of the button gradient, text links, ticks
    onAccent: "#FFFFFF", //     Text on the button gradient
    ink: "#3A2A22", //          All text, the logo's wordmark and car, dark sections
    inkDeep: "#2A201A", //      Where dark sections deepen to, and the phone mockup's body
    inkSoft: "#6A5143", //      Secondary text
    trust: "#1F7A4A", //        Only for "verified" or "confirmed" signals
    onTrust: "#FFFFFF", //      Text on a trust badge
    sos: "#C8362E", //          Only for SOS
    onSos: "#FFFFFF", //        Text on SOS
  },
};

export const activeTheme = "apricot";

export const theme = themes[activeTheme];

// Shapes every theme shares.
export const shape = {
  surfaceRadius: "28px", // Cards, panels and the message box. Use it with `rounded-surface`.
};

// Easing every theme shares: CSS reads it as `--ease-out-soft`, scripts import it from here.
export const ease = {
  outSoft: "cubic-bezier(0.22, 0.8, 0.26, 1)", // Things arriving: entrances, glides, the header settling
};
