import ren from "./assets/portfolio/ren.png"
import ren2x from "./assets/portfolio/ren@2x.png"
import lime from "./assets/portfolio/lime.png"
import lime2x from "./assets/portfolio/lime@2x.png"
import zippa from "./assets/portfolio/zippa-builder.png"
import zippa2x from "./assets/portfolio/zippa-builder@2x.png"
import phproject from "./assets/portfolio/phproject.png"
import phproject2x from "./assets/portfolio/phproject@2x.png"
import structhub from "./assets/portfolio/structhub.svg"
import structhubDark from "./assets/portfolio/structhub-dark.svg"
import more from "./assets/portfolio/more.svg"
import moreDark from "./assets/portfolio/more-dark.svg"

const items = [
  {
    href: "https://github.com/Alanaktion/rens-adventures",
    img: {
      src: ren.src,
      srcset: `${ren.src} 1x, ${ren2x.src} 2x`,
      className: "image-pixelated",
    },
    alt: "The title card for Ren's Adventures, showing the name and main character sprite.",
    title: "Ren's Adventures",
    description:
      "A simple visual novel game template built for the Playdate handheld console. Includes a basic scene scripting system, conversion tools, and demo project.",
  },
  {
    href: "https://github.com/Alanaktion/lime-testing",
    img: {
      src: lime.src,
      srcset: `${lime.src} 1x, ${lime2x.src} 2x`,
    },
    alt: "A screenshot of a test run in the Lime Testing Suite, with a list of tests being performed showing each test's status and comments on the result.",
    title: "Lime Testing Suite",
    description:
      "A simple test case library and manual software testing suite, designed to make reproducable test flows easy and intuitive. Built on Laravel with Inertia.js, Vue, and Tailwind CSS.",
  },
  {
    href: "https://web.archive.org/web/20210226213120/https://getzippa.com/",
    img: {
      src: zippa.src,
      srcset: `${zippa.src} 1x, ${zippa2x.src} 2x`,
    },
    alt: "A screenshot of the Zippa knowledge base builder interface, with a navigation menu on the left and a list of knowledge bases in the main content area.",
    title: "Zippa",
    description:
      "A startup I co-founded as a platform for publishing knowledge bases. I designed the branding and back-end UI, implemented marketing page designs, and built the applications.",
  },
  {
    href: "https://www.phproject.org/",
    img: {
      src: phproject.src,
      srcset: `${phproject.src} 1x, ${phproject2x.src} 2x`,
    },
    alt: "A screenshot of the Phproject landing page, showing some feature examples.",
    title: "Phproject",
    description:
      "An open source project management suite I started early in my professional web development career. It's gathered a decent userbase, with contributors from all over the world, and is translated by the community into 12 languages.",
  },
  {
    href: "https://web.archive.org/web/20180816221417/https://www.structhub.com/",
    img: {
      light: structhub.src,
      dark: structhubDark.src,
    },
    alt: "The blue StructHub logo with compass glyph.",
    title: "StructHub",
    description:
      "A startup focused on providing a sophisticated publishing platform for instruction and assembly manuals. I lead the development and did all of the branding and UI design.",
  },
  {
    href: "https://github.com/Alanaktion",
    img: {
      light: more.src,
      dark: moreDark.src,
    },
    alt: "A stylized ellipsis implying more content",
    title: "And more!",
    description:
      "Check out my GitHub profile for a lot of other projects I've worked on.",
  },
]

export default items
