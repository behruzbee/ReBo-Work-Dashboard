
import { useState } from 'react'
import { RIcon } from '../icon'
import s from './styles.module.scss'

interface RModalProps {
    open: boolean
}

const RModal = ({ open }: RModalProps) => {
    const [isOpen, setIsOpen] = useState(open)

    return (
        <div className={`${s.modalWrapper} ${isOpen && s.activeWrapper}`}>
            <div className={`${s.modal} ${isOpen && s.activeModal}`}>
                <div className={s.closeIcon} onClick={() => setIsOpen(false)}>
                    <RIcon name='x' />
                </div>
            </div>
        </div>
    )
}

export default RModal