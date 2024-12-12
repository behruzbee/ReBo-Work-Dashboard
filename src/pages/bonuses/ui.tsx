import { useState } from "react";

import { SearchableTable } from "~widgets/searchable-table"
import { SalaryInput } from "~features/salary-input";
import { useGetWorkersQuery } from "~entities/worker";
import { useGetBonusesQuery } from "~entities/bonus";
import { Spinner } from "~shared/ui/spinner"
import { RSelect } from "~shared/ui/select";
import { RInput } from "~shared/ui/input";
import { RouterPaths } from "~shared/constants/router-path";
import { parseNumberWithSpaces } from "~shared/libs/number-parser";

import { useColumns } from "./columns";
import s from './styles.module.scss';

const BonusesPage = () => {
  const columns = useColumns()
  const { data: workers } = useGetWorkersQuery()
  const { data: bonuses, isLoading } = useGetBonusesQuery()

  const [filters, setFilters] = useState({
    worker_id: '',
    description: '',
    amount: ''
  })

  if (isLoading || !bonuses || !workers) {
    return (
      <div className={s.wrapper}>
        <Spinner />
      </div>
    )
  }

  const workersSelectOptions = workers.map(worker => ({ label: `${worker.name} ${worker.lastName}`, value: worker.id }))

  return (
    <SearchableTable
      createPath={RouterPaths.bonuses.create}
      title="Bonuslar"
      data={bonuses}
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
        />,
        <SalaryInput
          key='amount'
          placeholder="200 000 so'm"
          value={filters.amount}
          onChange={value => setFilters((prev) => ({ ...prev, amount: parseNumberWithSpaces(value)}))}
          label="Miqdor orqali qidirish"
        />
      ]}
      sorting={[{ id: 'time', desc: true }]}
    />
  )
}

export default BonusesPage