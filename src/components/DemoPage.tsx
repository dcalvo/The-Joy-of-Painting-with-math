"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Shadertoy from "./Shadertoy"

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

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.target instanceof HTMLInputElement) return
      const handleKeyDown = {
        ArrowLeft: () => router.push(prevHref ?? ""),
        ArrowRight: () => router.push(nextHref ?? ""),
      }[e.key]
      handleKeyDown?.()
    }
  }, [])

  return (
    <div className="w-screen h-screen py-4 px-6 flex flex-col">
      <div className="pb-8 flex">
        <NavButton text={"Back"} href={prevHref} className="mr-auto" />
        <h2 className="text-center text-2xl font-bold">{title}</h2>
        <NavButton text={"Next"} href={nextHref} className="ml-auto" />
      </div>
      <div className="flex-1 flex">
        <div className="flex-1">
          <h1>hello world!</h1>
        </div>
        <div className="ml-auto">
          <Shadertoy shaderSource={shaderSource} />
        </div>
      </div>
    </div>
  )
}

export default DemoPage
