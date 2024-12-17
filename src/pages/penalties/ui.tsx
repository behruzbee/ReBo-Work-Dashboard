import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchableTable } from "~widgets/searchable-table"
import PermissionControl from "~features/permission/ui";
import { useGetWorkersQuery } from "~entities/worker";
import { useGetPenaltiesQuery } from "~entities/penalty";
import { Spinner } from "~shared/ui/spinner"
import { RSelect } from "~shared/ui/select";
import { RInput } from "~shared/ui/input";
import { RouterPaths } from "~shared/constants/router-path";
import { RButton } from "~shared/ui/button";
import { basePermissions } from "~shared/constants/base-permissions";

import { useColumns } from "./columns";
import s from './styles.module.scss';

const PenaltiesPage = () => {
  const navigate = useNavigate()
  const columns = useColumns()
  const { data: workers } = useGetWorkersQuery()
  const { data: penalties, isLoading } = useGetPenaltiesQuery()

  const [filters, setFilters] = useState({
    worker_id: '',
    description: '',
  })

  if (isLoading || !penalties || !workers) {
    return (
      <div className={s.wrapper}>
        <Spinner />
      </div>
    )
  }

  const workersSelectOptions = workers.map(worker => ({ label: `${worker.name} ${worker.lastName}`, value: worker.id }))

  return (
    <PermissionControl level={basePermissions.history.readHistories}>
      <div className={s.header}>
        <h2 className={s.title}>
          Jarimalar
        </h2>
        <PermissionControl level={basePermissions.history.create}>
          <div className={s.headerButtons}>
            <RButton type='button' onClick={() => navigate(RouterPaths.penalties.create)} color='blue'>Qo'shish</RButton>
          </div>
        </PermissionControl>
      </div>
      <SearchableTable
        data={penalties}
        filters={filters}
        columns={columns}
        inputs={[
          <RSelect
            key='worker_id'
            value={filters.worker_id}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters((prev) => ({ ...prev, worker_id: e.target.value }))}
            label="Ishchi orqali qidirish"
            options={workersSelectOptions}
            defaultOptionText="Hammasi"
          />,
          <RInput
            key='description'
            value={filters.description}
            placeholder="Sabab orqali qidirish!"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters((prev) => ({ ...prev, description: e.target.value }))}
            label="Sabab orqali qidirish"
          />
        ]}
        sorting={[{ id: 'time', desc: true }]}
      />
    </PermissionControl>
  )
}

export default PenaltiesPage