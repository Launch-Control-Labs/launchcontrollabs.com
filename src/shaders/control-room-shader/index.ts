import * as THREE from 'three'

const vertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`

const fragmentShader = /* glsl */ `
uniform sampler2D map;
uniform sampler2D emissiveMap;
uniform float hasEmissiveMap;
uniform vec3 emissiveColor;
uniform float emissiveIntensity;
uniform float opacity;
uniform vec3 fogColor;
uniform float fogDensity;
uniform float fogDepth;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  // Base color directly from PBR texture — model materials are white so texture IS the color
  vec4 texColor = texture2D(map, vUv);
  vec3 color = texColor.rgb;

  // Ambient floor — surfaces must never be pure black
  color = max(color, vec3(0.06));

  // Emissive (screens, lamps — additive glow on top of base)
  if (hasEmissiveMap > 0.5) {
    vec3 emTex = texture2D(emissiveMap, vUv).rgb;
    color += emTex * emissiveColor * emissiveIntensity;
  } else if (emissiveIntensity > 0.0) {
    color += emissiveColor * emissiveIntensity;
  }

  // Exponential squared fog (basement.studio formula — view-depth based)
  float fogDepthValue = min(-length(vWorldPosition) + fogDepth, 0.0);
  float fogFactor = 1.0 - exp(-(fogDensity * fogDensity) * (fogDepthValue * fogDepthValue));
  fogFactor = clamp(fogFactor, 0.0, 1.0);
  if (fogFactor > 0.0) {
    color = color * (1.0 - fogFactor) + fogColor * fogFactor;
  }

  // NO tone mapping here — handled by postprocessing ToneMapping(mode=7)
  gl_FragColor = vec4(color, opacity * texColor.a);
}
`

export interface ControlRoomShaderOptions {
  isScreen?: boolean
}

export function createControlRoomShader(
  baseMaterial: THREE.MeshStandardMaterial,
  options: ControlRoomShaderOptions = {}
): THREE.ShaderMaterial {
  const { isScreen = false } = options

  // Extract emissive map from the loaded GLTF material
  const emissiveMap = baseMaterial.emissiveMap || null
  const hasEmissiveMap = emissiveMap !== null ? 1.0 : 0.0

  // Emissive color + intensity — only screens/lamps glow
  let emissiveColor = new THREE.Color(1, 1, 1)
  let emissiveIntensity = 0.0

  if (isScreen) {
    // White multiplier — emissive texture provides the actual color
    // Intensity 3.0 ensures bloom threshold (0.85) is exceeded for glow
    emissiveColor = new THREE.Color(1, 1, 1)
    emissiveIntensity = 3.0
  }

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      map: { value: baseMaterial.map || new THREE.Texture() },
      emissiveMap: { value: emissiveMap || new THREE.Texture() },
      hasEmissiveMap: { value: hasEmissiveMap },
      emissiveColor: { value: emissiveColor },
      emissiveIntensity: { value: emissiveIntensity },
      opacity: { value: baseMaterial.opacity ?? 1.0 },
      // Fog: dark, starts beyond 400 units from origin (inside the ship)
      // Tuned for soma04 bounding box: 622×622×1097 units
      fogColor: { value: new THREE.Color(0.02, 0.02, 0.04) },
      fogDensity: { value: 0.003 },
      fogDepth: { value: 400.0 },
    },
    transparent: baseMaterial.transparent || false,
    side: baseMaterial.side ?? THREE.FrontSide,
    depthWrite: true,
  })
}

// Soma04 material names (lowercased — matched against child.material.name.toLowerCase())
// Object_3 node → Space_ship_chair_screens_lamps material → has emissive texture
export const SCREEN_MATERIALS = new Set(['space_ship_chair_screens_lamps'])
export const LIGHT_MATERIALS = new Set<string>()
