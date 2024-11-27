import { useState } from "react"
import { parseNumberWithSpaces } from "~shared/libs/number-parser"
import { RInput, type RInputProps } from "~shared/ui/input"

interface SalaryInput extends RInputProps { }

const SalaryInput = ({ ...props }: SalaryInput) => {
    const [value, setValue] = useState('')

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        setValue(parseNumberWithSpaces(Number(numericValue)))
    }

    return (
        <RInput
            value={value}
            onChange={handleOnChange}
            label="Oylik maosh"
            placeholder="Oylik maoshni kiriting!"
            {...props}
        />
    )
}

export default SalaryInput