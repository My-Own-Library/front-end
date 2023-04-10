import ThemeContext from "@/Contexts/theme-context"
import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"

export default function SidebarSection({ main, subsets, type }: { main: string, subsets: string[], type: string }) {
  const [directions, setDirections] = useState<string[]>([""])
  const [selected, setselected] = useState<boolean>(false)

  const router = useRouter()
  const { themeDataId } = useContext(ThemeContext) as any

  useEffect(() => {
    switch (type) {
      case "topics":
        return setDirections([`/dashboard/${themeDataId}/topics/create`, `/dashboard/${themeDataId}/topics/visualization`])
      case "activities":
        return setDirections([`/dashboard/${themeDataId}/activities/tasks`, `/dashboard/${themeDataId}/activities/projects`])
      case "evolution":
        return setDirections([`/dashboard/${themeDataId}/evolution/overview`])
      default:
        setDirections([""])
    }

  }, [])

  return (
    <div>
      <motion.h2 whileHover={{ backgroundColor: "var(--dark-letter)", color: "var(--white)" }} transition={{ duration: 0.2 }} onClick={() => setselected(!selected)}>{main}</motion.h2>
      <AnimatePresence>
        {directions.length > 0 && selected ?
          <motion.section exit={{ x: [0, -200, -200, -200], marginBottom: [0, 0, -79, -79] }}
            initial={{ x: -200, marginBottom: -79 }}
            animate={{ x: [-200, -200, 0, 0], marginBottom: [-79, 0, 0, 0] }} transition={{ duration: 0.8, type: "tween" }}>

            {subsets.map((e, index) => {
              return <motion.h3 whileHover={{ backgroundColor: "var(--dark-letter)" }} transition={{ duration: 0.2 }}
                onClick={() => router.push(directions[index])}>
                {e}</motion.h3>
            })}

          </motion.section>
          : null
        }
      </AnimatePresence>
    </div>
  )
}