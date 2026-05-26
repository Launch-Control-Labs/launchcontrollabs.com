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
  // Sample base texture
  vec4 texColor = texture2D(map, vUv);
  vec3 diffuse = texColor.rgb * baseColor;

  // Apply baked lightmap (this IS the lighting — no runtime lights)
  vec3 lighting = vec3(1.0);
  if (lightMapIntensity > 0.0) {
    vec4 lightSample = texture2D(lightMap, vUv2);
    lighting = lightSample.rgb * lightMapIntensity;
  }

  vec3 color = diffuse * lighting;

  // Add emissive (screens, lights)
  color += emissiveColor * emissiveIntensity;

  // Depth fog (dark atmospheric fog)
  float fogFactor = smoothstep(fogNear, fogFar, length(vWorldPosition));
  color = mix(color, fogColor, fogFactor * 0.4);

  // ACES-inspired tone curve (simple version)
  color = color * (2.51 * color + 0.03) / (color * (2.43 * color + 0.59) + 0.14);

  gl_FragColor = vec4(color, opacity * texColor.a);
}
