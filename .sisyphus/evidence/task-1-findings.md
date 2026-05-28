# Task 1: GSAP + R3F Camera Spike — Findings

## Summary

**GSAP ScrollTrigger CAN drive React Three Fiber camera position smoothly.** Architecture is validated. Proceed with full implementation.

## Winner: Approach A (Ref-Based)

### The Two Approaches Tested

| | Approach A (Ref-Based) | Approach B (Direct GSAP Mutation) |
|---|---|---|
| **Mechanism** | ScrollTrigger writes progress (0–1) to a `useRef`. `useFrame` reads the ref each frame and sets `camera.position.z` | ScrollTrigger uses `gsap.to(proxy, {...})` with `onUpdate` to directly set `camera.position.z` |
| **Who writes to camera?** | Only R3F's useFrame loop | GSAP's animation loop (via onUpdate) |
| **Avg FPS** | 120 | 120 |
| **Min FPS** | 110 | 119 |
| **Max FPS** | 120 | 120 |
| **Jitter observed** | None | None |

### Why Approach A Wins (Despite Equal FPS)

1. **Single-writer principle**: Only R3F's `useFrame` touches the camera. No risk of two animation loops fighting over the same object.
2. **Architectural safety**: If we later add camera lerping, damping, or multi-axis movement, having one canonical place that writes to camera (useFrame) prevents coordination bugs.
3. **Testability**: The `progressRef` can be set programmatically for testing without needing scroll simulation.
4. **Composability**: Multiple ScrollTriggers can write to different refs, and `useFrame` composes them into a final camera state (e.g., progress + shake + zoom).
5. **Matches existing pattern**: The codebase already uses `useFrame` for per-frame updates (see `SceneRenderer.tsx`). Approach A extends this pattern naturally.

### Why Approach B is Viable But Riskier

- Works perfectly in this simple case (single axis, no lerp)
- Risk: if `useFrame` also needs to touch camera (for shake, damping, etc.), two writers will fight
- Risk: GSAP's `scrub` timing may not align perfectly with R3F's frame timing under heavy load
- Benefit: slightly simpler code (no intermediate ref)

## Performance Data

- **Test environment**: M-series Mac, ProMotion 120Hz display, headless Chromium (Playwright)
- **Continuous scroll test**: 21 FPS samples taken at 5% scroll increments (0%–100%)
- **Both approaches**: Solid 120 FPS throughout continuous scroll, no drops below 110
- **Exceeds requirement**: ≥45 FPS threshold met with 2.5x headroom

## Observations

1. **No frame fighting detected**: Even Approach B showed zero jitter. This is likely because the scene is simple (1 mesh). Under heavier scenes, Approach A's single-writer guarantee becomes more important.
2. **Camera at 50% scroll is AT the cube** (z=-50): Screenshot shows Camera Z: -50.3, confirming the scroll→camera pipeline works end-to-end. Cube is invisible because camera is inside it at that point.
3. **GSAP ScrollTrigger `scrub: true`** is the correct mode — it interpolates smoothly rather than snapping.
4. **`useGSAP` hook** from `@gsap/react` handles cleanup properly when switching approaches.

## Recommendation for Task 6 (ScrollJourney Implementation)

Use **Approach A (Ref-Based)** with this architecture:

```typescript
// In the scroll page component:
const progressRef = useRef(0)

useGSAP(() => {
  ScrollTrigger.create({
    trigger: containerRef.current,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => { progressRef.current = self.progress },
  })
}, { scope: containerRef })

// Inside Canvas, in a CameraController component:
function CameraController({ progressRef }) {
  const { camera } = useThree()
  useFrame(() => {
    const t = progressRef.current
    // Can add lerping, easing, multi-axis here — single writer
    camera.position.z = THREE.MathUtils.lerp(startZ, endZ, t)
  })
  return null
}
```

For multi-section scroll journeys, extend `progressRef` to a store or multiple refs per section.

## Evidence

- `task-1-camera-moves.png` — Screenshot at 50% scroll showing Camera Z: -50.3, FPS: 120
- `task-1-camera-moves-approach-b.png` — Approach B comparison screenshot
- Spike page: `src/app/spike/scroll-camera/page.tsx`

## Verdict

**GATE PASSED. Proceed with full architecture build.**
