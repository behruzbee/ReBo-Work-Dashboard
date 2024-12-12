
interface RIconProps {
    className?: string,
    name: string
}

const RIcon = ({ name, className }: RIconProps) => {
    return (
        <i className={`bx bx-${name} ${className || ''}`}></i>
    )
}

export default RIcon