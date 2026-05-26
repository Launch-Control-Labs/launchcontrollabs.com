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
