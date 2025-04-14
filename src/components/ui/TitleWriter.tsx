'use client'

import React, { useState, useEffect } from 'react'

export function TitleWriter() {
  const [text, setText] = useState('')
  const fullText = 'Bem vindo a ghast consultoria'

  useEffect(() => {
    let currentIndex = 0
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(intervalId)
      }
    }, 100) // Adjust this value to control typing speed

    return () => clearInterval(intervalId)
  }, [])

  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
      {text}
      <span className="animate-blink">|</span>
    </h1>
  )
}