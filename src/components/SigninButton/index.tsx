import style from './style.module.scss'
import { FaGithub } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FiX } from 'react-icons/fi'
import { signIn, useSession, signOut } from "next-auth/react"
import { useEffect } from 'react';

export function SigninButton({text, iconType}) {
  const { data: session } = useSession();

  return session ? (
    <button className={style.signinButton}>
      <FaGithub color='#84d361' />
      {session.user.name}
      <FiX color='#737380' className={style.closeIcon} onClick={() => {signOut(); localStorage.removeItem('logged')}} />
    </button>
  ) : (
    <button
      type='button'
      className={style.signinButton}
      onClick={() => {signIn('github'); localStorage.setItem('logged', 'true') }}>
      {iconType === 'github' ? <FaGithub color='#eba417' /> : <MdEmail />}
      Login com {text}
    </button>
  )
}