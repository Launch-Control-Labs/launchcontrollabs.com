import * as THREE from 'three'

const W = 512
const H = 256

export function createDataVizTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  const texture = new THREE.CanvasTexture(canvas)
  
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.colorSpace = THREE.NoColorSpace
  texture.generateMipmaps = false

  // Animated data — fake telemetry values
  const channels = [
    { label: 'CPU', value: 0.72, color: '#34D399' },
    { label: 'MEM', value: 0.45, color: '#E5A832' },
    { label: 'NET', value: 0.88, color: '#60A5FA' },
    { label: 'GPU', value: 0.31, color: '#F87171' },
  ]
  
  let frame = 0
  let animId: number
  
  function draw() {
    frame++
    
    // Background — near-black with slight blue tint
    ctx.fillStyle = '#020810'
    ctx.fillRect(0, 0, W, H)
    
    // CRT scanlines — subtle horizontal lines
    for (let y = 0; y < H; y += 3) {
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, y, W, 1)
    }
    
    // Header
    ctx.fillStyle = '#E5A832'
    ctx.font = 'bold 10px "IBM Plex Mono", monospace'
    ctx.fillText('MISSION TELEMETRY', 12, 20)
    
    // Header underline
    ctx.fillStyle = 'rgba(229,168,50,0.3)'
    ctx.fillRect(12, 26, W - 24, 1)
    
    // Animated bars
    channels.forEach((ch, i) => {
      const y = 45 + i * 48
      const animated = ch.value + Math.sin(frame * 0.02 + i) * 0.08
      const clamped = Math.max(0, Math.min(1, animated))
      const barW = clamped * (W - 80)
      
      // Background track
      ctx.fillStyle = 'rgba(255,255,255,0.08)'
      ctx.fillRect(60, y, W - 80, 16)
      
      // Value bar with glow effect
      ctx.fillStyle = ch.color
      ctx.fillRect(60, y, barW, 16)
      
      // Subtle glow on bar
      ctx.fillStyle = ch.color.replace(')', ',0.3)').replace('rgb', 'rgba').replace('#', 'rgba(')
      ctx.fillRect(60, y, barW, 2)
      
      // Label
      ctx.fillStyle = '#8B9DB5'
      ctx.font = '9px "IBM Plex Mono", monospace'
      ctx.fillText(ch.label, 12, y + 12)
      
      // Percentage value
      ctx.fillStyle = ch.color
      ctx.font = 'bold 9px "IBM Plex Mono", monospace'
      ctx.fillText(`${Math.round(clamped * 100)}%`, W - 40, y + 12)
    })
    
    // Status indicators at bottom
    ctx.fillStyle = 'rgba(139,157,181,0.5)'
    ctx.font = '8px "IBM Plex Mono", monospace'
    
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const mins = String(now.getMinutes()).padStart(2, '0')
    const secs = String(now.getSeconds()).padStart(2, '0')
    ctx.fillText(`T+${String(Math.floor(frame/60)).padStart(4,'0')}s`, 12, H - 10)
    ctx.fillText(`${hours}:${mins}:${secs} UTC`, W - 80, H - 10)
    
    // Status dot — pulsing green
    const pulse = 0.5 + Math.sin(frame * 0.1) * 0.5
    ctx.fillStyle = `rgba(52,211,153,${0.6 + pulse * 0.4})`
    ctx.beginPath()
    ctx.arc(W - 95, H - 13, 3, 0, Math.PI * 2)
    ctx.fill()
    
    texture.needsUpdate = true
  }
  
  function animate() {
    draw()
    animId = requestAnimationFrame(animate)
  }
  animate()
  
  // Cleanup method
  const originalDispose = texture.dispose.bind(texture)
  texture.dispose = () => {
    cancelAnimationFrame(animId)
    originalDispose()
  }
  
  return texture
}
