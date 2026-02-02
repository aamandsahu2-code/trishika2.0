"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import Button from "@/components/Button"

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

/* ── Fireworks Screen Component (inline) ── */
function FireworksScreen({ onNext }) {
  const canvasRef = useRef(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const rockets = []

    class Particle {
      constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.velocity = {
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8
        }
        this.alpha = 1
        this.decay = Math.random() * 0.015 + 0.015
        this.gravity = 0.3
        this.size = Math.random() * 3 + 1
      }

      update() {
        this.velocity.y += this.gravity
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= this.decay
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

    class Rocket {
      constructor(x, targetY, color) {
        this.x = x
        this.y = canvas.height
        this.targetY = targetY
        this.color = color
        this.speed = 4
        this.exploded = false
      }

      update() {
        if (this.y > this.targetY) {
          this.y -= this.speed
        } else if (!this.exploded) {
          this.explode()
          this.exploded = true
        }
      }

      explode() {
        const particleCount = 80
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.color))
        }
      }

      draw() {
        if (!this.exploded) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        }
      }
    }

    const colors = ['#ff0043', '#14fc56', '#1e7fff', '#e60aff', '#ffbf36', '#ffffff']

    function launchRocket() {
      const x = Math.random() * canvas.width
      const targetY = Math.random() * canvas.height * 0.4 + 100
      const color = colors[Math.floor(Math.random() * colors.length)]
      rockets.push(new Rocket(x, targetY, color))
    }

    const launchInterval = setInterval(() => {
      if (Math.random() < 0.7) {
        launchRocket()
      }
    }, 400)

    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => launchRocket(), i * 200)
      }
    }, 300)

    setTimeout(() => setShowButton(true), 3500)

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update()
        rockets[i].draw()
        if (rockets[i].exploded && rockets[i].y < -10) {
          rockets.splice(i, 1)
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1)
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    let animationId = requestAnimationFrame(animate)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      clearInterval(launchInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 bg-black" style={{ width: '100%', height: '100%' }} />
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-3"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,105,180,0.3)' }}>
            Let&apos;s Celebrate! 🎉
          </h2>
          <p className="text-lg md:text-xl text-white/90">Your special moments await...</p>
        </motion.div>

        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Button onClick={onNext} className="bg-white/90 text-purple-600 hover:bg-white relative overflow-hidden group">
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
              <Sparkles size={20} className="relative z-10" />
              <span className="relative z-10">View Memories</span>
            </Button>
          </motion.div>
        )}
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,105,180,0.6), transparent 70%)', filter: 'blur(60px)', animation: 'orbPulse 3s ease-in-out infinite alternate' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(30,127,255,0.6), transparent 70%)', filter: 'blur(60px)', animation: 'orbPulse 4s ease-in-out infinite alternate', animationDelay: '-2s' }} />
    </div>
  )
}

/* ── Progress indicator dots ── */
function ProgressDots({ current, total }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: current >= 1 && current !== 3 ? 1 : 0 }}
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
    <FireworksScreen key="fireworks" onNext={() => setCurrentScreen(4)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(5)} />,
    <MessageScreen key="message" />,
  ]

  const pageVariants = {
    enter: { opacity: 0, scale: 0.94, filter: "blur(6px)", y: 18 },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.96, filter: "blur(3px)", y: -12, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } },
  }

  return (
    <main className="min-h-screen overflow-hidden relative" style={{ background: "var(--background)" }}>
      {currentScreen !== 3 && (
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
        animate={{ x: 0, opacity: currentScreen === 3 ? 0 : 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-sm text-black/40 pointer-events-none z-50 font-light"
      >
        @anujbuilds
      </motion.div>
    </main>
  )
}
