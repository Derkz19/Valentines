"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Heart } from "lucide-react"
import Devine from "./images/Devine.png"

export default function ValentinePage() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showMessage, setShowMessage] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const moveNoButton = useCallback(() => {
    if (noButtonRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const buttonRect = noButtonRef.current.getBoundingClientRect()

      const maxX = containerRect.width - buttonRect.width
      const maxY = containerRect.height - buttonRect.height

      const newX = Math.random() * maxX
      const newY = Math.random() * maxY

      setNoButtonPosition({ x: newX, y: newY })
    }
  }, [])

  useEffect(() => {
    moveNoButton()
    window.addEventListener("resize", moveNoButton)
    return () => window.removeEventListener("resize", moveNoButton)
  }, [moveNoButton])

  const handleYesClick = () => {
    setShowMessage(true)
   
  }

 

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4 relative overflow-hidden"
    >
      <h1 className="text-4xl font-bold text-pink-600 mb-8">Will you be my Valentine?</h1>
      <Heart className="w-24 h-24 text-red-500 animate-pulse mb-8" />
      {showMessage ? (
        <div className="text-2xl font-semibold text-pink-600 animate-bounce flex flex-col items-center">See you in Davao! ❤️ Go order the handbag ako bahala hehe
        <img className="h-60 w-60 " src={Devine}/>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={handleYesClick}
          >
            YES!!!
          </button>
          <button
            ref={noButtonRef}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all duration-500 ease-in-out absolute"
            style={{
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
            }}
            onMouseEnter={moveNoButton}
          >
            No?!
          </button>
        </div>
      )}
    </div>
  )
}

