import DemoPage from "@components/DemoPage"

function Page() {
  const shaderSource = `
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord / iResolution.xy;

    // move the center of the world to the center of the screen
    // uv = uv - 0.5;
    // stretch our coordinates back out from 0 to 1
    // uv = uv * 2.0;

    fragColor = vec4(uv, 0.0, 1.0);

    // let's make a circle using length()
    // // uv.x *= iResolution.x / iResolution.y;  // ...and correct for the aspect ratio
    // float d = length(uv);
    // fragColor = vec4(d, d, d, 1.0);

}
`

  return <DemoPage title={"In fact, I am the center of the world"} prevHref={"2-uv_coordinates"} nextHref={"4-signed_distance_function"} shaderSource={shaderSource} />
}

export default Page
