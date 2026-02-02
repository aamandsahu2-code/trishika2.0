"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import Button from "../Button"

export default function FireworksScreen({ onNext }) {
  const canvasRef = useRef(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Firework particles
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

    // Launch fireworks periodically
    const launchInterval = setInterval(() => {
      if (Math.random() < 0.7) {
        launchRocket()
      }
    }, 400)

    // Initial burst
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => launchRocket(), i * 200)
      }
    }, 300)

    // Show button after some time
    setTimeout(() => {
      setShowButton(true)
    }, 3500)

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update()
        rockets[i].draw()
        if (rockets[i].exploded && rockets[i].y < -10) {
          rockets.splice(i, 1)
        }
      }

      // Update and draw particles
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

    // Handle resize
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
      {/* Fireworks canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 bg-black"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-3"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,105,180,0.3)',
            }}
          >
            Let&apos;s Celebrate! 🎉
          </h2>
          <p className="text-lg md:text-xl text-white/90">
            Your special moments await...
          </p>
        </motion.div>

        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Button
              onClick={onNext}
              className="bg-white/90 text-purple-600 hover:bg-white relative overflow-hidden group"
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
              />
              <Sparkles size={20} className="relative z-10" />
              <span className="relative z-10">View Memories</span>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Ambient glow effects */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,105,180,0.6), transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orbPulse 3s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(30,127,255,0.6), transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orbPulse 4s ease-in-out infinite alternate',
          animationDelay: '-2s',
        }}
      />
    </div>
  )
}
