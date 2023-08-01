import DemoPage from "@components/DemoPage"

function Page() {
  const shaderSource = `
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    float d = length(uv);

    // how much to scale the sin wave
    float scale = 10.0;

    // how fast to move the sin wave
    float speed = 0.0;

    // make the sin wave move!
    d = sin(d * scale + iTime * speed);
    d = abs(d);

    // we have to scale the smoothstep range to match the range of our sin wave
    d = smoothstep(0.0, 0.1 * scale, d);
    // d = 0.16 / d;

    fragColor = vec4(d, d, d, 1.0);

}
`

  return <DemoPage title={"Time in Sin City"} prevHref={"4-signed_distance_function"} nextHref={"6-color_palettes"} shaderSource={shaderSource} />
}

export default Page
