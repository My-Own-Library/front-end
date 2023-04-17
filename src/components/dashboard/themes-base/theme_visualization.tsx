import UserContext from "@/Contexts/user-context"
import { deleteTheme, getThemes, putTheme } from "@/services/themes-service"
import { FormEvent, useCallback, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { TbMoodEmpty } from "react-icons/tb";
import ThemeContext from "@/Contexts/theme-context";
import dayjs from "dayjs";
import style from "@/styles/themes/theme_visualization.module.css"
import { motion } from "framer-motion"
import { BsFillPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import RenderContext from "@/Contexts/render-context";

export default function ThemeVisualization() {
  const [themes, setThemes] = useState<{ id: number, name: string, date: string }[] | [] | null>(null)

  const { renderData } = useContext(RenderContext) as any
  const { userData } = useContext(UserContext) as any

  const handleCall = useCallback(async () => {
    try {
      const response = await getThemes(userData.token)
      setThemes(response)

    } catch (err: any) {
      toast(err?.response?.data.message)
    }

  }, [])

  useEffect(() => {
    handleCall()
  }, [renderData])

  return (
    <div className={style.father}>
      {themes?.length === 0 || null ?
        <div className={style.empty}>
          <h4>No themes created yet</h4>
          <TbMoodEmpty />
        </div>
        :
        themes?.map((e, index) => {
          return <Theme name={e.name} id={e.id} date={e.date} key={index} />
        })
      }

    </div>
  )
}

function Theme({ name, date, id}: { name: string, date: string, id: number }) {
  const { setThemeDataId } = useContext(ThemeContext) as any

  const [mode, setMode] = useState<boolean | null>(null)
  const [selected, setSelected] = useState<boolean>(false)

  function chooseTheme() {
    setThemeDataId(id)
    toast.success("Theme selected")
  }

  return (
    <>
      <motion.div className={style.border} initial={{ backgroundColor: "var(--white)" }} whileHover={{ backgroundColor: "var(--black-7)" }} onClick={() => setSelected(!selected)}>
        <h2>{id}</h2>
        <h1>{name}</h1>
        <h3>{dayjs(date).format('DD/MM/YYYY')}</h3>
      </motion.div>
      {selected ?

        <motion.div className={style.action}>
          <div>
            <motion.section  whileHover={{backgroundColor: "var(--green-2)"}} className={style.green} onClick={() => chooseTheme()}>
              <AiFillCheckCircle />
            </motion.section>
            <motion.section whileHover={{backgroundColor: "var(--blue-2)"}} className={style.blue} onClick={() => setMode(false)}>
              <BsFillPencilFill />
            </motion.section>
            <motion.section whileHover={{backgroundColor: "var(--red-2)"}} className={style.red} onClick={() => setMode(true)}>
              <MdDelete />
            </motion.section>
          </div>

          <ConfirmActions mode={mode} id={id} changeMode={setMode}/>

        </motion.div >
        : null}
    </>
  )
}

function ConfirmActions({ mode, id , changeMode }: { mode: boolean | null, id: number, changeMode: any }) {
  const { userData } = useContext(UserContext) as any
  const { themeDataId, setThemeDataId } = useContext(ThemeContext) as any
  const {renderData, setRender} = useContext(RenderContext) as any

  const [updateName, setUpdateName] = useState<string>("")

  async function updateTheme(e: FormEvent) {
    e.preventDefault()

    try {
      await putTheme(userData.token, updateName, id)
      toast.success("Theme updated")
      setRender(!renderData)

    } catch (err: any) {
      if (err?.response?.status === 400) {
        toast.warn(err?.response?.data.message[0])
      }
      if (err?.response?.status === 409) {
        toast.warn(err?.response?.data.message)
      }
    }
  }

  async function deleteThemePost() {
    try{
      await deleteTheme(userData.token, id)

      if(id === themeDataId){
        setThemeDataId(undefined)
      }

      toast.success("Theme deleted")
      setRender(!renderData)

    }catch(err: any) {
      toast.warn(err?.response?.data.message)
    }
  }

  return (
    <div className={style.confirm}>
      {mode === null ? null :
        mode === false ?
          <form onSubmit={(e) => updateTheme(e)}>
            <input required type="text" placeholder="Name" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
            <button>Update</button>
          </form>
          : <>
            <button onClick={() => changeMode(null) }>Cancel </button>
            <button onClick={() => deleteThemePost()}>Confirm</button>
          </>}

    </div>
  )
}