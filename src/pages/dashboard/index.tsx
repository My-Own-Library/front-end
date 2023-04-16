import Sidebar  from "@/components/dashboard/sidebar/sidebar"
import ThemeCreation from "@/components/dashboard/themes-base/theme_creation"
import React from "react"
import style from "@/styles/dashboard.module.css"


export default function Dashboard() {

  return(
    <main className={style.father}>
      <Sidebar/>
      <ThemeCreation/>
    </main>
  )
}