import DemoPage from "@components/DemoPage"

function Page() {
  const shaderSource = `
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    // simplified version of the uv transforms from the previous example
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    float d = length(uv);

    // increase the radius of our circle
    // d -= 0.5;

    // set distance to be positive if it's inside the circle
    // d = abs(d);

    fragColor = vec4(d, d, d, 1.0);

}
`

  return <DemoPage title={"Signed, Distance Function"} prevHref={"3-center_of_the_world"} nextHref={"5-time_in_sin_city"} shaderSource={shaderSource}>
    <h2 className="text-center text-2xl font-bold text-white">
      {"Signed, "}
      <span className="italic">{"Distance Function"}</span>
    </h2>
  </DemoPage>
}

export default Page
