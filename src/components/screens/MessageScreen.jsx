"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Button from "../Button"

const messageText = `Happy Birthday, Cutiepie! You deserve all the happiness, love, and smiles in the world today and always. You have this special way of making everything around you brighter — your smile, your kindness, and the way you make people feel truly cared for. I hope your day is filled with laughter, surprises, and moments that make your heart happy. You're truly one of a kind, and I just want you to know how special you are. Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness, success, and all the sweet things life has to offer. 💗`

const words = messageText.split(" ")

export default function MessageScreen({ onNext }) {
  const [opened, setOpened] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleCardClick = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setOpened(!opened)
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-6 my-10 card-glow overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h2 className="shimmer-text text-2xl md:text-3xl font-semibold text-center">
          A Special Message
        </h2>
        <motion.p
          className="text-primary/60 text-sm mt-1"
          animate={{ opacity: opened ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Tap to open
        </motion.p>
      </motion.div>

      {/* CARD CONTAINER WITH SLIDE ANIMATION */}
      <div className="relative w-full flex flex-col items-center">
        {/* ENVELOPE CARD - SLIDES LEFT WHEN OPENING */}
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={{ 
            x: opened ? -400 : 0,
            opacity: opened ? 0 : 1,
            scale: opened ? 0.9 : 1
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut",
            opacity: { duration: 0.4 }
          }}
          onClick={handleCardClick}
          className="relative h-71.25 w-full max-w-71.25 rounded-[40px] overflow-hidden shadow-inner cursor-pointer bg-linear-to-b from-white/80 to-pink-200 flex items-center justify-center"
          style={{ 
            backgroundImage: "url('/images/KD NOPE.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* NO EMOJI - PURE IMAGE ONLY */}
        </motion.div>

        {/* MESSAGE CONTENT - SLIDES IN FROM RIGHT WHEN OPENING */}
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ 
            x: opened ? 0 : 400,
            opacity: opened ? 1 : 0,
            scale: opened ? 1 : 0.9
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut",
            delay: opened ? 0.2 : 0
          }}
          onClick={handleCardClick}
          className="absolute top-0 h-71.25 w-full max-w-71.25 rounded-[40px] overflow-hidden shadow-inner cursor-pointer bg-linear-to-b from-white/80 to-pink-200"
        >
          {/* Message content */}
          <div className="relative px-6 h-full overflow-y-auto text-foreground leading-relaxed pt-8 pb-6">
            <div className="flex flex-wrap gap-x-1.5 gap-y-2">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: opened ? 1 : 0, 
                    y: opened ? 0 : 10 
                  }}
                  transition={{
                    duration: 0.3,
                    delay: opened ? 0.3 + (i * 0.02) : 0,
                    ease: "easeOut"
                  }}
                  className="will-change-transform"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          
          {/* Inner glow */}
          {opened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 pointer-events-none rounded-[40px]"
              style={{
                background: "radial-gradient(ellipse at 50% 20%, rgba(255,180,200,0.18), transparent 60%)",
              }}
            />
          )}
        </motion.div>
      </div>

      {/* NEXT BUTTON - ALWAYS VISIBLE WITH ANIMATION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4"
      >
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white relative overflow-hidden group px-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ 
              x: [0, 3, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none"
            style={{ 
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" 
            }}
          />
          
          <motion.span
            animate={{ 
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10 flex items-center gap-2"
          >
            <span className="relative z-10">Next</span>
            <ChevronRight 
              size={18} 
              className="relative z-10"
            />
          </motion.span>
          
          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0px rgba(255, 107, 138, 0)",
                "0 0 20px rgba(255, 107, 138, 0.5)",
                "0 0 0px rgba(255, 107, 138, 0)"
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Button>
      </motion.div>

      {/* INSTRUCTIONS TEXT */}
      <AnimatePresence>
        {opened && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-primary/60 text-sm"
          >
            Tap message to close
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
