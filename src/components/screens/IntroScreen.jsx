"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import Button from "../Button"

/* Stagger container + children - minimal for mobile */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.02, delayChildren: 0 }, // Almost instant
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 8 }, // Minimal movement
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" }, // Very fast
  },
}

/* Floating decoration positions - reduced for mobile */
const floaters = [
  { emoji: "💖", top: "6%",  left: "8%", delay: 0.3, duration: 4.2 },
  { emoji: "✨", top: "4%", right: "10%", delay: 0.6, duration: 3.6 },
] // Reduced from 5 to 2 floaters

export default function IntroScreen({ onNext }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#fff8fc] p-4 sm:p-7 rounded-[40px] sm:rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-100 sm:max-w-110 relative flex flex-col items-center gap-4 card-glow overflow-hidden"
    >
      {/* Floating decorative emojis */}
      {floaters.map((f, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-lg select-none"
          style={{ top: f.top, left: f.left, right: f.right, bottom: f.bottom }}
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 0.55, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: f.delay, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.span
            animate={{
              y: [0, -7, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: f.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {f.emoji}
          </motion.span>
        </motion.div>
      ))}

      {/* Illustration box - Adjusted for centered square image */}
      <motion.div
        variants={childVariants}
        className="relative w-[280px] h-[360px] sm:w-[320px] sm:h-[410px] mx-auto bg-linear-to-b from-white/80 to-pink-200 rounded-[30px] sm:rounded-[40px] flex items-center justify-center shadow-inner overflow-hidden"
      >
        {/* Inner glow highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute inset-0 rounded-[40px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(255,180,200,0.25), transparent 70%)",
          }}
        />

        <motion.img
          loading="lazy"
          src="/gifs/intro.jpg"
          alt="Cute"
          className="w-full h-full object-cover rounded-2xl relative z-10 shadow-sm"
          initial={{ opacity: 0 }} // Removed scale animation
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }} // Very fast
        />
      </motion.div>

      {/* Text block */}
      <motion.div variants={childVariants} className="text-center px-2">
        <h1
          className="shimmer-text text-xl sm:text-2xl md:text-3xl font-semibold leading-tight"
        >
          A Princess was born today, 19 years ago!
        </h1>

        <motion.p
          className="mt-4 text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Yes, it&apos;s YOU! A little surprise awaits...
        </motion.p>
      </motion.div>

      {/* CTA Button */}
      <motion.div variants={childVariants} className="mt-4">
        <Button
          onClick={() => onNext?.()}
          className="bg-[#f1caeb] text-primary relative overflow-hidden group"
        >
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
          />
          <Gift size={20} className="relative z-10" />
          <span className="relative z-10">Start the surprise</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
