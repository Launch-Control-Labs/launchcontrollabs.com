import * as THREE from 'three'

const vertexShader = /* glsl */ `
varying vec2 vUv;
varying vec2 vUv2;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vUv2 = uv2;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`

const fragmentShader = /* glsl */ `
uniform sampler2D map;
uniform sampler2D lightMap;
uniform float lightMapIntensity;
uniform vec3 baseColor;
uniform vec3 emissiveColor;
uniform float emissiveIntensity;
uniform float opacity;
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;

varying vec2 vUv;
varying vec2 vUv2;
varying vec3 vWorldPosition;

void main() {
  vec4 texColor = texture2D(map, vUv);
  vec3 diffuse = texColor.rgb * baseColor;

  vec3 lighting = vec3(1.0);
  if (lightMapIntensity > 0.0) {
    vec4 lightSample = texture2D(lightMap, vUv2);
    lighting = lightSample.rgb * lightMapIntensity;
  }

  vec3 color = diffuse * lighting;

  color += emissiveColor * emissiveIntensity;

  float fogFactor = smoothstep(fogNear, fogFar, length(vWorldPosition));
  color = mix(color, fogColor, fogFactor * 0.4);

  color = color * (2.51 * color + 0.03) / (color * (2.43 * color + 0.59) + 0.14);

  gl_FragColor = vec4(color, opacity * texColor.a);
}
`

export interface ControlRoomShaderOptions {
  isScreen?: boolean
  isLight?: boolean
  isAmbient?: boolean
}

export function createControlRoomShader(
  baseMaterial: THREE.MeshStandardMaterial,
  lightmap: THREE.Texture | null,
  options: ControlRoomShaderOptions = {}
): THREE.ShaderMaterial {
  const { isScreen = false, isLight = false } = options

  let emissiveColor = new THREE.Color(0, 0, 0)
  let emissiveIntensity = 0

  if (isScreen) {
    emissiveColor = new THREE.Color('#1a5c3a')
    emissiveIntensity = 3.0
  } else if (isLight) {
    emissiveColor = new THREE.Color('#FF4D00')
    emissiveIntensity = 6.0
  }

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      map: { value: baseMaterial.map || new THREE.Texture() },
      lightMap: { value: lightmap },
      lightMapIntensity: { value: lightmap ? 1.0 : 0.0 },
      baseColor: { value: baseMaterial.color || new THREE.Color(1, 1, 1) },
      emissiveColor: { value: emissiveColor },
      emissiveIntensity: { value: emissiveIntensity },
      opacity: { value: baseMaterial.opacity ?? 1.0 },
      fogColor: { value: new THREE.Color(0.02, 0.03, 0.05) },
      fogNear: { value: 5.0 },
      fogFar: { value: 20.0 },
    },
    transparent: baseMaterial.transparent || false,
    side: baseMaterial.side ?? THREE.FrontSide,
    depthWrite: true,
  })
}

export const SCREEN_MATERIALS = new Set(['screen', 'screens', 'wall_screen'])
export const LIGHT_MATERIALS = new Set(['lights', 'projector1'])
