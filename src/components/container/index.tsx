import style from './style.module.scss'

export function Container({ children }) {
  return (
    <div className={style.container}>
      <h1 style={{marginBottom: '2rem'}}>Postagens</h1>
      {children}
    </div>
  )
}