import style from "@/styles/themes/theme_creation.module.css"
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion"
import { useState } from "react";
import ThemeForm from "./theme_form";
import ThemeVisualization from "./theme_visualization";
import { roboto } from "@/styles/fonts";


export default function ThemeCreation() {
  const [mode, setMode] = useState<boolean>(false)

  return (
    <div className={`${style.father} ${roboto.className}`}>
      <header>
        <motion.section whileHover={{ backgroundColor: "var(--black-6)" }} className={style.left} onClick={() => setMode(false)}>
          <AiFillEye />
        </motion.section>

        <motion.section whileHover={{ backgroundColor: "var(--black-6)" }} className={style.right} onClick={() => setMode(true)}>
          <AiOutlinePlus />
        </motion.section>
      </header>
      {mode ?
        <ThemeForm />
        : <ThemeVisualization />
      }
    </div>
  )
}