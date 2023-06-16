import { ReactNode } from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import bg from "@public/background.jpg"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "The Joy of Painting (with Math)",
  description: "A step-by-step guide to creating beautiful images with math.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundImage: `url(${bg.src})` }}>
        {children}
      </body>
    </html>
  )
}
