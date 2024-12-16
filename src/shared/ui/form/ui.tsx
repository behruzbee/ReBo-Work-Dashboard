import { ReactNode } from 'react'

import { RButton } from '../button'
import s from './style.module.scss'

interface RFormProps {
    buttonText: string
    isLoading?: boolean
    inputs?: ReactNode[]
    onSubmit?: (data: any) => void
}

const RForm = ({ buttonText, inputs, isLoading, onSubmit }: RFormProps) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        onSubmit && onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            {inputs}
            <RButton disabled={isLoading} type='submit' color='blue'>
                {buttonText}
            </RButton>
        </form>
    )
}

export default RForm