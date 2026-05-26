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
uniform float fogDensity;
uniform float fogDepth;

varying vec2 vUv;
varying vec2 vUv2;
varying vec3 vWorldPosition;

void main() {
  // Base color from texture
  vec4 texColor = texture2D(map, vUv);
  vec3 color = baseColor * texColor.rgb;

  // Baked lighting from lightmap (this is THE lighting — no runtime lights)
  vec3 irradiance = color;
  if (lightMapIntensity > 0.0) {
    vec3 lightMapSample = texture2D(lightMap, vUv2).rgb;
    irradiance *= lightMapSample * lightMapIntensity;
  }

  // Emissive (screens, lights — additive glow)
  irradiance += emissiveColor * emissiveIntensity;

  // Exponential squared fog (basement.studio formula — view-depth based)
  float fogDepthValue = min(-length(vWorldPosition) + fogDepth, 0.0);
  float fogFactor = 1.0 - exp(-(fogDensity * fogDensity) * (fogDepthValue * fogDepthValue));
  fogFactor = clamp(fogFactor, 0.0, 1.0);
  if (fogFactor > 0.0) {
    irradiance = irradiance * (1.0 - fogFactor) + fogColor * fogFactor;
  }

  // NO tone mapping here — that goes in postprocessing only (basement approach)
  gl_FragColor = vec4(irradiance, opacity * texColor.a);
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
    emissiveColor = new THREE.Color('#E5A832')
    emissiveIntensity = 2.0
  } else if (isLight) {
    emissiveColor = new THREE.Color('#FF4D00')
    emissiveIntensity = 4.0
  }

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      map: { value: baseMaterial.map || new THREE.Texture() },
      lightMap: { value: lightmap },
      lightMapIntensity: { value: lightmap ? 1.8 : 0.0 },
      baseColor: { value: baseMaterial.color || new THREE.Color(1, 1, 1) },
      emissiveColor: { value: emissiveColor },
      emissiveIntensity: { value: emissiveIntensity },
      opacity: { value: baseMaterial.opacity ?? 1.0 },
      fogColor: { value: new THREE.Color(0.2, 0.2, 0.2) },
      fogDensity: { value: 0.05 },
      fogDepth: { value: 9.0 },
    },
    transparent: baseMaterial.transparent || false,
    side: baseMaterial.side ?? THREE.FrontSide,
    depthWrite: true,
  })
}

export const SCREEN_MATERIALS = new Set(['screen', 'screens', 'wall_screen'])
export const LIGHT_MATERIALS = new Set(['lights', 'projector1'])
