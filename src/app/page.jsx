"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"

/* ── Ambient particle config ── */
const PARTICLE_COUNT = 18
const PARTICLE_COLORS = [
  "rgba(255,143,171,0.7)",
  "rgba(233,168,255,0.6)",
  "rgba(151,59,136,0.5)",
  "rgba(255,209,102,0.55)",
  "rgba(89,75,160,0.5)",
  "rgba(255,182,193,0.6)",
]

function AmbientParticles() {
  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 10,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -15,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    }))
  )

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 1.5}px ${p.color}`,
          }}
        />
      ))}
    </>
  )
}

/* ── Ambient glow orbs ── */
function GlowOrbs() {
  return (
    <>
      <div className="glow-orb" style={{
        width: 340, height: 340,
        background: "radial-gradient(circle, rgba(255,143,171,0.5), transparent 70%)",
        top: "-80px", left: "-60px",
        animationDuration: "6s",
      }} />
      <div className="glow-orb" style={{
        width: 280, height: 280,
        background: "radial-gradient(circle, rgba(151,59,136,0.45), transparent 70%)",
        bottom: "-40px", right: "-50px",
        animationDuration: "8s",
        animationDelay: "-3s",
      }} />
      <div className="glow-orb" style={{
        width: 200, height: 200,
        background: "radial-gradient(circle, rgba(89,75,160,0.4), transparent 70%)",
        top: "40%", left: "60%",
        animationDuration: "10s",
        animationDelay: "-5s",
      }} />
    </>
  )
}

/* ── Birthday Fireworks Screen (after message) ── */
function BirthdayFireworksScreen() {
  const trailsCanvasRef = useRef(null)
  const mainCanvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const trailsCanvas = trailsCanvasRef.current
    const mainCanvas = mainCanvasRef.current
    const container = containerRef.current
    if (!trailsCanvas || !mainCanvas || !container) return

    const trailsCtx = trailsCanvas.getContext('2d')
    const mainCtx = mainCanvas.getContext('2d')

    let width = window.innerWidth
    let height = window.innerHeight
    trailsCanvas.width = mainCanvas.width = width
    trailsCanvas.height = mainCanvas.height = height

    const fireworks = []
    const particles = []
    const globalSpeedMultiplier = 0.7

    const colors = ['#ff0043', '#14fc56', '#1e7fff', '#e60aff', '#ffbf36', '#ff69b4']

    class Firework {
      constructor(x, y, targetX, targetY) {
        this.x = x
        this.y = y
        this.startX = x
        this.startY = y
        this.targetX = targetX
        this.targetY = targetY
        this.distanceToTarget = Math.hypot(targetX - x, targetY - y)
        this.distanceTraveled = 0
        this.coordinates = [[x, y], [x, y], [x, y]]
        this.angle = Math.atan2(targetY - y, targetX - x)
        this.speed = 1.2
        this.acceleration = 1.03
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.targetRadius = 1
      }

      update(index) {
        this.coordinates.pop()
        this.coordinates.unshift([this.x, this.y])
        this.targetRadius = this.targetRadius < 8 ? this.targetRadius + 0.3 : 1
        this.speed *= this.acceleration * globalSpeedMultiplier

        const vx = Math.cos(this.angle) * this.speed
        const vy = Math.sin(this.angle) * this.speed
        this.distanceTraveled = Math.hypot(this.x - this.startX, this.y - this.startY)

        if (this.distanceTraveled >= this.distanceToTarget) {
          createParticles(this.targetX, this.targetY, this.color)
          fireworks.splice(index, 1)
        } else {
          this.x += vx
          this.y += vy
        }
      }

      draw() {
        mainCtx.beginPath()
        mainCtx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1])
        mainCtx.lineTo(this.x, this.y)
        mainCtx.strokeStyle = this.color
        mainCtx.lineWidth = 2
        mainCtx.stroke()

        trailsCtx.beginPath()
        trailsCtx.arc(this.x, this.y, this.targetRadius, 0, Math.PI * 2)
        trailsCtx.fillStyle = this.color
        trailsCtx.fill()
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.coordinates = [[x, y], [x, y], [x, y], [x, y], [x, y]]
        this.angle = Math.random() * Math.PI * 2
        this.speed = (Math.random() * 3 + 0.5) * globalSpeedMultiplier
        this.friction = 0.97
        this.gravity = 0.15
        this.alpha = 1
        this.decay = Math.random() * 0.01 + 0.005
        this.size = Math.random() * 2.5 + 1
      }

      update(index) {
        this.coordinates.pop()
        this.coordinates.unshift([this.x, this.y])
        this.speed *= this.friction
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed + this.gravity
        this.alpha -= this.decay

        if (this.alpha <= this.decay) {
          particles.splice(index, 1)
        }
      }

      draw() {
        const rgb = hexToRgb(this.color)
        
        mainCtx.beginPath()
        mainCtx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1])
        mainCtx.lineTo(this.x, this.y)
        mainCtx.strokeStyle = `rgba(${rgb}, ${this.alpha})`
        mainCtx.lineWidth = 1.5
        mainCtx.stroke()

        trailsCtx.beginPath()
        trailsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        trailsCtx.fillStyle = `rgba(${rgb}, ${this.alpha})`
        trailsCtx.fill()
      }
    }

    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `${r}, ${g}, ${b}`
    }

    function createParticles(x, y, color) {
      const particleCount = 120
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color))
      }
    }

    function launchRandomFirework() {
      const x = Math.random() * width
      const y = height
      const targetX = Math.random() * width
      const targetY = Math.random() * (height * 0.4) + 50
      fireworks.push(new Firework(x, y, targetX, targetY))
    }

    function launchFireworkAt(clientX, clientY) {
      const x = Math.random() * width
      const y = height
      const targetX = clientX
      const targetY = clientY
      fireworks.push(new Firework(x, y, targetX, targetY))
    }

    function loop() {
      trailsCtx.globalCompositeOperation = 'source-over'
      trailsCtx.fillStyle = 'rgba(0, 0, 0, 0.12)'
      trailsCtx.fillRect(0, 0, width, height)
      trailsCtx.globalCompositeOperation = 'lighter'

      mainCtx.clearRect(0, 0, width, height)

      if (Math.random() < 0.03) {
        launchRandomFirework()
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw()
        fireworks[i].update(i)
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw()
        particles[i].update(i)
      }

      animationId = requestAnimationFrame(loop)
    }

    // Click handler
    const handleClick = (e) => {
      launchFireworkAt(e.clientX, e.clientY)
    }

    // Touch handler for mobile
    const handleTouch = (e) => {
      e.preventDefault()
      const touch = e.touches[0] || e.changedTouches[0]
      launchFireworkAt(touch.clientX, touch.clientY)
    }

    container.addEventListener('click', handleClick)
    container.addEventListener('touchstart', handleTouch)

    // Initial fireworks burst
    for (let i = 0; i < 5; i++) {
      setTimeout(() => launchRandomFirework(), i * 500)
    }

    let animationId = requestAnimationFrame(loop)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      trailsCanvas.width = mainCanvas.width = width
      trailsCanvas.height = mainCanvas.height = height
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('click', handleClick)
      container.removeEventListener('touchstart', handleTouch)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black cursor-pointer">
      <canvas ref={trailsCanvasRef} className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: 'lighten' }} />
      <canvas ref={mainCanvasRef} className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: 'lighten' }} />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.6), 0 0 60px rgba(255,105,180,0.4)' }}>
            🎉 Happy Birthday! 🎉
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mt-4">
            May your day be filled with joy and celebration!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="text-white/70 text-sm mt-8"
        >
          Click anywhere to launch more fireworks! 🎆
        </motion.div>
      </div>
    </div>
  )
}

/* ── Progress indicator dots ── */
function ProgressDots({ current, total }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: current >= 1 && current !== 5 ? 1 : 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-50"
    >
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className={`rounded-full transition-all duration-500 ease-out ${
            i === current ? "dot-active" : i < current ? "dot-active opacity-50" : "dot-inactive"
          }`}
          style={{ width: i === current ? 24 : 8, height: 8 }}
          animate={{ width: i === current ? 24 : 8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  )
}

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(4)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(5)} />,
    <BirthdayFireworksScreen key="fireworks" />,
  ]

  const pageVariants = {
    enter: { opacity: 0, scale: 0.94, filter: "blur(6px)", y: 18 },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.96, filter: "blur(3px)", y: -12, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } },
  }

  return (
    <main className="min-h-screen overflow-hidden relative" style={{ background: currentScreen === 5 ? "#000" : "var(--background)" }}>
      {currentScreen !== 5 && (
        <>
          <GlowOrbs />
          <AmbientParticles />
        </>
      )}

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={currentScreen} initial="enter" animate="visible" exit="exit" variants={pageVariants} className="flex items-center justify-center w-full">
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProgressDots current={currentScreen} total={6} />

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: currentScreen === 5 ? 0 : 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-sm text-black/40 pointer-events-none z-50 font-light"
      >
        @anujbuilds
      </motion.div>
    </main>
  )
}
