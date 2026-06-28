// Shared section navigation items, used by both the header (hamburger menu on
// narrow screens) and the floating SectionNav (wide screens). `key` maps to the
// "Header.nav.*" translation keys; `id` is the in-page section anchor.
export const navItems = [
  { key: "experience", id: "experience" },
  { key: "project", id: "project" },
  { key: "blog", id: "blog" },
  { key: "education", id: "education" },
] as const;
