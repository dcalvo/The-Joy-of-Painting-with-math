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
    vec2 uv0 = uv; // save the original uv coordinates

    // repeat the pattern!
    // uv = fract(uv * 1.0);  // fract says "give me the decimal part of this number"
    // uv -= 0.5;
    // uv *= 2.0;

    float d = length(uv);

    vec3 col = palette(d + iTime);
    // col = palette(length(uv0) + iTime * 0.5);

    float scale = 10.0;
    float speed = 1.0;
    d = sin(d * scale + iTime * speed);
    d = abs(d);

    d = 0.16 / d;

    col *= d;

    fragColor = vec4(col, 1.0);
    // fragColor = vec4(uv, 0.0, 1.0);  // an alien sunset in the 4th dimension 🤯

}
`

  return <DemoPage title={"What the fract?"} prevHref={"6-color_palettes"} nextHref={"8-iteration_rules_the_nation"} shaderSource={shaderSource} />
}

export default Page
