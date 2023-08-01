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
    
    vec3 finalColor = vec3(0.0);  // start with black
    
    // how many times we should overlap the pattern
    const float iterations = 1.0;
    
    for (float i = 0.0; i < iterations; i++) {
      // repeat the pattern
      uv = (fract(uv * zoom) - 0.5) * 2.0;  // simplified from the previous example
      
      float d = length(uv);

      // pick a color
      vec3 col = palette(length(uv0) + iTime * 0.5);

      // make and move some circles
      float scale = 5.0;  // halved from the previous example
      float speed = 1.0;
      d = sin(d * scale + iTime * speed);
      d = abs(d);

      // invert the color
      d = 0.16 / d;

      finalColor += col * d;
    }

    fragColor = vec4(finalColor, 1.0);

}
`

  return <DemoPage title={"Iteration rules the nation"} prevHref={"7-what_the_fract"} nextHref={"9-exponentially_powerful"} shaderSource={shaderSource} />
}

export default Page
