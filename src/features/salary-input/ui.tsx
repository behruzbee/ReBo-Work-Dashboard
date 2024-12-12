import { useState } from "react"
import { parseNumberWithSpaces } from "~shared/libs/number-parser"
import { RInput, type RInputProps } from "~shared/ui/input"

interface SalaryInput extends Omit<RInputProps, 'defaultValue' | 'onChange'> {
    defaultValue?: number
    onChange?: (value: number) => void
}

const SalaryInput = ({ defaultValue, onChange, ...props }: SalaryInput) => {
    const [value, setValue] = useState('')

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const numbersArray = value.match(/\d+/gi);
        if (numbersArray) {
            const number = Number(numbersArray.join(''))
            const dividedValue = parseNumberWithSpaces(number)
            setValue(dividedValue)
            onChange && onChange(number)
        } else if(value === '') {
           setValue('')
           onChange && onChange(0)
        }
    }

    return (
        <RInput
            value={value || parseNumberWithSpaces(defaultValue || 0)}
            onChange={handleOnChange}
            label="Oylik maosh"
            placeholder="Oylik maoshni kiriting!"
            {...props}
        />
    )
}

export default SalaryInput