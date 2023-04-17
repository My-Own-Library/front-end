import SignupForm from "@/components/user-oriented/signup_form"
import React from "react"
import style from "@/styles/signs/sign_pages.module.css"

export default function SignupPage(){
  return (
    <main className={style.father}>

      <SignupForm/>
    </main>
  )
}