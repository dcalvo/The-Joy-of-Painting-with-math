"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Shadertoy from "./Shadertoy"
import Editor from "./Editor"
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

type DemoPageProps = {
  title: string
  prevHref: string | null
  nextHref: string | null
  shaderSource: string
}

function DemoPage({ title, prevHref, nextHref, shaderSource }: DemoPageProps) {
  const router = useRouter()
  const [source, setSource] = useState(shaderSource)

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
        <NavButton text={"Back"} href={prevHref} className="mr-auto" />
        <h2 className="text-center text-2xl font-bold text-white">{title}</h2>
        <NavButton text={"Next"} href={nextHref} className="ml-auto" />
      </div>
      <GlslEditor defaultSource={shaderSource} />
      {/* <div id="content" className="flex-1 grid grid-cols-2 gap-x-8 py-4 px-6">
        <Editor defaultSource={shaderSource} onCompile={setSource} />
        <div className="flex flex-col items-center">
          <Shadertoy shaderSource={source} />
        </div>
      </div> */}
    </div>
  )
}

export default DemoPage
