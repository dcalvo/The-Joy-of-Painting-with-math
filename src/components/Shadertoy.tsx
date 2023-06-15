"use client"

import { useEffect, useRef } from "react"

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth
  const displayHeight = canvas.clientHeight

  // Check if the canvas is not the same size.
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth
    canvas.height = displayHeight
  }

  return needResize
}

type ShaderType = WebGLRenderingContext["VERTEX_SHADER"] | WebGLRenderingContext["FRAGMENT_SHADER"]

function createShader(gl: WebGLRenderingContext, type: ShaderType, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error("failed to create shader")

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    throw new Error(`Could not compile WebGL program. \n\n${info}`)
  }

  return shader
}

function Shadertoy({ shaderSource }: { shaderSource: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const gl = canvasRef.current?.getContext("webgl")
    if (!gl) {
      throw new Error("webgl failed to load :(")
    }

    // setup vertex shader
    const vs = `
      // an attribute will receive data from a buffer
      attribute vec4 a_position;

      // all shaders have a main function
      void main() {

        // gl_Position is a special variable a vertex shader
        // is responsible for setting
        gl_Position = a_position;
      }
    `
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vs)

    // setup fragment shader
    const fs = `
      precision highp float;

      uniform vec2 iResolution;
      uniform vec2 iMouse;
      uniform float iTime;

      ${shaderSource}

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fs)

    // setup GLSL program
    const program = gl.createProgram()
    if (!program) throw new Error("failed to create program")
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position")

    // look up uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "iResolution")
    const mouseLocation = gl.getUniformLocation(program, "iMouse")
    const timeLocation = gl.getUniformLocation(program, "iTime")

    // Create a buffer to put three 2d clip space points in
    const positionBuffer = gl.createBuffer()

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    // fill it with a 2 triangles that cover clipspace
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1,
        -1, // first triangle
        1,
        -1,
        -1,
        1,
        -1,
        1, // second triangle
        1,
        -1,
        1,
        1,
      ]),
      gl.STATIC_DRAW
    )

    let mouseX = 0
    let mouseY = 0

    canvasRef.current.addEventListener("pointermove", (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX = e.clientX - rect.left
      mouseY = rect.height - (e.clientY - rect.top) - 1 // bottom is 0 in WebGL
    })

    function render(time: number) {
      time *= 0.001 // convert to seconds

      if (!canvasRef.current) return
      resizeCanvasToDisplaySize(canvasRef.current)

      // Tell WebGL how to convert from clip space to pixels
      if (!gl) return
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.width)

      // Tell it to use our program (pair of shaders)
      gl.useProgram(program)

      // Turn on the attribute
      gl.enableVertexAttribArray(positionAttributeLocation)

      // Bind the position buffer.
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2, // 2 components per iteration
        gl.FLOAT, // the data is 32bit floats
        false, // don't normalize the data
        0, // 0 = move forward size * sizeof(type) each iteration to get the next position
        0 // start at the beginning of the buffer
      )

      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height)
      gl.uniform2f(mouseLocation, mouseX, mouseY)
      gl.uniform1f(timeLocation, time)

      gl.drawArrays(
        gl.TRIANGLES,
        0, // offset
        6 // num vertices to process
      )

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }, [])

  return <canvas ref={canvasRef} className="h-full aspect-square" />
}

export default Shadertoy
