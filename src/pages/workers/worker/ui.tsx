import { useNavigate, useParams } from "react-router-dom"

import { PermissionControl } from "~features/permission"
import { useGetWorkerQuery } from "~entities/worker"
import { useGetWorkerBonusesQuery } from "~entities/bonus"
import { useGetWorkerHistoriesQuery } from "~entities/history"
import { useGetWorkerPenaltyQuery } from "~entities/penalty"
import { RButton } from "~shared/ui/button"
import { RIcon } from "~shared/ui/icon"
import { RTable } from "~shared/ui/table"
import { parseNumberWithSpaces } from "~shared/libs/number-parser"
import { basePermissions } from "~shared/constants/base-permissions"

import s from './styles.module.scss'
import { CardInfo } from "./components/card"
import { useColumns } from "./columns"

const WorkerPage = () => {
  const { id } = useParams()
  const columns = useColumns()
  const { data: worker } = useGetWorkerQuery(id || '0')
  const { data: penalties } = useGetWorkerPenaltyQuery(id || '0')
  const { data: bonuses } = useGetWorkerBonusesQuery(id || '0')
  const { data: histories } = useGetWorkerHistoriesQuery(id || '0')
  const navigate = useNavigate()

  if (!worker) {
    return <h1>Bunday ID bilan ishchi topilmadi</h1>
  }

  const totalPenaltiesAmount = penalties ? penalties.reduce((prev, curr) => prev + curr.amount, 0) : 0
  const totalBonusesAmount = bonuses ? bonuses.reduce((prev, curr) => prev + curr.amount, 0) : 0
  const totalWorkingMinutes = histories
    ? histories
      .sort((a, b) => new Date(a.scan_time).getTime() - new Date(b.scan_time).getTime())
      .reduce((total, curr, index, array) => {
        if (curr.status_type === "enter") {
          const next = array[index + 1];
          if (next && next.status_type === "exit") {
            const enterTime = new Date(curr.scan_time).getTime();
            const exitTime = new Date(next.scan_time).getTime();
            const minutesWorked = Math.floor((exitTime - enterTime) / 60000);
            return total + minutesWorked;
          }
        }
        return total;
      }, 0)
    : 0;

  return (
    <PermissionControl level={basePermissions.worker.readWorker}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <div className={s.headerTop}>
            <h3 className={s.fullName}>
              {`${worker.name} ${worker.lastName}`}
            </h3>
            <p className={s.createdAt}>
              {new Date(worker.created_at).toLocaleDateString()}
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
            value={`${parseNumberWithSpaces(totalBonusesAmount)} so'm`}
          />
          <CardInfo
            iconName="money-withdraw"
            title="Ishchi jarimalari"
            type="penalty"
            value={`${parseNumberWithSpaces(totalPenaltiesAmount)} so'm`}
          />
          <CardInfo
            iconName="time-five"
            title="Ishchi ishlagan daqiqasi"
            type="workingHours"
            value={`${parseNumberWithSpaces(totalWorkingMinutes)} m`}
          />
        </div>
      </div>

      <h4 className={s.title}>Ishchi tarixlar</h4>

      <RTable
        data={histories || []}
        columns={columns}
        sorting={[{ id: 'scan_time', desc: true }]}
      />
    </PermissionControl>
  )
}

export default WorkerPage