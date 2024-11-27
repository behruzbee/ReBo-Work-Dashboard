import { SearchableTable } from "~widgets/searchable-table"
import { workers } from "~entities/worker"

const WorkersPage = () => {
  return (
    <SearchableTable title="Ishchilar ro'yxati" data={workers}/>
  )
}

export default WorkersPage