import DemoPage from "@components/DemoPage"

function Page() {
  const shaderSource = `
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // Normalized pixel coordinates (from 0 to 1) according to the resolution
    vec2 uv = fragCoord / iResolution.xy;

    // left to right, black to red
    fragColor = vec4(uv.x, 0.0, 0.0, 1.0);

    // bottom to top, black to green
    // fragColor = vec4(0.0, uv.y, 0.0, 1.0);

    // both directions, an alien sunset!
    // fragColor = vec4(uv, 0.0, 1.0);

}
`

  return <DemoPage title={"UV Coordinates"} prevHref={"1-let_there_be_dark"} nextHref={"3-center_of_the_world"} shaderSource={shaderSource} />
}

export default Page
