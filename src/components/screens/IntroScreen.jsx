"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import Button from "../Button"

/* Stagger container + children */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/* Floating decoration positions */
const floaters = [
  { emoji: "💖", top: "6%",  left: "8%",  delay: 0.3, duration: 4.2 },
  { emoji: "✨", top: "4%",  right: "10%", delay: 0.6, duration: 3.6 },
  { emoji: "🌸", bottom: "12%", left: "6%",  delay: 0.9, duration: 5.0 },
  { emoji: "💫", bottom: "8%",  right: "7%", delay: 0.5, duration: 4.6 },
  { emoji: "🎀", top: "30%", left: "2%",  delay: 1.0, duration: 4.8 },
]

export default function IntroScreen({ onNext }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 card-glow overflow-hidden"
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

      {/* Illustration box */}
      <motion.div
        variants={childVariants}
        className="relative h-44 md:h-52 bg-linear-to-b from-white/80 to-pink-200 w-full rounded-[40px] flex items-end justify-center shadow-inner overflow-hidden"
      >
        {/* Inner glow highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute inset-0 rounded-[40px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 80%, rgba(255,180,200,0.25), transparent 65%)",
          }}
        />

        <motion.img
          loading="lazy"
          src="/gifs/intro.gif"
          alt="Cute"
          className="w-26 md:w-32 relative z-10"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </motion.div>

      {/* Text block */}
      <motion.div variants={childVariants} className="text-center px-2">
        <h1
          className="shimmer-text text-2xl md:text-3xl font-semibold leading-tight will-change-transform"
        >
          A Cutiepie was born today, 21 years ago!
        </h1>

        <motion.p
          className="mt-4 text-foreground will-change-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Yes, it&apos;s YOU! A little surprise awaits...
        </motion.p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        variants={childVariants}
        className="mt-4"
      >
        <Button
          onClick={() => onNext?.()}
          className="bg-[#f1caeb] text-primary relative overflow-hidden group"
        >
          {/* Button shine on hover */}
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
          />
          <Gift size={20} className="relative z-10" />
          <span className="relative z-10">Start the surprise</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
