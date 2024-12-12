import { ReactNode } from 'react'
import { RIcon } from '~shared/ui/icon'

import s from './styles.module.scss'

interface InfoCardProps {
    iconName: string
    title: string
    value: ReactNode
    type: 'bonus' | 'penalty' | 'workingHours'
}

const InfoCard = ({iconName, title, type, value}: InfoCardProps) => {
    return (
        <div className={`${s.cardInfo} ${s[type]}`}>
            <div className={s.cardInfoLeft}>
                <RIcon name={iconName} className={s.cardInfoIcon}></RIcon>
            </div>
            <div className={s.cardInfoRight}>
                <h5 className={s.cardInfoTitle}>{title}</h5>
                <p className={s.cardInfoValue}>{value}</p>
            </div>
        </div>
    )
}

export default InfoCard