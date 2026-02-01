"use client"

import { useState, useRef, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Flame, MoveRight } from "lucide-react"
import Button from "../Button"

const confettiColors = ["#ff8fab", "#ffb3c6", "#fca5a5", "#e9a8ff", "#ffd166", "#a78bfa", "#fb923c"]

/* sparkle burst items fired on candle light */
const sparkleAngles = [0, 45, 90, 135, 180, 225, 270, 315]

export default function CakeScreen({ onNext }) {
  const [lit, setLit] = useState(false)
  const [sparkles, setSparkles] = useState([])
  const sparkleId = useRef(0)

  const lightCandle = useCallback(() => {
    if (lit) return
    setLit(true)

    /* Spawn sparkle burst */
    const burst = sparkleAngles.map((angle, i) => ({
      id: sparkleId.current++,
      angle,
      delay: i * 0.04,
    }))
    setSparkles(burst)
    setTimeout(() => setSparkles([]), 1200)

    /* Confetti after short delay */
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 95,
        origin: { y: 0.55 },
        colors: confettiColors,
        startVelocity: 38,
        gravity: 0.7,
        decay: 0.82,
      })
    }, 500)

    /* Second burst for extra wow */
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: 0.25, y: 0.6 },
        colors: confettiColors,
        startVelocity: 30,
      })
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: 0.75, y: 0.6 },
        colors: confettiColors,
        startVelocity: 30,
      })
    }, 1100)
  }, [lit])

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 card-glow overflow-hidden">

      {/* Sparkle burst overlay */}
      <AnimatePresence>
        {sparkles.map((s) => {
          const rad = (s.angle * Math.PI) / 180
          const tx = Math.cos(rad) * 70
          const ty = Math.sin(rad) * 70
          return (
            <motion.div
              key={s.id}
              className="absolute pointer-events-none z-50 text-yellow-300"
              style={{
                top: "42%",
                left: "50%",
                fontSize: 12 + Math.random() * 8,
              }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
              transition={{ duration: 0.7, delay: s.delay, ease: "easeOut" }}
              onAnimationComplete={() => {}}
            >
              {["✦", "✧", "⋆", "✦"][s.id % 4]}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Floating decorative accents */}
      {[
        { emoji: "🎂", top: "3%", left: "6%", delay: 0.2 },
        { emoji: "🕯️", top: "5%", right: "8%", delay: 0.5 },
        { emoji: "✨", bottom: "15%", left: "5%", delay: 0.8 },
        { emoji: "🎉", bottom: "10%", right: "6%", delay: 0.4 },
      ].map((d, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-base select-none"
          style={{ top: d.top, left: d.left, right: d.right, bottom: d.bottom }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.6, delay: d.delay, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            {d.emoji}
          </motion.span>
        </motion.div>
      ))}

      {/* Title — shimmer reveal on lit */}
      <motion.div
        className="relative z-10 left-0 w-full text-center text-3xl md:text-4xl font-semibold text-secondary drop-shadow leading-tight px-4 will-change-transform"
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        animate={lit
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.85, y: 8 }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: lit ? 0.45 : 0 }}
      >
        <span className={lit ? "shimmer-text" : ""} style={lit ? {} : { color: "var(--secondary)" }}>
          Happy Birthday, Princess!
        </span>
      </motion.div>

      {/* Cake area */}
      <div className="relative flex flex-col items-center gap-8 w-full">
        <div className="relative h-72 bg-linear-to-b from-white/80 to-rose-200 w-full flex items-end justify-center rounded-[40px] shadow-inner overflow-hidden">

          {/* Warm glow beneath cake when lit */}
          <AnimatePresence>
            {lit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                style={{
                  width: 180, height: 40,
                  background: "radial-gradient(ellipse, rgba(255,200,100,0.35), transparent 70%)",
                  filter: "blur(12px)",
                }}
              />
            )}
          </AnimatePresence>

          <Cake lit={lit} />
        </div>

        {/* Action buttons */}
        <AnimatePresence mode="wait">
          {!lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button onClick={lightCandle} className="bg-[#ffccd3] text-secondary relative overflow-hidden group">
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
                />
                <Flame size={18} className="mb-0.5 relative z-10" />
                <span className="relative z-10">Light the Candle</span>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 2.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Button onClick={onNext} className="bg-[#ffccd3] text-secondary relative overflow-hidden group">
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
                />
                <span className="relative z-10">Next</span>
                <MoveRight size={18} className="mt-0.5 relative z-10" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Pure CSS cake sculpture ── */
function Cake({ lit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cake">
        <div className="plate" />

        {/* Layers animate in staggered */}
        <motion.div
          className="layer layer-bottom"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="layer layer-middle"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="layer layer-top"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Icing slides in */}
        <motion.div
          className="icing"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
        />

        {/* Drips */}
        <motion.div className="drip drip1" initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: 0.4, delay: 0.42, ease: "easeOut" }} style={{ transformOrigin: "top" }} />
        <motion.div className="drip drip2" initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: 0.4, delay: 0.48, ease: "easeOut" }} style={{ transformOrigin: "top" }} />
        <motion.div className="drip drip3" initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ duration: 0.4, delay: 0.54, ease: "easeOut" }} style={{ transformOrigin: "top" }} />

        {/* Candle */}
        <motion.div
          className="candle"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.45, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: "bottom" }}
        >
          {/* Flame — appears only when lit */}
          <AnimatePresence>
            {lit && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.1, y: 6 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                exit={{ opacity: 0, scaleY: 0.1 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="flame"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
