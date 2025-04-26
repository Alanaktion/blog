import React, { useState } from "react"
import "../css/shiny.css"

const round = (num, fix = 3) => parseFloat(num.toFixed(fix))

const Shiny = ({ className, children }) => {
  const [interacting, setInteracting] = useState(false)
  const [interactStart, setInteractStart] = useState(false)
  const [background, setBackground] = useState({ x: 0, y: 0 })
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50 })

  const interactBegin = (e, delay = 50) => {
    setInteracting(true)
    setInteractStart(true)
    setTimeout(() => setInteractStart(false), delay)
  }

  const interact = e => {
    if (e.type === "touchmove") {
      e.clientX = e.touches[0].clientX
      e.clientY = e.touches[0].clientY
    }

    const rect = e.target.getBoundingClientRect()
    const absolute = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    const percent = {
      x: round((100 / rect.width) * absolute.x),
      y: round((100 / rect.height) * absolute.y),
    }
    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    }

    setBackground({
      x: round(50 + percent.x / 3 - 16.67),
      y: round(50 + percent.y / 4 - 12.5),
    })
    setRotate({
      x: round(-(center.x / 4)),
      y: round(center.y / 7),
    })
    setGlare({
      x: percent.x,
      y: percent.y,
    })
  }
  const interactEnd = e => {
    setInteracting(false)
    setRotate({ x: 0, y: 0 })
    setBackground({ x: 50, y: 50 })
  }

  const style = {
    "--mx": `${glare.x}%`,
    "--my": `${glare.y}%`,
    "--rx": `${rotate.x}deg`,
    "--ry": `${rotate.y}deg`,
    "--posx": `${background.x}%`,
    "--posy": `${background.y}%`,
    "--hyp":
      Math.sqrt(
        (glare.y - 50) * (glare.y - 50) + (glare.x - 50) * (glare.x - 50)
      ) / 50,
  }

  return (
    <div
      className={`shiny ${interacting && "interacting"} ${
        interactStart && "interact_start"
      }`}
      style={style}
    >
      <div className="shiny_translator">
        <div
          className={`${className} shiny_rotator`}
          onPointerEnter={interactBegin}
          onPointerMove={interact}
          onPointerLeave={interactEnd}
        >
          {children}
          <div className="shiny_shine" />
          <div className="shiny_glare" />
        </div>
      </div>
    </div>
  )
}

export default Shiny
