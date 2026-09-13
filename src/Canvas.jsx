import React, { useRef, useMemo } from 'react'
import canvasImages from "./canvasimages"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Canvas = ({ details }) => {
  const { startIndex, numImages, duration, size, top, left, zindex } = details
  const canvasRef = useRef(null)

  // Random speed memoized taake re-render par reset na ho
  const scrollSpeed = useMemo(() => (Math.random() * 0.8 + 0.1).toFixed(1), [])

  useGSAP(() => {
    // 1. Images ko memory mein pehle se load (Preload) kar lo
    const loadedImages = []
    for (let i = startIndex; i < startIndex + numImages; i++) {
      const img = new window.Image()
      img.src = canvasImages[i]
      loadedImages.push(img)
    }

    const indexObj = { value: 0 }

    // 2. Canvas size setup (Sirf ek baar set hoga, layout reflow se bachne ke liye)
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }

    // 3. Smooth Direct Drawing Loop without React State
    gsap.to(indexObj, {
      value: numImages - 1,
      duration: duration || 3,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        const currentImgIndex = Math.round(indexObj.value)
        const img = loadedImages[currentImgIndex]

        if (canvas && img && img.complete) {
          const ctx = canvas.getContext('2d')
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.save()
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
          ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight)
          ctx.restore()
        }
      }
    })

    // Entry Fade Animation
    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      scale: 0.8
    })
  }, [details])

  return (
    <canvas
      data-scroll
      data-scroll-speed={scrollSpeed}
      ref={canvasRef}
      style={{
        width: `${size * 1.8}px`,
        height: `${size * 1.8}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: zindex,
      }}
      className="absolute"
    />
  )
}

export default Canvas