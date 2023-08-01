import DemoPage from "@components/DemoPage"

function Page() {
  const shaderSource = `
// https://iquilezles.org/articles/palettes/
vec3 palette( float t ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);
    return a + b*cos( 6.28318*(c*t+d) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    float d = length(uv);

    // pick a color
    vec3 col = vec3(0.33, 0.66, 1.0);
    // col = palette(d);
    // col = palette(d + iTime);

    // make and move some circles
    float scale = 10.0;
    float speed = 1.0;
    d = sin(d * scale + iTime * speed);
    d = abs(d);

    // invert the color
    d = 0.16 / d;

    col *= d;

    fragColor = vec4(col, 1.0);

}
`

  return <DemoPage title={"A Palatable Palette"} prevHref={"5-time_in_sin_city"} nextHref={"7-what_the_fract"} shaderSource={shaderSource} />
}

export default Page
