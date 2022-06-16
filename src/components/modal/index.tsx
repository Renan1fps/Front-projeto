import Modal from 'react-modal'
import { SigninButton } from '../SigninButton'
import { SubscribeButton } from '../../components/SubscribeButton'
import style from './style.module.scss'


interface ModalProps {
  isOpen: boolean,
  onRequestClose: () => void
}

export function GenericModal({ isOpen, onRequestClose }: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className={style['container-modal']}>
        <div className={style['container-button']}>
          <SigninButton text={'Github'} iconType={'github'}/>
          <SigninButton text={'email'} iconType={'email'}/>
        </div>
        <SubscribeButton priceId='1' />
      </div>

    </Modal>
  )
}