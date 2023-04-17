import SigninForm from "@/components/user-oriented/signin_form"
import React from "react"
import style from "@/styles/signs/sign_pages.module.css"

export default function SigninPage(){
  return (
    <main className={style.father}>

      <SigninForm/>
    </main>
  )
}

