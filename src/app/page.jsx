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

/* ── Birthday Fireworks Screen - SIMPLIFIED WORKING VERSION ── */
function BirthdayFireworksScreen() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const fireworks = []
    const particles = []

    const colors = ['#ff0043', '#14fc56', '#1e7fff', '#e60aff', '#ffbf36', '#ff69b4', '#ffffff']

    class Firework {
      constructor(sx, sy, tx, ty) {
        this.x = sx
        this.y = sy
        this.sx = sx
        this.sy = sy
        this.tx = tx
        this.ty = ty
        this.distanceToTarget = Math.sqrt((tx - sx) ** 2 + (ty - sy) ** 2)
        this.distanceTraveled = 0
        this.trail = []
        this.trailLength = 5
        this.angle = Math.atan2(ty - sy, tx - sx)
        this.speed = 3
        this.acceleration = 1.05
        this.brightness = Math.random() * 50 + 50
        this.targetRadius = 2.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update(index) {
        this.trail.unshift({ x: this.x, y: this.y })
        if (this.trail.length > this.trailLength) this.trail.pop()

        this.speed *= this.acceleration

        const vx = Math.cos(this.angle) * this.speed
        const vy = Math.sin(this.angle) * this.speed

        this.distanceTraveled = Math.sqrt((this.x - this.sx) ** 2 + (this.y - this.sy) ** 2)

        if (this.distanceTraveled >= this.distanceToTarget) {
          createParticles(this.tx, this.ty, this.color)
          fireworks.splice(index, 1)
        } else {
          this.x += vx
          this.y += vy
        }
      }

      draw() {
        ctx.beginPath()
        ctx.moveTo(this.trail[this.trail.length - 1]?.x || this.x, this.trail[this.trail.length - 1]?.y || this.y)
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = this.color
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.targetRadius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = {
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10
        }
        this.alpha = 1
        this.decay = Math.random() * 0.02 + 0.015
        this.gravity = 0.3
        this.size = Math.random() * 3 + 1
      }

      update(index) {
        this.velocity.y += this.gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.velocity.x *= 0.98
        this.velocity.y *= 0.98
        this.alpha -= this.decay

        if (this.alpha <= this.decay) {
          particles.splice(index, 1)
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
      }
    }

    function createParticles(x, y, color) {
      const particleCount = 100
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color))
      }
    }

    function launchFirework(targetX, targetY) {
      const startX = Math.random() * width
      const startY = height
      fireworks.push(new Firework(startX, startY, targetX, targetY))
    }

    function randomFirework() {
      const tx = Math.random() * width
      const ty = Math.random() * height * 0.5 + 50
      launchFirework(tx, ty)
    }

    // Click handler
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      launchFirework(x, y)
    }

    // Touch handler
    const handleTouch = (e) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0] || e.changedTouches[0]
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      launchFirework(x, y)
    }

    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('touchstart', handleTouch, { passive: false })

    // Animation loop
    function loop() {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'

      // Auto launch
      if (Math.random() < 0.05) {
        randomFirework()
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update(i)
        fireworks[i].draw()
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update(i)
        particles[i].draw()
      }

      requestAnimationFrame(loop)
    }

    // Initial fireworks
    setTimeout(() => randomFirework(), 500)
    setTimeout(() => randomFirework(), 1000)
    setTimeout(() => randomFirework(), 1500)
    setTimeout(() => randomFirework(), 2000)

    loop()

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('touchstart', handleTouch)
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full cursor-pointer"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4"
              style={{ textShadow: '0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,105,180,0.5)' }}>
              🎉 Happy Birthday! 🎉
            </h2>
            <p className="text-lg md:text-2xl text-white/90 mt-4">
              May your day be filled with joy and celebration!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-white/70 text-sm mt-8"
          >
            Click anywhere to launch more fireworks! 🎆
          </motion.div>
        </div>
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
        @KD
      </motion.div>
    </main>
  )
}
