import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useState, useMemo } from "react";

// const fShader = `
//  uniform float time;
//  uniform float progress;
//  uniform sampler2D texture1;
//  uniform vec4 resolution;
//  varying vec2 vUv;
//  varying vec3 vPosition;
//  float PI=3.14;

// void main() {
//     gl_FragColor = vec4(vUv,0.0,1.);
// }
// `;
// const vShader = `
// uniform float time;
// varying vec2 vUv;
// varying vec3 vPosition;
// uniform vec2 pixels;
// float PI=3.14;

// void main(){
//   vUv=uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
// }
// `;
const vShader = `
varying vec2 vUv; 
varying vec3 vNormal;
varying vec3 vPosition;


void main() {
  vUv=uv;
vNormal=normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); 
}
`;
const fShader = `
uniform vec3 colorA; 
uniform vec3 colorB; 
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  gl_FragColor = vec4(vUv,0.0,1.);
  gl_FragColor = vec4(vNormal,1.);
}
`;

const material = new THREE.ShaderMaterial({
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
  // side: THREE.DoubleSide,
  vertexShader: vShader,
  fragmentShader: fShader,
  uniforms: {
    colorA: { type: "vec3", value: new THREE.Color(0xff0000) },
    colorB: { type: "vec3", value: new THREE.Color(0x0000ff) },
  },
  // uniforms: {
  //   time: { type: "f", value: 0 },
  //   sky: {
  //     type: "f",
  //     value: new THREE.TextureLoader().load("./env-scaled.png"),
  //   },
  //   uvRate1: {
  //     value: new THREE.Vector2(1, 2),
  //   },
  //   resolution: { type: "v4", value: new THREE.Vector4() },
  // },
});

export default function Experience() {
  const { scene } = useGLTF("./face.glb");
  useMemo(
    () =>
      scene.traverse((obj) => {
        obj.material = material;
      }),
    [scene]
  );
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Center>
        <primitive object={scene} scale={0.02} rotation-y={Math.PI * 0.5} />
      </Center>
    </>
  );
}
