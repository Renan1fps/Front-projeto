import { useEffect, useState } from 'react'
import { GenericModal } from '../modal'
import style from './style.module.scss'
import { signOut } from "next-auth/react"


export function Header({ isLogged }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleCloseModal() {
    setIsModalOpen(false)
  }


  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <img src="/images/logoBranco.png" alt="v2 logo" width='250px' />
        <nav>
          <a className={style.active}>Home</a>
          <a href='/posts'>Posts</a>
        </nav>
        {isLogged === true ?
          <button className={style.signinButton} onClick={() => {signOut(); localStorage.removeItem('logged')}} >
            <span style={{color: '#61dafb'}}>Renan</span>
          </button> :
          <button className={style.signinButton} onClick={() => setIsModalOpen(true)}>
            Entrar
            <GenericModal isOpen={isModalOpen} onRequestClose={() => handleCloseModal()} />
          </button>
        }
      </div>
    </header>
  )
}