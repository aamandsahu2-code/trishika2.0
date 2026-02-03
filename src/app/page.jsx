"use client"

import { useState } from "react"
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

  /* staggered transition variants */
  const pageVariants = {
    enter: {
      opacity: 0,
      scale: 0.94,
      filter: "blur(6px)",
      y: 18,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(3px)",
      y: -12,
      transition: {
        duration: 0.45,
        ease: [0.4, 0, 1, 1],
      },
    },
  }

  return (
    <main className="min-h-screen overflow-hidden relative" style={{ background: "var(--background)" }}>
      {/* Ambient atmosphere */}
      <GlowOrbs />
      <AmbientParticles />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
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
        @ your KD
      </motion.div>
    </main>
  )
}
