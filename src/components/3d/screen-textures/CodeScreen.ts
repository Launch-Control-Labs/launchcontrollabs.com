import * as THREE from 'three'

const W = 512
const H = 256

const CODE_LINES = [
  '> INIT mission_control v2.4.1',
  '> LOAD payload_manifest.json',
  '> CHECK system_integrity... OK',
  '> CONNECT telemetry_feed... OK',
  '> MONITOR orbit_params',
  '  altitude: 408.3 km',
  '  velocity: 7.66 km/s',
  '  inclination: 51.6°',
  '> DEPLOY agent_swarm[12]',
  '  agent_01: ACTIVE',
  '  agent_02: ACTIVE',
  '  agent_03: STANDBY',
  '> ANALYZE data_stream...',
  '  anomaly_detected: false',
  '  confidence: 99.7%',
  '> REPORT status: NOMINAL',
  '> SYNC ground_station... OK',
  '> VALIDATE trajectory',
  '  perigee: 401.2 km',
  '  apogee: 415.4 km',
  '> AWAIT next_window',
  '  eta: 00:42:17',
]

export function createCodeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  const texture = new THREE.CanvasTexture(canvas)
  
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.colorSpace = THREE.NoColorSpace
  texture.generateMipmaps = false
  
  let scrollOffset = 0
  let frame = 0
  let animId: number
  
  function draw() {
    frame++
    
    // Background — deep terminal black
    ctx.fillStyle = '#010509'
    ctx.fillRect(0, 0, W, H)
    
    // CRT scanlines
    for (let y = 0; y < H; y += 3) {
      ctx.fillStyle = 'rgba(0,0,0,0.12)'
      ctx.fillRect(0, y, W, 1)
    }
    
    // Subtle screen glow at edges
    const gradient = ctx.createLinearGradient(0, 0, 0, H)
    gradient.addColorStop(0, 'rgba(26,92,58,0.05)')
    gradient.addColorStop(0.5, 'rgba(26,92,58,0)')
    gradient.addColorStop(1, 'rgba(26,92,58,0.05)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, W, H)
    
    // Scroll offset — slow continuous scroll
    if (frame % 3 === 0) {
      scrollOffset += 0.5
      if (scrollOffset > CODE_LINES.length * 12) {
        scrollOffset = 0
      }
    }
    
    // Draw terminal lines
    ctx.font = '10px "IBM Plex Mono", monospace'
    
    const lineHeight = 12
    const startY = 20 - (scrollOffset % lineHeight)
    
    CODE_LINES.forEach((line, i) => {
      const y = startY + i * lineHeight
      if (y < -lineHeight || y > H) return
      
      // Determine line color based on content
      let color = '#1a5c3a' // Default terminal green
      
      if (line.startsWith('>')) {
        color = '#34D399' // Bright green for commands
      } else if (line.includes('OK')) {
        color = '#34D399' // Green for success
      } else if (line.includes('ACTIVE')) {
        color = '#34D399'
      } else if (line.includes('STANDBY')) {
        color = '#E5A832' // Amber for standby
      } else if (line.includes('false')) {
        color = '#34D399'
      } else if (line.includes('NOMINAL')) {
        color = '#34D399'
      }
      
      ctx.fillStyle = color
      ctx.fillText(line, 12, y)
    })
    
    // Blinking cursor at bottom
    if (Math.floor(frame / 30) % 2 === 0) {
      ctx.fillStyle = '#34D399'
      ctx.fillRect(12, H - 20, 8, 2)
    }
    
    // Terminal prompt
    ctx.fillStyle = 'rgba(52,211,153,0.7)'
    ctx.font = '9px "IBM Plex Mono", monospace'
    ctx.fillText('mission@control:~$', 12, H - 30)
    
    texture.needsUpdate = true
  }
  
  function animate() {
    draw()
    animId = requestAnimationFrame(animate)
  }
  animate()
  
  const originalDispose = texture.dispose.bind(texture)
  texture.dispose = () => {
    cancelAnimationFrame(animId)
    originalDispose()
  }
  
  return texture
}
