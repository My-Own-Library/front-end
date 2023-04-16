import UserContext from "@/Contexts/user-context"
import { postTheme } from "@/services/themes-service"
import { useScroll } from "framer-motion"
import { FormEvent, useContext, useState } from "react"
import { toast } from "react-toastify"


export default function ThemeForm() {
  const [name, setName] = useState<string>("")

  const { userData } = useContext(UserContext) as any

  async function createTheme(e: FormEvent) {
    e.preventDefault()

    try{
      const theme = await postTheme(userData.token, name)
      toast(`Theme ${theme} created`)
      setName("")
    }catch(err: any){
      toast.warn(err?.response?.data.message)
    }
  }

  return(
    <form onSubmit={(e) => createTheme(e)}>
      <input type="text" required placeholder="Name" onChange={(e) => setName(e.target.value)} value={name}/>
      <button>Criar</button>
    </form>
  )
}