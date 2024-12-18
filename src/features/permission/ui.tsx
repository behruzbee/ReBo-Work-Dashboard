import { ReactNode } from 'react'
import { useGetMe } from '~entities/user'

interface PermissionControlProps {
    level: number
    children?: ReactNode
    noAccessText?: string
}

const PermissionControl = ({ level, children, noAccessText }: PermissionControlProps) => {
    const { data: me } = useGetMe()

    if (level >= (me?.status_index || 0)) {
        return children
    }

    if(noAccessText) {
        return <>{noAccessText}</>
    }

    return null
}

export default PermissionControl