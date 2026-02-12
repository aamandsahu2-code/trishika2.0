"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import Button from "../Button"

// ✅ CORRECT - Use template literals with backticks for multi-line
const messageText = `Happy Birthday, Princess!
You deserve all the happiness and smiles in the world today. You have a truly special way of making everything around you brighter just by being yourself. I hope your day is filled with laughter, surprises, and all the things that make your heart happy.
Keep being the amazing person you are and spreading joy wherever you go. Wishing you endless success and a year as wonderful as you are! ✨`

const words = messageText.split(" ")

export default function MessageScreen({ onNext }) {
  const [opened, setOpened] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#fff8fc] p-4 sm:p-7 rounded-[40px] sm:rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-100 sm:max-w-110 relative flex flex-col items-center gap-4 sm:gap-6 my-10 card-glow overflow-hidden"
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

      {/* BOX CONTAINER - FIXED SIZE, NO ANIMATION */}
      <div className="relative h-64 sm:h-80 md:h-71.25 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[450px] rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-inner bg-linear-to-b from-white/80 to-pink-200">
        
        {/* CARD (IMAGE) - SLIDES LEFT WHEN CLICKED */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ 
            x: opened ? -450 : 0,
            opacity: opened ? 0 : 1
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut" 
          }}
          onClick={() => setOpened(true)}
          className="absolute top-0 left-0 h-full w-full cursor-pointer"
          style={{ 
            backgroundImage: "url('/images/KD NOPE.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 10
          }}
        >
          {/* SIRF IMAGE */}
        </motion.div>

        {/* MESSAGE - HIDDEN BY DEFAULT, SHOWS WHEN CARD SLIDES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: opened ? 1 : 0
          }}
          transition={{ 
            duration: 0.4,
            delay: opened ? 0.2 : 0
          }}
          onClick={() => setOpened(false)}
          className="absolute top-0 left-0 h-full w-full cursor-pointer p-6"
          style={{ 
            zIndex: opened ? 20 : 5 
          }}
        >
          {/* Message content */}
          <div className="h-full overflow-y-auto text-foreground leading-relaxed">
            <div className="flex flex-wrap gap-x-1.5 gap-y-2">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ 
                    opacity: opened ? 1 : 0,
                    y: opened ? 0 : 5
                  }}
                  transition={{
                    duration: 0.3,
                    delay: opened ? 0.4 + (i * 0.02) : 0
                  }}
                  className="will-change-transform"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          
          {/* Inner glow */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 20%, rgba(255,180,200,0.25), transparent 60%)",
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
        
      </div>

      {/* NEXT BUTTON - ALWAYS VISIBLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4"
      >
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white relative overflow-hidden group px-10"
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
          
          <span className="relative z-10 flex items-center gap-2">
            <span>Next</span>
            <ChevronRight size={18} />
          </span>
          
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
    </motion.div>
  )
}
