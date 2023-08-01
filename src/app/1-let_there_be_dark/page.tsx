import DemoPage from "@components/DemoPage"

function Page() {
  const shaderSource = `
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

   // Red, Green, Blue, Alpha (RGBA)
   fragColor = vec4(0.0, 0.0, 0.0, 1.0);

   // 0.0 is no color, 1.0 is full color
   // fragColor = vec4(1.0, 1.0, 1.0, 1.0);

}
`

  return <DemoPage title={"Let there be... dark?"} prevHref={"/"} nextHref={"2-uv_coordinates"} shaderSource={shaderSource} />
}

export default Page
