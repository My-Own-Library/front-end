import style from "@/styles/theme_creation.module.css"
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion"
import { useState } from "react";


export default function ThemeCreation() {
  const [mode, setMode] = useState<boolean>(false)

  return (
    <div className={style.father}>
      <header>
        <motion.section whileHover={{backgroundColor: "var(--black-6)"}} className={ style.left } onClick={() => setMode(true)}>
          <AiFillEye/>
        </motion.section>

        <motion.section whileHover={{backgroundColor: "var(--black-6)"}} className={ style.right } onClick={() => setMode(false)}> 
          <AiOutlinePlus/>
        </motion.section>
      </header>



    </div>
  )
}