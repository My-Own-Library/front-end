import UserContext from "@/Contexts/user-context"
import { postTheme } from "@/services/themes-service"
import { FormEvent, useContext, useState } from "react"
import { toast } from "react-toastify"
import style from "@/styles/themes/theme_form.module.css"
import { GiCancel } from "react-icons/gi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion"


export default function ThemeForm() {
  const [name, setName] = useState<string>("")

  const { userData } = useContext(UserContext) as any

  async function createTheme(e: FormEvent) {
    e.preventDefault()

    try {
      const theme = await postTheme(userData.token, name)
      toast.success(`Theme ${theme.name} created`)
      setName("")
    } catch (err: any) {
      if(err?.response?.status === 400){
        toast.warn(err?.response?.data.message[0])
      }
      if(err?.response?.status === 409){
        toast.warn(err?.response?.data.message)
      }
    }
  }

  return (
    <form onSubmit={(e) => createTheme(e)} className={style.father}>
      <h1>Create Theme</h1>

      <div className={style.input}>
        <input type="text" required placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />

        {name.length > 1 ?
          <div className={style.green}>
            <AiOutlineCheckCircle />
          </div>
          :
          <div className={style.red}>
            <GiCancel />
          </div>
        }
      </div>
      <motion.button whileHover={{ backgroundColor: "var(--blue-2)" }} type="submit">Criar</motion.button>
    </form>
  )
}