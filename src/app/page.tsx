import DemoPage from "@/components/DemoPage"

function Page() {
  const shaderSource = `
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      fragColor = vec4(fract((fragCoord.xy - iMouse) / iResolution), fract(iTime), 1);
    }
  `

  return <DemoPage title={"Test Shader"} prevHref={null} nextHref={"1_"} shaderSource={shaderSource} />
}

export default Page
