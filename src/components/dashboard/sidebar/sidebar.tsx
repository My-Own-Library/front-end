import style from "@/styles/sidebar.module.css"
import SidebarSection from "./sidebar_section"
import { roboto } from "@/styles/fonts"
import { AnimatePresence } from "framer-motion"
import { AiFillSetting } from "react-icons/ai"
import { motion } from "framer-motion"
import { useContext, useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import UserContext from "@/Contexts/user-context"
import { ImExit } from "react-icons/im";
import { logout } from "@/services/user-services"
import { useRouter } from "next/router"

export default function Sidebar() {
  const [selected, setSelected] = useState<boolean>(true)

  const router = useRouter()

  const { userData, setUserData } = useContext(UserContext) as any

  useEffect(() =>{
    if( userData === undefined || userData === null ) {
      router.push("/signin")
    }
  }, [])

  async function logoutPost() {
    try{
      await logout(userData.token)
      setUserData(null)
      router.push("/signin")
    }catch(err: any){
      toast.warn(err?.response?.data.message)
      setUserData(null)
      router.push("/signin")
    }
  }

  return (
    <>
      <AnimatePresence>
        {selected ?
          <motion.aside className={`${style.father} ${roboto.className}`} exit={{ x: -500 }} initial={{ x: -500 }} animate={{ x: 0 }} transition={{ duration: 1 }}>
            <header>
              <h1>Assets</h1>
              <motion.div whileHover={{ background: "var(--dark-letter)" }} transition={{ duration: 0.4 }} initial={{ background: "var(--background-black)" }}>
                <motion.div onClick={() => setSelected(!selected)} animate={{ rotate: 360, scale: 1, background: "var(--background-black)" }} transition={{ repeatType: "loop", duration: 2, repeat: Infinity, type: "tween", ease: "linear" }}>
                  <AiFillSetting />
                </motion.div>
              </motion.div>
            </header>
            <SidebarSection main="Topics" subsets={["Create", "Visualization"]} type="topics" />
            <SidebarSection main="Activities" subsets={["Tasks", "Projects"]} type="activities" />
            <SidebarSection main="Evolution" subsets={["Overview"]} type="evolution" />
            <footer>
              <motion.button onClick={() => logoutPost()}>
                <ImExit/>
              </motion.button>
            </footer>
          </motion.aside>

          : null
        }
      </AnimatePresence>
      <AnimatePresence>
        {!selected ?
          <motion.aside className={`${style.contract} ${roboto.className}`} animate={{ x: 0 }} onClick={() => setSelected(!selected)}
            initial={{ x: -200 }} exit={{ x: -200 }} transition={{ duration: 0.4 }} whileHover={{ background: "var(--black-border)" }}>
            <motion.div animate={{ rotate: 360, scale: 1 }} transition={{ repeatType: "loop", duration: 2, repeat: Infinity, type: "tween", ease: "linear" }}>
              <AiFillSetting />
            </motion.div>
          </motion.aside>
          : null
        }
      </AnimatePresence>

      <ToastContainer/>
    </>
  )
}