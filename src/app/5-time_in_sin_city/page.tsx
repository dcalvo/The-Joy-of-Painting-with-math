import DemoPage from "@components/DemoPage"

function Page() {
  const shaderSource = `
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    float d = length(uv);

    // how much to scale the sin wave's frequency
    float scale = 10.0;

    // how fast to move the sin wave
    float speed = 0.0;

    // make some waves!
    // d = sin(d * scale + iTime * speed);  // iTime is basically a stopwatch
    // d = abs(d);

    // invert the color for a *neon aesthetic*
    // d = 0.16 / d;

    // side note: why 0.16? why not 1.0? try both, then graph them on Desmos and look at the difference between [0, 1]

    fragColor = vec4(d, d, d, 1.0);

}
`

  return <DemoPage title={"Time in Sin City"} prevHref={"4-signed_distance_function"} nextHref={"6-color_palettes"} shaderSource={shaderSource} />
}

export default Page
