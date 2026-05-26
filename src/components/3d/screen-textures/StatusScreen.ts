import * as THREE from 'three'

const W = 512
const H = 256

export function createStatusTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  const texture = new THREE.CanvasTexture(canvas)
  
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.colorSpace = THREE.NoColorSpace
  texture.generateMipmaps = false
  
  let frame = 0
  let animId: number
  
  // Mission elapsed time (simulated)
  const missionStart = Date.now()
  
  function draw() {
    frame++
    
    // Background
    ctx.fillStyle = '#020810'
    ctx.fillRect(0, 0, W, H)
    
    // CRT scanlines
    for (let y = 0; y < H; y += 3) {
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, y, W, 1)
    }
    
    // Header
    ctx.fillStyle = '#E5A832'
    ctx.font = 'bold 12px "IBM Plex Mono", monospace'
    ctx.fillText('MISSION STATUS', 12, 22)
    
    ctx.fillStyle = 'rgba(229,168,50,0.3)'
    ctx.fillRect(12, 28, W - 24, 1)
    
    // Mission timer — counting up
    const elapsed = Math.floor((Date.now() - missionStart) / 1000)
    const hours = Math.floor(elapsed / 3600)
    const mins = Math.floor((elapsed % 3600) / 60)
    const secs = elapsed % 60
    
    ctx.fillStyle = '#D4DCE8'
    ctx.font = 'bold 24px "IBM Plex Mono", monospace'
    ctx.fillText(`T+${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`, 12, 60)
    
    // Status indicators
    const statuses = [
      { label: 'TELEMETRY', status: 'ACTIVE', color: '#34D399' },
      { label: 'COMM LINK', status: 'NOMINAL', color: '#34D399' },
      { label: 'POWER', status: '98.2%', color: '#34D399' },
      { label: 'THERMAL', status: 'STABLE', color: '#34D399' },
      { label: 'PROPULSION', status: 'READY', color: '#E5A832' },
    ]
    
    statuses.forEach((item, i) => {
      const y = 85 + i * 32
      
      // Status dot — pulsing
      const pulse = 0.5 + Math.sin(frame * 0.08 + i * 0.5) * 0.5
      ctx.fillStyle = item.color
      ctx.globalAlpha = 0.6 + pulse * 0.4
      ctx.beginPath()
      ctx.arc(20, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
      
      // Glow around dot
      ctx.fillStyle = item.color.replace('#', 'rgba(').replace(/([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i, (_, r, g, b) => 
        `${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)},0.2)`)
      ctx.beginPath()
      ctx.arc(20, y, 8, 0, Math.PI * 2)
      ctx.fill()
      
      // Label
      ctx.fillStyle = '#8B9DB5'
      ctx.font = '9px "IBM Plex Mono", monospace'
      ctx.fillText(item.label, 35, y + 3)
      
      // Status value
      ctx.fillStyle = item.color
      ctx.font = 'bold 10px "IBM Plex Mono", monospace'
      ctx.textAlign = 'right'
      ctx.fillText(item.status, W - 12, y + 3)
      ctx.textAlign = 'left'
    })
    
    // Bottom section — system health
    ctx.fillStyle = 'rgba(229,168,50,0.2)'
    ctx.fillRect(12, H - 45, W - 24, 1)
    
    ctx.fillStyle = '#E5A832'
    ctx.font = '8px "IBM Plex Mono", monospace'
    ctx.fillText('SYSTEM HEALTH', 12, H - 30)
    
    // Health bar
    const healthWidth = W - 24
    ctx.fillStyle = 'rgba(255,255,255,0.1)'
    ctx.fillRect(12, H - 22, healthWidth, 8)
    
    const health = 0.97 + Math.sin(frame * 0.02) * 0.02
    ctx.fillStyle = '#34D399'
    ctx.fillRect(12, H - 22, healthWidth * health, 8)
    
    ctx.fillStyle = '#34D399'
    ctx.font = 'bold 8px "IBM Plex Mono", monospace'
    ctx.textAlign = 'right'
    ctx.fillText(`${Math.round(health * 100)}%`, W - 12, H - 15)
    ctx.textAlign = 'left'
    
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
