"use client"
import React, { useState } from 'react'
import {BsMoonFill, BsSunFill} from  'react-icons/bs'

const themes ={
  light:"light",
  dark:"dark",
  cupcake:"cupcake",
  winter :"winter",
  dracula:"dracula"
}

const ThemeToggle:React.FC = () => {
  const [theme, setTheme] = useState(themes.winter);

  const toogleTheme = () => {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }


  return (
    <button className='btn btn-sm btn-outline' onClick={toogleTheme}>
        {
          theme==="winter" ?(
            <BsMoonFill  className='w-4 h-4' />
          ) :(
            <BsSunFill  className='w-4 h-4' />
          )
        }
    </button>
  )
}

export default ThemeToggle