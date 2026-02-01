"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import { Mail } from "lucide-react"
import Button from "../Button"

const photos = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
]

/* Stagger variants */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
}
const childVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function PhotosScreen({ onNext }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 card-glow overflow-hidden"
    >
      {/* Floating decorations */}
      {[
        { emoji: "📸", top: "4%", left: "7%", delay: 0.2 },
        { emoji: "💜", top: "5%", right: "8%", delay: 0.5 },
        { emoji: "✨", bottom: "12%", left: "5%", delay: 0.7 },
        { emoji: "🌟", bottom: "8%", right: "6%", delay: 0.4 },
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
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.8 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            {d.emoji}
          </motion.span>
        </motion.div>
      ))}

      {/* Header */}
      <motion.div variants={childVariants} className="text-center">
        <h2 className="shimmer-text text-2xl md:text-3xl font-semibold" style={{
          background: "linear-gradient(105deg, var(--accent) 0%, #7c5cbf 30%, #c9b8ff 50%, #7c5cbf 70%, var(--accent) 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmerSlide 3s linear infinite",
        }}>
          Some Sweet Moments
        </h2>
        <p className="text-sm text-accent/60 mt-1.5">(Swipe for more)</p>
      </motion.div>

      {/* Photo carousel box */}
      <motion.div
        variants={childVariants}
        className="relative p-6 bg-linear-to-b from-white/80 to-violet-200 w-full rounded-[40px] flex flex-col items-center justify-center shadow-inner"
      >
        {/* Inner ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute inset-0 rounded-[40px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, rgba(167,139,250,0.15), transparent 65%)",
          }}
        />

        <div className="relative z-10">
          <Swiper
            effect="fade"
            modules={[EffectFade, Autoplay]}
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            className="w-53.75 h-70 md:w-59.25 md:h-77.5"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <motion.div className="h-full w-full rounded-3xl overflow-hidden">
                  <div className="relative h-full w-full rounded-2xl overflow-hidden">
                    <img
                      loading="lazy"
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="h-full w-full rounded-2xl object-contain"
                    />
                    {/* Subtle vignette overlay */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.12) 100%)",
                      }}
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Slide indicator dots */}
        <div className="flex gap-2 mt-4 relative z-10">
          {photos.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full transition-all duration-400 ease-out"
              style={{
                height: 6,
                background: i === activeIndex ? "var(--accent)" : "rgba(89,75,160,0.22)",
                boxShadow: i === activeIndex ? "0 0 8px rgba(89,75,160,0.4)" : "none",
              }}
              animate={{ width: i === activeIndex ? 22 : 6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={childVariants} className="mt-4 flex justify-center">
        <Button onClick={onNext} className="bg-[#ddd6ff] text-accent relative overflow-hidden group">
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }}
          />
          <Mail size={18} className="relative z-10" />
          <span className="relative z-10">Open My Message</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
