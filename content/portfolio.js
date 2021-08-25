import zippa from "./assets/portfolio/zippa-builder.png"
import structhub from "./assets/portfolio/structhub.svg"
import structhubDark from "./assets/portfolio/structhub-dark.svg"
import tlBrand from "./assets/portfolio/tl-brand.png"
import phproject from "./assets/portfolio/phproject.png"
import more from "./assets/portfolio/more.svg"
import moreDark from "./assets/portfolio/more-dark.svg"

const items = [
  {
    href: "https://web.archive.org/web/20210226213120/https://getzippa.com/",
    img: zippa,
    alt: "A screenshot of the Zippa knowledge base builder interface, with a navigation menu on the left and a list of knowledge bases in the main content area.",
    title: "Zippa",
    description: "A startup I co-founded as a platform for publishing knowledge bases. I designed the branding and back-end UI, implemented marketing page designs, and built the applications."
  },
  {
    href: "https://web.archive.org/web/20180816221417/https://www.structhub.com/",
    img: {
      light: structhub,
      dark: structhubDark,
    },
    alt: "The blue StructHub logo with compass glyph.",
    title: "StructHub",
    description: "A startup focused on providing a sophisticated publishing platform for instruction and assembly manuals. I lead the development and did all of the branding and UI design."
  },
  {
    href: "https://phpizza.com/~alan/tl-styleguide/",
    img: tlBrand,
    alt: "A screenshot of the Thrive Life Digital Style Guide, showing color usage.",
    title: "Thrive Life Digital Style Guide",
    description: "A style guide for the Thrive Life digital platforms. I lead the development team and co-directed the UI design. This style guide was intended to keep branding consistent across the UIs."
  },
  {
    href: "https://www.phproject.org/",
    img: phproject,
    alt: "A screenshot of the Phproject landing page, showing some feature examples.",
    title: "Phproject",
    description: "An open source project management suite I started early in my professional web development career. It's gathered a decent userbase, with contributors from all over the world, and is translated by the community into 12 languages.",
  },
  {
    href: "https://www.github.com/Alanaktion",
    img: {
      light: more,
      dark: moreDark,
    },
    alt: "A stylized ellipsis implying more content",
    title: "And more!",
    description: "Check out my GitHub profile for a lot of other projects I've worked on.",
  },
]

export default items
