import style from './style.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button type="button" className={style.subscribeButton}>
      Inscreva-se agora
    </button>
  )
}