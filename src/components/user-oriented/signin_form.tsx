import UserContext from "@/Contexts/user-context"
import { signIn } from "@/services/user-services"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEvent, useContext, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import style from "@/styles/sign_forms.module.css"
import { roboto } from "@/styles/fonts"
import { motion } from "framer-motion"

export default function SigninForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const router = useRouter()

  const { setUserData } = useContext(UserContext) as any

  async function signinPost(e: FormEvent) {
    e.preventDefault()

    try {
      const response = await signIn({ email, password })
      setUserData(response)
      router.push("/dashboard")
    }
    catch (err: any) {
      if(err?.response?.status === 400){
        toast.warn(err?.response?.data.message[0])
      }
      if(err?.response?.status === 401){
        toast.warn(err?.response?.data.message)
      }
    }
  }

  return (
    <>
      <div className={`${style.father} ${roboto.className}`}>
        <h1> Signin </h1>
        <form onSubmit={(e) => signinPost(e)}>
          <input type="email" required placeholder="Email" value={email} onChange={(v) => setEmail(v.target.value)} />
          <input type="password" required placeholder="Password" value={password} onChange={(v) => setPassword(v.target.value)} />
          <motion.button whileHover={{}} transition={{ duration: 0.6 }}>Signin</motion.button>
        </form>
        <Link href={"/signup"} rel="preload" as="script">Still does not have an account? Singup</Link>
        
      </div>
      <ToastContainer/>
    </>
  )
}