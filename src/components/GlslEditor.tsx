import { useEffect } from "react"

const sourceHeader = `    
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

// u_time u_mouse u_resolution
// shader only animates if there's more than one occurence of u_time, same for u_mouse and u_resolution
`

const sourceFooter = `    
void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`

const monkeyPatchSetMouse = `
function setMouse(mouse) {
  // set the mouse uniform
  let rect = this.canvas.getBoundingClientRect();
  if (mouse &&
      mouse.x && mouse.x >= rect.left && mouse.x <= rect.right &&
      mouse.y && mouse.y >= rect.top && mouse.y <= rect.bottom) {

      let mouse_x = (mouse.x - rect.left ) * this.realToCSSPixels;
      let mouse_y = (this.canvas.height - (mouse.y - rect.top) * this.realToCSSPixels);

      this.uniform('2f', 'vec2', 'u_mouse', mouse_x, mouse_y);
      this.uniform('2f', 'vec2', 'iMouse', mouse_x, mouse_y);
  }
}
`

const monkeyPatchRender = `
function render() {
  const isCanvasVisible = (canvas) => {
    let bound = canvas.getBoundingClientRect();
    return	((bound.top + bound.height) > 0) &&
        (bound.top < (window.innerHeight || document.documentElement.clientHeight));
  }

  this.visible = isCanvasVisible(this.canvas);
  if ( this.forceRender || this.change ||
      (this.animated && this.visible && ! this.paused) ) {

      // Update Uniforms when are need
      let date = new Date();
      let now = performance.now();
      this.timeDelta =  (now - this.timePrev) / 1000.0;
      this.timePrev = now;
      if (this.nDelta > 1) {
          // set the delta time uniform
          this.uniform('1f', 'float', 'u_delta', this.timeDelta);
      }

      if (this.nTime > 1 ) {
          // set the elapsed time uniform
          this.uniform('1f', 'float', 'u_time', (now - this.timeLoad) / 1000.0);
          this.uniform('1f', 'float', 'iTime', (now - this.timeLoad) / 1000.0);
      }

      if (this.nDate) {
          // Set date uniform: year/month/day/time_in_sec
          this.uniform('4f', 'float', 'u_date', date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds() + date.getMilliseconds() * 0.001 );
      }

      // set the resolution uniform
      this.uniform('2f', 'vec2', 'u_resolution', this.canvas.width, this.canvas.height);
      this.uniform('2f', 'vec2', 'iResolution', this.canvas.width, this.canvas.height);

      for (let key in this.buffers) {
          const buffer = this.buffers[key];
          this.uniform('1i', 'sampler2D', buffer.name, buffer.bundle.input.index);
      }

      this.texureIndex = this.BUFFER_COUNT;
      for (let tex in this.textures) {
          this.uniformTexture(tex);
          this.texureIndex++;
      }

      this.renderPrograms();

      // Trigger event
      this.trigger('render', {});
      this.change = false;
      this.forceRender = false;
  }
}
`

type GlslEditorProps = {
  defaultSource: string
  fontSize?: number
}

function GlslEditor({ defaultSource, fontSize = 14 }: GlslEditorProps) {
  // Instantiate glslEditor
  useEffect(() => {
    const script = document.createElement("script")

    const canvasSize = 500

    script.textContent = `
      var glslEditor = new GlslEditor('#glsl_editor', {
        canvas_size: ${canvasSize},
        canvas_draggable: true,
        canvas_resizable: true,
        theme: 'monokai',
        autofocus: false,
        indentUnit: 2,
        frag_header: \`${sourceHeader}\`,
        frag_footer: \`${sourceFooter}\`,
        frag: \`${defaultSource}\`,
      });

      ${monkeyPatchRender}
      glslEditor.shader.canvas.render = render;
      ${monkeyPatchSetMouse}
      glslEditor.shader.canvas.setMouse = setMouse;

      glslEditor.setContent(\`${defaultSource.trim()}\`);
    `
    script.async = true

    document.body.appendChild(script)

    // move container to the bottom right
    const canvasContainer = document.querySelector<HTMLDivElement>("#glsl_editor .ge_canvas_container")
    if (canvasContainer) {
      canvasContainer.style.height = `${canvasSize}px`
      canvasContainer.style.width = `${canvasSize}px`
      canvasContainer.style.top = `calc(96% - ${canvasSize}px)`
      canvasContainer.style.left = `calc(98% - ${canvasSize}px)`
    }

    return () => {
      document.body.removeChild(script)
      const editor = document.querySelector<HTMLDivElement>("#glsl_editor")
      if (editor) {
        for (const child of Array.from(editor.children)) editor.removeChild(child)
      }
    }
  }, [])

  return <div id="glsl_editor" style={{ fontSize: `${fontSize}px` }} />
}

export default GlslEditor
