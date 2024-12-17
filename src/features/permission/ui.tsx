import { ReactNode } from 'react'
import { useGetMe } from '~entities/user'

interface PermissionControlProps {
    level: number
    children?: ReactNode
}

const PermissionControl = ({ level, children }: PermissionControlProps) => {
    const { data: me } = useGetMe()

    if (level >= (me?.status_index || 0)) {
        return children
    }

    return null
}

export default PermissionControl