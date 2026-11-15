import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { sound } from '../utils/soundEngine'
import { scrollEngine } from '../utils/scrollEngine'

export type VisualMode = 'spine' | 'vortex' | 'warp'

interface ThreeCanvasProps {
  mode?: VisualMode
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [currentMode, setCurrentMode] = useState<VisualMode>('spine')
  const [isWarping, setIsWarping] = useState(false)

  useEffect(() => {
    const handleSetMode = (e: CustomEvent<VisualMode>) => {
      setCurrentMode(e.detail)
    }
    window.addEventListener('setVisualMode' as unknown as keyof WindowEventMap, handleSetMode as EventListener)
    return () => {
      window.removeEventListener('setVisualMode' as unknown as keyof WindowEventMap, handleSetMode as EventListener)
    }
  }, [])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050508, 0.0013)

    const camera = new THREE.PerspectiveCamera(
      62,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    )
    camera.position.set(0, 40, 240)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    // ==========================================
    // 1. 3D KINETIC CYBER SPINE
    // ==========================================
    const spineGroup = new THREE.Group()
    scene.add(spineGroup)

    // Base Control Points for the 3D Spine Spline Path
    const initialPoints = [
      new THREE.Vector3(0, 180, 40),
      new THREE.Vector3(-25, 110, 15),
      new THREE.Vector3(35, 40, -10),
      new THREE.Vector3(-45, -40, 25),
      new THREE.Vector3(30, -120, -15),
      new THREE.Vector3(-35, -200, 30),
      new THREE.Vector3(40, -290, -20),
      new THREE.Vector3(-20, -380, 20),
      new THREE.Vector3(10, -480, -10),
      new THREE.Vector3(0, -600, 0),
    ]

    const spineCurve = new THREE.CatmullRomCurve3(initialPoints, false, 'centripetal')

    // Continuous Glowing Spinal Cord Tube
    const tubeGeometry = new THREE.TubeGeometry(spineCurve, 70, 2.2, 6, false)
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    })
    const spinalCordMesh = new THREE.Mesh(tubeGeometry, tubeMaterial)
    spineGroup.add(spinalCordMesh)

    // Secondary Inner Laser Nerve Core
    const nerveLineGeo = new THREE.BufferGeometry().setFromPoints(spineCurve.getPoints(80))
    const nerveLineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    })
    const nerveLineMesh = new THREE.Line(nerveLineGeo, nerveLineMat)
    spineGroup.add(nerveLineMesh)

    // 46 Articulated Vertebrae Segments
    const vertebraeCount = 46
    interface Vertebra {
      group: THREE.Group
      t: number
      baseScale: number
      centrumMesh: THREE.Mesh
      leftRib: THREE.Mesh
      rightRib: THREE.Mesh
      dorsalFin: THREE.Mesh
      jointNode: THREE.Mesh
    }
    const vertebrae: Vertebra[] = []

    const centrumGeo = new THREE.CylinderGeometry(5.2, 5.8, 3, 6)
    const centrumMat = new THREE.MeshBasicMaterial({
      color: 0x0e1320,
      wireframe: false,
    })
    const centrumWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    })

    const ribGeo = new THREE.BoxGeometry(22, 1.2, 2.4)
    const ribMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    })

    const dorsalGeo = new THREE.ConeGeometry(2.5, 9, 4)
    const dorsalMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })

    const jointGeo = new THREE.SphereGeometry(1.6, 6, 6)
    const jointMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff })

    for (let i = 0; i < vertebraeCount; i++) {
      const t = i / (vertebraeCount - 1)
      const vertGroup = new THREE.Group()

      // Vertebra core (centrum)
      const centrum = new THREE.Mesh(centrumGeo, centrumMat)
      const centrumWire = new THREE.Mesh(centrumGeo, centrumWireMat)
      centrum.add(centrumWire)
      vertGroup.add(centrum)

      // Lateral Rib Struts (Transverse Processes)
      const leftRib = new THREE.Mesh(ribGeo, ribMat)
      leftRib.position.set(-13, 0, 0)
      leftRib.rotation.z = 0.2
      vertGroup.add(leftRib)

      const rightRib = new THREE.Mesh(ribGeo, ribMat)
      rightRib.position.set(13, 0, 0)
      rightRib.rotation.z = -0.2
      vertGroup.add(rightRib)

      // Posterior Dorsal Fin (Spinous Process)
      const dorsalFin = new THREE.Mesh(dorsalGeo, dorsalMat)
      dorsalFin.position.set(0, 0, 7)
      dorsalFin.rotation.x = Math.PI / 2
      vertGroup.add(dorsalFin)

      // Glowing Node Reticles on the rib tips
      const leftTip = new THREE.Mesh(jointGeo, jointMat)
      leftTip.position.set(-24, 0, 0)
      vertGroup.add(leftTip)

      const rightTip = new THREE.Mesh(jointGeo, jointMat)
      rightTip.position.set(24, 0, 0)
      vertGroup.add(rightTip)

      // Vertebra taper curve: wider in thoracic region, tapered at ends
      const ribWidth = Math.sin(t * Math.PI) * 0.7 + 0.65
      vertGroup.scale.set(ribWidth, 1, ribWidth)

      spineGroup.add(vertGroup)

      vertebrae.push({
        group: vertGroup,
        t,
        baseScale: ribWidth,
        centrumMesh: centrum,
        leftRib,
        rightRib,
        dorsalFin,
        jointNode: leftTip,
      })
    }

    // Traveling Neural Synaptic Impulses (Luminous Photon Packets)
    const impulseCount = 3
    const impulseGeo = new THREE.SphereGeometry(3, 8, 8)
    const impulseMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    })
    const impulses: THREE.Mesh[] = []

    for (let i = 0; i < impulseCount; i++) {
      const imp = new THREE.Mesh(impulseGeo, impulseMat)
      const glowOrb = new THREE.Mesh(
        new THREE.SphereGeometry(6, 6, 6),
        new THREE.MeshBasicMaterial({
          color: 0x00f0ff,
          wireframe: true,
          transparent: true,
          opacity: 0.45,
        })
      )
      imp.add(glowOrb)
      spineGroup.add(imp)
      impulses.push(imp)
    }

    // ==========================================
    // 2. SURROUNDING AMBIENT PARTICLES (OPTIMIZED)
    // ==========================================
    const particleCount = 1200
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const cyanColor = new THREE.Color(0x00f0ff)
    const purpleColor = new THREE.Color(0xa855f7)
    const emeraldColor = new THREE.Color(0x00f0ff)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = Math.pow(Math.random(), 1.4) * 450 + 20
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 800

      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius

      positions[i3] = x
      positions[i3 + 1] = y
      positions[i3 + 2] = z

      originalPositions[i3] = x
      originalPositions[i3 + 1] = y
      originalPositions[i3 + 2] = z

      const mixedColor =
        Math.random() > 0.4
          ? cyanColor.clone().lerp(purpleColor, Math.random())
          : emeraldColor.clone().lerp(cyanColor, Math.random())

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Particle Texture
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 32
    pCanvas.height = 32
    const pCtx = pCanvas.getContext('2d')
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.25, 'rgba(0, 240, 255, 0.95)')
      gradient.addColorStop(0.65, 'rgba(168, 85, 247, 0.35)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      pCtx.fillStyle = gradient
      pCtx.fillRect(0, 0, 32, 32)
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas)

    const particleMaterial = new THREE.PointsMaterial({
      size: 4.2,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particleSystem = new THREE.Points(geometry, particleMaterial)
    scene.add(particleSystem)

    // 3. Cybernetic Laser Floor
    const gridHelper = new THREE.GridHelper(1600, 40, 0x00f0ff, 0x181828)
    gridHelper.position.y = -280
    gridHelper.material.opacity = 0.25
    gridHelper.material.transparent = true
    scene.add(gridHelper)

    // Dynamic Mouse Tracking
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isDown: false,
    }

    // Scroll Telemetry State
    const scroll = {
      current: 0,
      target: 0,
      progress: 0,
      targetProgress: 0,
      velocity: 0,
      targetVelocity: 0,
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('button, a, input, textarea, select')) return
      mouse.isDown = true
      setIsWarping(true)
      sound.playGlitch()
    }

    const handleMouseUp = () => {
      mouse.isDown = false
      setIsWarping(false)
    }

    // Subscribe to Lenis momentum smooth scroll
    const unsubscribeScroll = scrollEngine.subscribe((data) => {
      scroll.target = data.scroll
      scroll.targetProgress = data.progress
      scroll.targetVelocity = data.velocity
    })

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()
    let warpFactor = 1
    let frameCount = 0

    const upVector = new THREE.Vector3(0, 1, 0)
    const tangentVector = new THREE.Vector3()
    const axisVector = new THREE.Vector3()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      frameCount++
      const elapsedTime = clock.getElapsedTime()

      // Smooth interpolation for mouse and scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.06
      mouse.y += (mouse.targetY - mouse.y) * 0.06

      scroll.current += (scroll.target - scroll.current) * 0.08
      scroll.progress += (scroll.targetProgress - scroll.progress) * 0.08
      scroll.velocity += (scroll.targetVelocity - scroll.velocity) * 0.1

      const absVelocity = Math.abs(scroll.velocity)

      // Hyperdrive calculation
      if (mouse.isDown || currentMode === 'warp') {
        warpFactor = THREE.MathUtils.lerp(warpFactor, 4.5, 0.08)
      } else if (absVelocity > 15) {
        warpFactor = THREE.MathUtils.lerp(warpFactor, Math.min(3.5, 1 + absVelocity * 0.08), 0.08)
      } else {
        warpFactor = THREE.MathUtils.lerp(warpFactor, 1, 0.06)
      }

      // SKELETAL VERTEBRAL CURVATURE PROPAGATION
      const p = scroll.progress
      const flexSpeed = elapsedTime * 1.8 + scroll.current * 0.003
      const waveAmplitude = 28 + Math.min(25, absVelocity * 1.2)

      for (let i = 0; i < initialPoints.length; i++) {
        const pt = initialPoints[i]
        const wavePhase = flexSpeed + i * 0.65

        pt.x = Math.sin(wavePhase) * waveAmplitude + mouse.x * 24
        pt.z = Math.cos(wavePhase * 0.8) * (waveAmplitude * 0.75) + mouse.y * 20

        if (p > 0.18 && p < 0.55) {
          pt.x += Math.sin((i / initialPoints.length) * Math.PI) * 45
        }
      }

      // Recompute spline
      spineCurve.points = initialPoints
      spineCurve.updateArcLengths()

      // Update tube geometry throttled every 3 frames to avoid GC stalls
      if (frameCount % 3 === 0) {
        const updatedTubeGeo = new THREE.TubeGeometry(spineCurve, 70, 2.2, 6, false)
        spinalCordMesh.geometry.dispose()
        spinalCordMesh.geometry = updatedTubeGeo
      }

      // Update inner nerve line
      const updatedLinePoints = spineCurve.getPoints(80)
      nerveLineMesh.geometry.setFromPoints(updatedLinePoints)

      // Align and Orient all 46 Vertebrae along the curve
      for (let i = 0; i < vertebrae.length; i++) {
        const vert = vertebrae[i]
        const pointOnCurve = spineCurve.getPointAt(vert.t)
        vert.group.position.copy(pointOnCurve)

        spineCurve.getTangentAt(vert.t, tangentVector)
        axisVector.crossVectors(upVector, tangentVector).normalize()
        const angle = Math.acos(THREE.MathUtils.clamp(upVector.dot(tangentVector), -1, 1))
        vert.group.quaternion.setFromAxisAngle(axisVector, angle)

        vert.group.rotateZ(Math.sin(elapsedTime * 2 + vert.t * 8) * 0.25 + mouse.x * 0.3)

        const ribFlare = 1 + (absVelocity / 40) * 0.4
        vert.leftRib.scale.x = ribFlare
        vert.rightRib.scale.x = ribFlare
      }

      // Traveling Synaptic Impulses down the Spine
      for (let i = 0; i < impulses.length; i++) {
        const imp = impulses[i]
        const impT = (elapsedTime * 0.35 + i * (1 / impulseCount) + p * 1.5) % 1
        const impPos = spineCurve.getPointAt(impT)
        imp.position.copy(impPos)
      }

      // Camera Flight Along the Spine
      const camProgress = Math.min(0.92, p * 0.85 + 0.05)
      const spineLookTarget = spineCurve.getPointAt(Math.min(0.99, camProgress + 0.08))
      const spineCamBase = spineCurve.getPointAt(camProgress)

      const targetCamX = spineCamBase.x + 35 + mouse.x * 30
      const targetCamY = spineCamBase.y + 15 + mouse.y * 25
      const targetCamZ = spineCamBase.z + 180 - (warpFactor - 1) * 35

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.07)
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.07)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.07)

      camera.rotation.z = THREE.MathUtils.lerp(
        camera.rotation.z,
        scroll.velocity * 0.003 + mouse.x * 0.06,
        0.05
      )

      // Dynamic FOV hyperspace expansion on scroll velocity
      const targetFov = 62 + Math.min(10, Math.abs(scroll.velocity) * 0.35)
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.08)
      camera.updateProjectionMatrix()

      camera.lookAt(spineLookTarget.x, spineLookTarget.y - 10, spineLookTarget.z)

      // Surrounding Particles reactive wave (Optimized vector math)
      const posArray = geometry.attributes.position.array as Float32Array
      const spineCenter = spineCurve.getPointAt(0.5)

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const origX = originalPositions[i3]
        const origY = originalPositions[i3 + 1]
        const origZ = originalPositions[i3 + 2]

        let curX = origX
        let curY = origY + Math.sin(elapsedTime * 1.5 + origX * 0.02 + p * 8) * 10
        let curZ = origZ

        if (absVelocity > 6) {
          curZ += (scroll.velocity > 0 ? 1 : -1) * Math.sin(i) * absVelocity * 0.4
        }

        const dx = curX - spineCenter.x
        const dy = curY - spineCenter.y
        const distSq = dx * dx + dy * dy

        if (distSq < 12000 && distSq > 1) {
          const force = (1 - distSq / 12000) * 5
          const invDist = 1 / Math.sqrt(distSq)
          curX += dx * invDist * force
          curY += dy * invDist * force
        }

        posArray[i3] = curX
        posArray[i3 + 1] = curY
        posArray[i3 + 2] = curZ
      }
      geometry.attributes.position.needsUpdate = true

      particleSystem.rotation.y = elapsedTime * 0.02 * warpFactor + scroll.current * 0.0002
      gridHelper.position.z = (elapsedTime * 35 * warpFactor + scroll.current * 0.6) % 32

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      unsubscribeScroll()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResize)

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      particleMaterial.dispose()
      tubeGeometry.dispose()
      tubeMaterial.dispose()
      nerveLineGeo.dispose()
      nerveLineMat.dispose()
      centrumGeo.dispose()
      centrumMat.dispose()
      ribGeo.dispose()
      ribMat.dispose()
      dorsalGeo.dispose()
      dorsalMat.dispose()
      jointGeo.dispose()
      jointMat.dispose()
      impulseGeo.dispose()
      impulseMat.dispose()
    }
  }, [currentMode])

  return (
    <>
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ opacity: 0.96 }}
      />

      {isWarping && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none font-mono text-xs px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] flex items-center space-x-2 animate-pulse shadow-[0_0_20px_rgba(0,240,255,0.4)]">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span>SYNAPSE OVERLOAD // HIGH SPEED PARTICLES &amp; SPINAL SURGE</span>
        </div>
      )}
    </>
  )
}
