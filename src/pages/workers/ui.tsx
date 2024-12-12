import { useState } from "react";

import { SearchableTable } from "~widgets/searchable-table"
import { useGetWorkersQuery } from "~entities/worker"
import { Spinner } from "~shared/ui/spinner"
import { RInput } from "~shared/ui/input";
import { RSelect } from "~shared/ui/select";
import { RouterPaths } from "~shared/constants/router-path";

import s from './styles.module.scss';
import { useColumns } from "./columns";

const WorkersPage = () => {
  const columns = useColumns()
  const { data, isPending } = useGetWorkersQuery()
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    position: "",
    status_working: ""
  })

  const handleChangeFilters = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  if (isPending || !data) {
    return (
      <div className={s.wrapper}>
        <Spinner />
      </div>
    )
  }

  const statusWorkingOptions = [
    {label: "Ishda", value: "working"},
    {label: "Ishda Emas", value: "not_working"},
  ]

  return (
    <SearchableTable
      createPath={RouterPaths.workers.create}
      title="Ishchilar ro'yxati"
      data={data}
      columns={columns}
      filters={filters}
      sorting={[{ id: 'age', desc: true }]}
      inputs={[
        <RInput
          value={filters.id}
          key='id'
          placeholder="ID ni kiriting!"
          label="ID orqali qidirish"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFilters('id', e.target.value)}
        />,
        <RInput
          value={filters.name}
          key='name'
          placeholder="Ismni kiriting!"
          label="Ism orqali qidirish"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFilters('name', e.target.value)}
        />,
        <RInput
          value={filters.position}
          key='position'
          placeholder="Lavozimni kiriting!"
          label="Lavozim orqali qidirish"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeFilters('position', e.target.value)}
        />,
        <RSelect
          key='status_working'
          label="Ish statusi orqali qidirish"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeFilters('status_working', e.target.value)}
          defaultOptionText="Hammasi"
          options={statusWorkingOptions}
        />
      ]}
    />
  )
}

export default WorkersPage