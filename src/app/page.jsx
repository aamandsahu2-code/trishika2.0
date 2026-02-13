"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"

/* ── Ambient particle config ── */
const PARTICLE_COUNT = 4 // Further reduced for mobile performance
const PARTICLE_COLORS = [
  "rgba(255,143,171,0.7)",
  "rgba(233,168,255,0.6)",
  "rgba(151,59,136,0.5)",
  "rgba(255,209,102,0.55)",
  "rgba(89,75,160,0.5)",
  "rgba(255,182,193,0.6)",
]

function AmbientParticles() {
  const [particles] = useState(() => {
    // Use a seeded random function for deterministic values
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: Math.round(seededRandom(i) * 100 * 100) / 100, // Round to 2 decimal places
      size: Math.round((4 + seededRandom(i + 100) * 10) * 100) / 100,
      duration: Math.round((8 + seededRandom(i + 200) * 12) * 100) / 100,
      delay: Math.round(seededRandom(i + 300) * -15 * 100) / 100,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    }))
  })

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
            willChange: 'transform', // Optimize for mobile
          }}
        />
      ))}
    </>
  )
}

/* ── Floating Stars Background ── */
function FloatingStars() {
  const stars = [
    { left: '10%', delay: '0s' },
    { left: '25%', delay: '2s' },
    { left: '40%', delay: '4s' },
    { left: '55%', delay: '1s' },
    { left: '70%', delay: '3s' },
    { left: '85%', delay: '5s' },
  ]

  return (
    <>
      <style jsx>{`
        .float-star {
          position: absolute;
          bottom: -10px;
          color: white;
          font-size: 18px;
          animation: floatStar 10s linear infinite;
          opacity: 0.8;
          pointer-events: none;
          z-index: 1;
        }
        
        @keyframes floatStar {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0;
          }
          20% { 
            opacity: 1; 
          }
          100% {
            transform: translateY(-120vh) scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
      
      {stars.map((star, i) => (
        <div
          key={i}
          className="float-star"
          style={{
            left: star.left,
            animationDelay: star.delay,
          }}
        >
          ⭐
        </div>
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

/* ── Progress indicator dots ── */
function ProgressDots({ current, total }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: current >= 1 ? 1 : 0 }}
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
    <MessageScreen key="message" />,
  ]

  /* staggered transition variants - minimal for mobile */
  const pageVariants = {
    enter: {
      opacity: 0,
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2, // Very fast
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -4,
      transition: {
        duration: 0.15, // Very fast
        ease: "easeIn",
      },
    },
  }

  return (
    <main className="min-h-screen overflow-hidden relative" style={{ background: "var(--background)" }}>
      {/* Floating Stars Background */}
      <FloatingStars />

      {/* Ambient atmosphere */}
      <GlowOrbs />
      <AmbientParticles />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-2 sm:p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial="enter"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="flex items-center justify-center w-full"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots (visible after loader) */}
      <ProgressDots current={currentScreen} total={5} />

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-sm text-black/40 pointer-events-none z-50 font-light"
      >
        @anujbuilds
      </motion.div>
    </main>
  )
}
