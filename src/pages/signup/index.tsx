import UserContext from "@/Contexts/user-context"
import SignupForm from "@/components/user-oriented/signup_form"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import style from "@/styles/sign_pages.module.css"

export default function SignupPage(){
  const { userData } = useContext(UserContext) as {userData: any, setUserData: any}

  const router = useRouter()


  return (
    <main className={style.father}>

      <SignupForm/>
    </main>
  )
}