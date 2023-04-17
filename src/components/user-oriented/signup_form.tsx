import UserContext from "@/Contexts/user-context"
import { signUp } from "@/services/user-services"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEvent, useContext, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import style from "@/styles/signs/sign_forms.module.css"
import { roboto } from "@/styles/fonts"
import { motion } from "framer-motion"

export default function SignupForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const router = useRouter()

  const { setUserData } = useContext(UserContext) as any

  async function signupPost(e: FormEvent) {
    e.preventDefault()

    if (confirmPassword !== password) {
      toast.warn("Passwords must be equal")
    }
    else {
      try {
        const response = await signUp({ email, password, confirmPassword })
        setUserData(response)
        router.push("/dashboard")
      }
      catch (err: any) {
        if(err.response.status === 400){
          toast.warn(err?.response?.data.message[0])
        }
        if(err.response.status === 409){
          toast.warn(err?.response?.data.message)
        }
      }
    }
  }

  return (
    <>
      <div className={`${style.father} ${roboto.className}`}>
        <h1> Signup </h1>
        <form onSubmit={(e) => signupPost(e)}>
          <input type="email" required placeholder="Email" value={email} onChange={(v) => setEmail(v.target.value)} />
          <input type="password" required placeholder="Password" value={password} onChange={(v) => setPassword(v.target.value)} />
          <input type="password" required placeholder="Repeat Password" value={confirmPassword} onChange={(v) => setConfirmPassword(v.target.value)} />
          <motion.button type="submit">Signup</motion.button>
        </form>
        <Link href={"/signin"} rel="preload" as="script">Already have an account? Singin</Link>

      </div>
      <ToastContainer />
    </>
  )
}