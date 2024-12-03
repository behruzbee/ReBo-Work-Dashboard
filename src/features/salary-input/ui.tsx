import { useState } from "react"
import { parseNumberWithSpaces } from "~shared/libs/number-parser"
import { RInput, type RInputProps } from "~shared/ui/input"

interface SalaryInput extends Omit<RInputProps, 'defaultValue' | 'onChange'> {
    defaultValue?: number
    onChange?: (value: string) => void
}

const SalaryInput = ({ defaultValue, onChange, ...props }: SalaryInput) => {
    const [value, setValue] = useState('')

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const numericValue = value.replace(/\d/g, "");
        if (Number(numericValue) !== 0 && !isNaN(Number(numericValue))) {
            setValue(parseNumberWithSpaces(Number(numericValue)))
            onChange && onChange(numericValue)
        } else {
            setValue('')
            onChange && onChange('')
        }
    }

    return (
        <RInput
            value={value || (defaultValue && parseNumberWithSpaces(defaultValue))}
            onChange={handleOnChange}
            label="Oylik maosh"
            placeholder="Oylik maoshni kiriting!"
            {...props}
        />
    )
}

export default SalaryInput