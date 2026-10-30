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
    panel: "#FBE3D4", //        Soft sections, cards, chips and the like
    screen: "#FFFFFF", //       Form fields, secondary buttons, the inside of phone mockups
    line: "#E3C6AF", //         The thin edge on a secondary button
    accent: "#DB6A33", //       The app's orange: the top of the button gradient, bullets, stars, map routes
    accentStrong: "#C2551F", // Where button labels start sitting, route lines on brand or panel, selected states
    accentDeep: "#A8430F", //   The foot of the button gradient, text links, ticks
    onAccent: "#FFFFFF", //     Text on the button gradient
    ink: "#3A2A22", //          All text, the logo's wordmark and car, dark sections
    inkDeep: "#2A201A", //      Where dark sections deepen to, and the phone mockup's body
    inkSoft: "#7A6151", //      Secondary text
    trust: "#1F7A4A", //        Only for "verified" or "confirmed" signals
    onTrust: "#FFFFFF", //      Text on a trust badge
    sos: "#C8362E", //          Only for SOS
    onSos: "#FFFFFF", //        Text on SOS
  },
  // The softer look the site had before it was matched to the app.
  peach: {
    surface: "#FFF8F3",
    brand: "#FFE8D7",
    panel: "#FFD7BD",
    screen: "#FFFFFF",
    line: "#E3C6AF",
    accent: "#DB6A33",
    accentStrong: "#C2551F",
    accentDeep: "#A8430F",
    onAccent: "#FFFFFF",
    ink: "#2C1E18",
    inkDeep: "#1E140F",
    inkSoft: "#6B5A52",
    trust: "#1F7A5A",
    onTrust: "#FFFFFF",
    sos: "#C8362E",
    onSos: "#FFFFFF",
  },
};

export const activeTheme = "apricot";

export const theme = themes[activeTheme];

// Shapes every theme shares.
export const shape = {
  surfaceRadius: "28px", // Cards, panels and the message box. Use it with `rounded-surface`.
};
