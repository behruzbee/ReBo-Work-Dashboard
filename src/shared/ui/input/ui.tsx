import { HTMLProps, useId } from "react"

import s from './styles.module.scss'

export interface RInputProps extends HTMLProps<HTMLInputElement> {
    errorMessage?: string
}

const RInput = ({ errorMessage, ...props }: RInputProps) => {
    const id = useId()
    return (
        <div className={s.wrapper}>
            {props.label &&
                <label htmlFor={id}>
                    {props.label}
                    {props.required && <span>*</span>}
                </label>
            }
            <input id={id} {...props} />
            {errorMessage && <span>{errorMessage}</span>}
        </div>
    )
}

export default RInput