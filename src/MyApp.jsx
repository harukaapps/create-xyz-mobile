"use client";
import React, { useRef, useState, useEffect } from "react";

function MainComponent() {
  const canvasRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2");
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    const touches = new Map();
    let touching = false;
    const vertexSource = `#version 300 es
      precision highp float;
      in vec2 position;
      void main(void) {
          gl_Position = vec4(position, 0., 1.);
      }`;

    const fragmentSource = `#version 300 es
      precision highp float;
      out vec4 fragColor;
      uniform vec2 resolution;
      uniform vec2 touch;
      uniform float time;
      uniform int pointerCount;

      #define mouse (touch.xy / resolution.xy)
      #define T time
      #define S smoothstep
      #define MAX_SPHERES 12.0

      float rnd(float a) {
        return fract(sin(a*76.5453123)*45617.234);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float n = i.x + i.y * 57.;
        return mix(
          mix(rnd(n), rnd(n + 1.), f.x),
          mix(rnd(n + 57.), rnd(n + 58.), f.x),
          f.y
        );
      }

      mat3 rotX(float a) {
        float s = sin(a), c = cos(a);
        return mat3(vec3(1,0,0), vec3(0,c,-s), vec3(0,s,c));
      }

      mat3 rotY(float a) {
        float s = sin(a), c = cos(a);
        return mat3(vec3(c,0,s), vec3(0,1,0), vec3(-s,0,c));
      }

      float sphere(vec3 p, float r) {
        return length(p) - r;
      }

      float box(vec3 p, vec3 s, float r) {
        p = abs(p)-s;
        return length(max(p, .0))+min(.0, max(max(p.x, p.y), p.z))-r;
      }

      vec3 spherePos(float id) {
        float angle = (id / MAX_SPHERES) * 6.28 + T * (0.2 + id * 0.1);
        float radius = 2.0 + sin(id * 1.23 + T) * 0.5;
        float height = sin(T * 0.5 + id * 2.0) * 1.0;
        return vec3(cos(angle) * radius, height, sin(angle) * radius);
      }

      float smin(float a, float b, float k) {
        float h = clamp(.5+.5*(b-a)/k, .0, 1.);
        return mix(b,a,h)-k*h*(1.-h);
      }

      float map(vec3 p) {
        float d = box(p, vec3(1), .05) * S(.0, 1.,clamp(noise((p.xz+p.yy)*6.),.4,.6));
        
        for(float i = 0.0; i < MAX_SPHERES; i++) {
          vec3 sp = spherePos(i);
          float size = 0.3 + 0.2 * sin(i + T);
          d = smin(d, sphere(p - sp, size), 0.5);
        }
        
        return d;
      }

      vec3 norm(vec3 p) {
        vec2 e = vec2(1e-2, 0);
        float d = map(p);
        vec3 n = d - vec3(
          map(p - e.xyy),
          map(p - e.yxy),
          map(p - e.yyx)
        );
        return normalize(n);
      }

      vec3 dir(vec2 uv, vec3 ro, vec3 t, float z) {
        vec3 up = vec3(0,1,0),
        f = normalize(t-ro),
        r = normalize(cross(up,f)),
        u = cross(f,r),
        c = f*z,
        i = c+uv.x*r+uv.y*u;
        return normalize(i);
      }

      vec3 rainbow(float angle) {
        return vec3(0.5 + 0.5 * cos(angle + vec3(0, 2, 4))) * 0.8 + 0.2;
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy-.5*resolution.xy)/min(resolution.x,resolution.y);
        vec3 col = vec3(0);
        vec3 ro = vec3(0,0,-8);
        
        if(pointerCount > 0) {
          ro *= rotX(mouse.y * 3.14 + 1.);
          ro *= rotY(mouse.x * 6.28);
        } else {
          ro *= rotY(T * 0.2);
        }

        vec3 rd = dir(uv,ro,vec3(0),1.);
        vec3 p = ro;
        float t = 0.0;

        for(int i = 0; i < 50; i++) {
          p = ro + rd * t;
          float d = map(p);
          
          if(d < 0.001) {
            vec3 n = norm(p);
            vec3 l1 = normalize(vec3(1,2,3));
            vec3 l2 = normalize(vec3(-2,1,-1));
            vec3 l3 = normalize(vec3(0,-1,2));
            
            float diff1 = max(dot(n,l1), 0.0);
            float diff2 = max(dot(n,l2), 0.0);
            float diff3 = max(dot(n,l3), 0.0);
            
            float spec1 = pow(max(dot(reflect(-l1,n),-rd), 0.0), 32.0);
            float spec2 = pow(max(dot(reflect(-l2,n),-rd), 0.0), 32.0);
            float spec3 = pow(max(dot(reflect(-l3,n),-rd), 0.0), 32.0);
            
            float fres = pow(1.-max(.0,dot(-rd,n)),3.);
            
            vec3 baseColor = rainbow(dot(n, l1) * 6.28);
            col = baseColor * ((diff1 + diff2 + diff3) * 0.8 + 0.2) + (spec1 + spec2 + spec3) * 0.5;
            col += .125*fres*baseColor;

            break;
          }
          
          t += d;
          if(t > 20.0) break;
        }

        col = mix(col, vec3(0.1,0.1,0.1), 1.0 - exp(-0.01 * t * t));
        fragColor = vec4(col, 1);
      }`;

    let program,
      buffer,
      timeLocation,
      touchLocation,
      resolutionLocation,
      pointerCountLocation;
    const compile = (shader, source) => {
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
      }
    };

    const setup = () => {
      const vs = gl.createShader(gl.VERTEX_SHADER);
      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      program = gl.createProgram();

      compile(vs, vertexSource);
      compile(fs, fragmentSource);

      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      const vertices = [
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      ];
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vertices),
        gl.STATIC_DRAW
      );

      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      timeLocation = gl.getUniformLocation(program, "time");
      touchLocation = gl.getUniformLocation(program, "touch");
      pointerCountLocation = gl.getUniformLocation(program, "pointerCount");
      resolutionLocation = gl.getUniformLocation(program, "resolution");
    };

    const getTouches = () => {
      if (!touches.size) return [0, 0];
      for (let [_, t] of touches) {
        return [dpr * t.clientX, dpr * (window.innerHeight - t.clientY)];
      }
    };
    const draw = (now) => {
      gl.clearColor(0.2, 0.2, 0.2, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.uniform1f(timeLocation, now * 0.001);
      gl.uniform2f(touchLocation, ...getTouches());
      gl.uniform1i(pointerCountLocation, touches.size);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, window.innerWidth * dpr, window.innerHeight * dpr);
    };
    const loop = (now) => {
      draw(now);
      requestAnimationFrame(loop);
    };

    setup();
    resize();
    loop(0);

    window.addEventListener("resize", resize);

    canvas.addEventListener("pointerdown", (e) => {
      touching = true;
      touches.set(e.pointerId, e);
    });

    canvas.addEventListener("pointermove", (e) => {
      if (!touching) return;
      touches.set(e.pointerId, e);
    });

    canvas.addEventListener("pointerup", () => {
      touching = false;
      touches.clear();
    });

    canvas.addEventListener("pointerout", () => {
      touching = false;
      touches.clear();
    });

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", () => {});
      canvas.removeEventListener("pointermove", () => {});
      canvas.removeEventListener("pointerup", () => {});
      canvas.removeEventListener("pointerout", () => {});
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="w-full h-screen bg-black">
        <div className="w-full h-full flex items-center justify-center text-white">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 text-white font-roboto text-xl">
        にじいろシャボン
      </div>
    </div>
  );
}

export default MainComponent;