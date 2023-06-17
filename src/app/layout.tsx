import { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "The Joy of Painting (with Math)",
  description: "A step-by-step guide to creating beautiful images with math.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://patriciogonzalezvivo.github.io/glslEditor/build/glslEditor.css"
        />
        <script
          type="application/javascript"
          src="https://patriciogonzalezvivo.github.io/glslEditor/build/glslEditor.js"
        />
      </head>
      <body className={`${inter.className} bg-[#272822]`}>{children}</body>
    </html>
  )
}
