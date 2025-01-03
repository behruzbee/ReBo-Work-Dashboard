import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchableTable } from "~widgets/searchable-table"
import PermissionControl from "~features/permission/ui";
import { useGetHistoriesQuery } from "~entities/history";
import { useGetWorkersQuery } from "~entities/worker";
import { Spinner } from "~shared/ui/spinner"
import { RSelect } from "~shared/ui/select";
import { RouterPaths } from "~shared/constants/router-path";
import { RInput } from "~shared/ui/input";
import { RButton } from "~shared/ui/button";
import { basePermissions } from "~shared/constants/base-permissions";

import { useColumns } from "./columns";
import s from './styles.module.scss';

const HistoriesPage = () => {
  const navigate = useNavigate()
  const columns = useColumns()
  const { data: workers } = useGetWorkersQuery()
  const { data: histories, isLoading } = useGetHistoriesQuery()

  const [filters, setFilters] = useState({
    worker_id: '',
    work_place_name: '',
    scan_time: ''
  })

  if (isLoading || !histories || !workers) {
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
          Tarixlar
        </h2>
        <PermissionControl level={basePermissions.history.create}>
          <div className={s.headerButtons}>
            <RButton type='button' onClick={() => navigate(RouterPaths.histories.create)} color='blue'>Qo'shish</RButton>
          </div>
        </PermissionControl>
      </div>
      <SearchableTable
        data={histories}
        columns={columns}
        inputs={[
          <RSelect
            key='worker_id'
            value={filters.worker_id}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters((prev) => ({ ...prev, worker_id: e.target.value }))}
            label="Xodim orqali qidirish"
            options={workersSelectOptions}
            defaultOptionText="Hammasi"
          />,
          <RInput
            key='worker_place_name'
            value={filters.work_place_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters((prev) => ({ ...prev, work_place_name: e.target.value }))}
            label="Skanerlangan joy orqali qidirish"
            placeholder="Skanerlangan joyni kiriting!"
          />,
          <RInput
            key='scan_time'
            value={filters.scan_time}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters((prev) => ({ ...prev, scan_time: e.target.value }))}
            label="Kun orqali qidirish"
            type="date"
          />
        ]}
        filters={filters}
        sorting={[{ id: 'scan_time', desc: true }]}
      />
    </PermissionControl>
  )
}

export default HistoriesPage