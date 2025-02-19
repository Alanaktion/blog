import React from "react"

import images from "../../../content/unsplash.json"

const Unsplash = props => (
  <section {...props}>
    <div className="prose-all prose-rose max-w-none! mb-6 md:mb-8 px-4 py-px rounded-xl text-rose-900 bg-white dark:bg-rose-800 shadow-solid shadow-rose-800 dark:shadow-rose-950">
      <p>
        I enjoy taking photos. You can find some of them on <a href="https://unsplash.com/@alanaktion">Unsplash</a>, here's a selection!
      </p>
    </div>
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 xl:gap-6">
      {images.map(i => (
        <a href={`https://unsplash.com/photos/${i.url}`} key={i.id}>
          <img
            className="rounded-sm text-sm"
            src={`https://images.unsplash.com/photo-${i.id}?q=80&auto=format&w=420&h=315&fit=crop`}
            srcSet={`https://images.unsplash.com/photo-${i.id}?q=80&auto=format&w=840&h=630&fit=crop 2x`}
            alt={i.alt}
            loading="lazy"
          />
        </a>
      ))}
    </div>
  </section>
)

export default Unsplash
