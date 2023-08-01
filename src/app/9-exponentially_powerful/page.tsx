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
    vec2 uv0 = uv;

    float zoom = 1.5;
    
    vec3 finalColor = vec3(0.0);
    
    const float iterations = 4.0;
    
    for (float i = 0.0; i < iterations; i++) {
      uv = (fract(uv * zoom) - 0.5) * 2.0;
      // uv *= 0.5; // undo the * 2.0 because it looks better ¯\\\\_(ツ)_/¯
      
      float d = length(uv);
      // add a non-linear scaling factor
      // d *= exp(-length(uv0));  // if you're curious, try graphing x * exp(-x) or visit https://www.desmos.com/calculator/1qjzqjzq8o

      float colorOffset = length(uv0) + iTime * 0.5;
      // colorOffset += i * 0.4;  // shift the color each iteration
      vec3 col = palette(colorOffset);

      float scale = 5.0;
      // scale = 8.0; // it looks better!
      float speed = 1.0;
      d = sin(d * scale + iTime * speed);
      d = abs(d);

      d = 0.16 / d;
      // d /= 2.0;  // halve color contribution from each iteration

      // increase the contrast
      // d = pow(d, 1.2);

      finalColor += col * d;
    }

    fragColor = vec4(finalColor, 1.0);

}
`

  return <DemoPage title={"Exponentially Powerful"} prevHref={"8-iteration_rules_the_nation"} nextHref={"/"} shaderSource={shaderSource} />
}

export default Page
