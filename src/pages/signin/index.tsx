import UserContext from "@/Contexts/user-context"
import SigninForm from "@/components/user-oriented/signin_form"
import { useRouter } from "next/router"
import React, { useContext, useEffect } from "react"
import style from "@/styles/sign_pages.module.css"

export default function SigninPage(){
  const { userData } = useContext(UserContext) as {userData: any, setUserData: any}

  const router = useRouter()


  return (
    <main className={style.father}>

      <SigninForm/>
    </main>
  )
}

