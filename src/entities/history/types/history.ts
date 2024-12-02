export interface IHistory {
  id: string
  worker_id: string
  work_place_name: string
  scan_time: string
  status_type: string
}

export interface ICreateHistory extends Omit<IHistory, 'id'> {}
