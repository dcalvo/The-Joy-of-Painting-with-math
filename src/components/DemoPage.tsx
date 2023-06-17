"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import GlslEditor from "./GlslEditor"

function NavButton({ text, href, className }: { text: string; href: string | null; className?: string }) {
  const router = useRouter()
  const enabledStyle = "bg-blue-500 hover:bg-blue-700 text-white"
  const disabledStyle = "bg-gray-500 text-gray-700 cursor-not-allowed"

  return (
    <div className={className}>
      <button
        className={`${href ? enabledStyle : disabledStyle} text-white font-bold py-2 px-4 rounded`}
        disabled={!href}
        onClick={() => router.push(href ?? "")}
      >
        {text}
      </button>
    </div>
  )
}

interface FontSizeInputProps {
  value: number
  onChange: (value: number) => void
}

function FontSizeInput({ value, onChange }: FontSizeInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value)
    if (isNaN(newValue)) onChange(0)
    if (newValue >= 1 && newValue <= 98) onChange(newValue)
  }

  return (
    <div className="mx-auto">
      <label className="block text-center text-lg text-white">
        Font Size
        <input
          type="number"
          value={value.toString()}
          onChange={handleChange}
          maxLength={2}
          min={1}
          max={98}
          className="w-8 h-8 p-1 ml-2 border border-gray-300 text-black rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </label>
    </div>
  )
}

type DemoPageProps = {
  title: string
  prevHref: string | null
  nextHref: string | null
  shaderSource: string
}

function DemoPage({ title, prevHref, nextHref, shaderSource }: DemoPageProps) {
  const router = useRouter()
  const [fontSize, setFontSize] = useState<number>(14)

  // Navigate pages
  useEffect(() => {
    document.onkeydown = (e) => {
      const elements_to_ignore = [HTMLInputElement, HTMLTextAreaElement]
      if (elements_to_ignore.some((type) => e.target instanceof type)) return
      const handleKeyDown = {
        ArrowLeft: () => router.push(prevHref ?? ""),
        ArrowRight: () => router.push(nextHref ?? ""),
      }[e.key]
      handleKeyDown?.()
    }
  })

  return (
    <div className="w-screen h-screen flex flex-col">
      <div id="titlebar" className="bg-[#2f302a] flex py-4 px-6 z-[300]">
        <div className="mr-auto flex space-x-4">
          <NavButton text={"Back"} href={prevHref} className="mr-auto" />
          <FontSizeInput value={fontSize} onChange={setFontSize} />
        </div>
        <h2 className="text-center text-2xl font-bold text-white">{title}</h2>
        <NavButton text={"Next"} href={nextHref} className="ml-auto" />
      </div>
      <GlslEditor defaultSource={shaderSource} fontSize={fontSize} />
    </div>
  )
}

export default DemoPage
