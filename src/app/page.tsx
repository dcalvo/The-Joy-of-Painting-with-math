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

/*
 * Hi! I'm a comment. Welcome to the Joy of Painting (with math)!
 * Here's a list of things you can do:
 * - click on purple numbers to bring up a slider or color picker
 * - click, drag, and resize the preview in the lower right
 * - click and scroll/arrow keys in the font size box to change the font size
 * - ctrl + / to comment or uncomment a line
 * - refresh to reset the editor
 * Try it out! Click and change some numbers! (1.5 on line 27 is a favorite)
 */
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    vec2 uv0 = uv;
    
    vec3 finalColor = vec3(0.0);
    
    for (float i = 0.0; i < 4.0; i++) {
      uv = fract(uv * 1.5) - 0.5;
      float d = length(uv) * exp(-length(uv0));
      vec3 col = palette(length(uv0) + iTime * 0.5 + i * 0.4);
      d = sin(d * 8.0 + iTime);
      d = abs(d);
      d = 0.08 / d;
      d = pow(d, 1.2);
      finalColor += col * d;
    }

    fragColor = vec4(finalColor, 1.0);
}
  `

  return <DemoPage title={"The Joy of Painting (with math)"} prevHref={"9-exponentially_powerful"} nextHref={"1-let_there_be_dark"} shaderSource={shaderSource} />
}

export default Page
