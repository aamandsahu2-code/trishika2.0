"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import Button from "../Button"

/* Word-by-word reveal for the message */
const messageText = `Happy Birthday, Cutiepie! You deserve all the happiness, love, and smiles in the world today and always. You have this special way of making everything around you brighter — your smile, your kindness, and the way you make people feel truly cared for. I hope your day is filled with laughter, surprises, and moments that make your heart happy. You're truly one of a kind, and I just want you to know how special you are. Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness, success, and all the sweet things life has to offer. 💗`

const words = messageText.split(" ")

/* Hearts that float up after envelope opens */
const hearts = [
  { emoji: "💖", left: "8%",  delay: 0.6 },
  { emoji: "💗", left: "25%", delay: 0.85 },
  { emoji: "💓", left: "45%", delay: 0.7 },
  { emoji: "💕", left: "65%", delay: 1.0 },
  { emoji: "💘", left: "82%", delay: 0.75 },
  { emoji: "❤️", left: "15%", delay: 1.15 },
  { emoji: "💝", left: "55%", delay: 0.95 },
  { emoji: "💖", left: "75%", delay: 1.25 },
]

export default function MessageScreen({ onNext }) {
  const [opened, setOpened] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 card-glow overflow-hidden"
    >
      {/* Floating decorative accents */}
      {[
        { emoji: "💌", top: "4%", left: "7%", delay: 0.15 },
        { emoji: "✨", top: "5%", right: "8%", delay: 0.35 },
        { emoji: "🌷", bottom: "10%", left: "5%", delay: 0.55 },
        { emoji: "💐", bottom: "7%", right: "6%", delay: 0.45 },
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
            transition={{ duration: 3.6 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
          >
            {d.emoji}
          </motion.span>
        </motion.div>
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h2 className="shimmer-text text-2xl md:text-3xl font-semibold text-center" style={{
          background: "linear-gradient(105deg, var(--primary) 0%, #bf4fa0 30%, #ffd6ec 50%, #bf4fa0 70%, var(--primary) 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmerSlide 3s linear infinite",
        }}>
          A Special Message
        </h2>
        <motion.p
          className="text-primary/60 text-sm mt-1"
          animate={{ opacity: opened ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          Tap to open
        </motion.p>
      </motion.div>

      {/* Envelope card */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpened(true)}
        className={`relative h-71.25 w-full rounded-[40px] overflow-hidden shadow-inner cursor-pointer transition-all bg-linear-to-b from-white/80 to-pink-200 flex items-center justify-center max-w-71.25 ${!opened ? "hover:scale-[1.015]" : ""}`}
        style={{ transition: "transform 0.3s ease" }}
      >
        {/* Cover (envelope) */}
        <AnimatePresence>
          {!opened && (
            <motion.div
              className="cover"
              style={{ background: "#ffedea", zIndex: 10 }}
              exit={{
                opacity: 0,
                scale: 1.08,
                filter: "blur(2px)",
              }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Envelope icon hint */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl select-none"
              >
                💌
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message content — word-by-word stagger */}
        <div className="relative px-6 h-56 overflow-y-auto text-foreground leading-relaxed">
          <div className="flex flex-wrap gap-x-1.5 gap-y-0">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: 0.4,
                  delay: opened ? 0.45 + i * 0.028 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Inner glow after open */}
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-0 pointer-events-none rounded-[40px]"
              style={{
                background: "radial-gradient(ellipse at 50% 20%, rgba(255,180,200,0.18), transparent 60%)",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating hearts burst after open */}
      <AnimatePresence>
        {opened && hearts.map((h, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{ left: h.left, bottom: "-10px", fontSize: 18 + (i % 3) * 6 }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-200 - Math.random() * 80], scale: [0, 1.2, 1, 0.6] }}
            transition={{
              duration: 2.8,
              delay: h.delay,
              ease: "easeOut",
              times: [0, 0.15, 0.7, 1],
            }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Bottom sparkle accent + NEXT BUTTON */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-center mt-1 flex flex-col items-center gap-4"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-pink-400 heartbeat inline-block"
            >
              💖
            </motion.span>

            {/* Next Button to Fireworks */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Button
                onClick={onNext}
                className="bg-gradient-to-r from-pink-400 to-purple-500 text-white relative overflow-hidden group"
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
                />
                <Sparkles size={18} className="relative z-10" />
                <span className="relative z-10">Let&apos;s Celebrate!</span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
