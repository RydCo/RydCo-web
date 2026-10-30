// The one place to change how RydCo looks. Change `activeTheme`, or a colour below, and everything follows: the
// site's colours, the browser bar, the favicon and the link-preview image (scripts/build-theme.mjs generates them on
// `npm run dev` and `npm run build`, and stops the build if a theme's text wouldn't be readable).
//
// Colours are named for their job, never for how they look, so a class like `bg-brand` stays true in any theme.
// To add a theme, copy one, rename it, change its colours and point `activeTheme` at it.

export const themes = {
  peach: {
    brand: "#FFE8D7", //    Hero and big colour blocks
    panel: "#FFD7BD", //    Soft sections, cards, chips and the like
    accent: "#C24E15", //   Main buttons, links on light grounds, small marks such as route lines and bullets
    onAccent: "#FFFFFF", // Text on an accent button
    ink: "#2C1E18", //      All text, the logo, dark sections
    inkSoft: "#6B5A52", //  Secondary text
    surface: "#FFF8F3", //  Page background, light cards, light text on ink
    screen: "#FFFFFF", //   Inside the phone mockups
    trust: "#1F7A5A", //    Only for "verified" or "confirmed" signals
    onTrust: "#FFFFFF", //  Text on a trust badge
  },
  pumpkin: {
    brand: "#FF7518",
    panel: "#FCE3D3",
    accent: "#C24E15",
    onAccent: "#FFFFFF",
    ink: "#2C1E18",
    inkSoft: "#6B5A52",
    surface: "#FFF8F3",
    screen: "#FFFFFF",
    trust: "#1F7A5A",
    onTrust: "#FFFFFF",
  },
};

export const activeTheme = "peach";

export const theme = themes[activeTheme];

// Shapes every theme shares.
export const shape = {
  surfaceRadius: "28px", // Cards, panels and the message box. Use it with `rounded-surface`.
};
