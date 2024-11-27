import { ReactNode } from 'react'

import { RButton } from '../button'
import s from './style.module.scss'

interface RFormProps {
    buttonText: string
    inputs?: ReactNode[]
    onSubmit?: (data: any) => void
}

const RForm = ({ buttonText, inputs, onSubmit }: RFormProps) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        onSubmit && onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            {inputs}
            <RButton type='submit' color='blue'>
                {buttonText}
            </RButton>
        </form>
    )
}

export default RForm