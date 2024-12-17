import { useNavigate, useParams } from "react-router-dom"

import { useGetWorkerQuery } from "~entities/worker"
import { RButton } from "~shared/ui/button"
import { RIcon } from "~shared/ui/icon"

import s from './styles.module.scss'
import { CardInfo } from "./components/card"
import PermissionControl from "~features/permission/ui"
import { basePermissions } from "~shared/constants/base-permissions"

const WorkerPage = () => {
  const { id } = useParams()
  const { data: worker } = useGetWorkerQuery(id || '0')
  const navigate = useNavigate()

  if (!worker) {
    return <h1>Bunday ID bilan ishchi topilmadi</h1>
  }

  return (
    <PermissionControl level={basePermissions.worker.readWorker}>
      <RButton type='button' color='white' className={s.backButton} onClick={() => navigate(-1)}>
        <RIcon name='arrow-back' /> Qaytish
      </RButton>
      <div className={s.wrapper}>
        <div className={s.header}>
          <div className={s.headerTop}>
            <h3 className={s.fullName}>
              {`${worker.name} ${worker.lastName}`}
            </h3>
            <p className={s.createdAt}>
              12.12.2024
            </p>
          </div>
          <div className={s.line}></div>
          <RButton type='button' color='green' size="sm" onClick={() => navigate(`/workers/update/${id}`)}>
            <RIcon name='edit-alt' /> O'zgartirish
          </RButton>
        </div>

        <div className={s.cardInfoWrapper}>
          <CardInfo
            iconName="money"
            title="Ishchi bonuslari"
            type="bonus"
            value="$223 000"
          />
          <CardInfo
            iconName="money-withdraw"
            title="Ishchi jarimalari"
            type="penalty"
            value="$20 000"
          />
          <CardInfo
            iconName="time-five"
            title="Ishchi ishlagan daqiqasi"
            type="workingHours"
            value="2231"
          />
        </div>
      </div>
    </PermissionControl>
  )
}

export default WorkerPage