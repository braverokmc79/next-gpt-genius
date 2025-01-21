import Link from 'next/link'
import React from 'react'

const links=[
  {href:"/chat", lable:"채팅"},
  {href:"/tours", lable:"투어"},
  {href:"/tours/new-tour", lable:"새로운 투어"},
  {href:"/profile", lable:"프로필"},
]

const NavLinks:React.FC = () => {
  return (
    <div className='menu text-base-content'>
        {links.map(link => {
            return <li key={link.href}>
                <Link href={link.href} className='capitalize' >
                   {link.lable}
                </Link>
            </li>
      } )}      
    </div>
  )
}

export default NavLinks;
