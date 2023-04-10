import style from "@/styles/sidebar.module.css"
import SidebarSection from "./sidebar_section"
import { roboto } from "@/styles/fonts"
import { AnimatePresence } from "framer-motion"
import { AiFillSetting } from "react-icons/ai"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Sidebar() {
  const [selected, setSelected] = useState<boolean>(true)

  return (
    <>
      <AnimatePresence>
        {selected ?
          <motion.aside className={`${style.father} ${roboto.className}`} exit={{ x: -500 }} initial={{ x: -500 }} animate={{x:0}} transition={{ duration: 1 }}>
            <header>
              <h1>Assets</h1>
              <motion.div whileHover={{background:"var(--dark-letter)"}}  transition={{ duration: 0.4}} initial={{background:"var(--background-black)"}}>
                <motion.div onClick={() => setSelected(!selected)} animate={{ rotate: 360, scale: 1, background:"var(--background-black)" }} transition={{ repeatType: "loop", duration: 2, repeat: Infinity, type: "tween", ease: "linear" }}>
                  <AiFillSetting />
                </motion.div>
              </motion.div>
            </header>
            <SidebarSection main="Topics" subsets={["Create", "Visualization"]} type="topics" />
            <SidebarSection main="Activities" subsets={["Tasks", "Projects"]} type="activities" />
            <SidebarSection main="Evolution" subsets={["Overview"]} type="evolution" />
          </motion.aside>

          : null
        }
      </AnimatePresence>
      <AnimatePresence>
        {!selected ?
          <motion.aside className={`${style.contract} ${roboto.className}`} animate={{ x: 0}} onClick={() => setSelected(!selected)}
          initial={{ x: -200 }} exit={{x: -200}} transition={{ duration: 0.4}} whileHover={{background:"var(--black-border)"}}>
            <motion.div animate={{ rotate: 360, scale: 1 }} transition={{ repeatType: "loop", duration: 2, repeat: Infinity, type: "tween", ease: "linear" }}>
              <AiFillSetting />
            </motion.div>
          </motion.aside>
          : null
        }
      </AnimatePresence>
    </>
  )
}