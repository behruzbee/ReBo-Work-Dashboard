import { HTMLProps } from "react"

interface RIconProps extends HTMLProps<HTMLDivElement> {
    name: string
}

const RIcon = ({ name, className, ...props }: RIconProps) => {
    return (
        <i className={`bx bx-${name} ${className}`} {...props}></i>
    )
}

export default RIcon