export interface IWorker {
  id: string
  name: string
  lastName: string
  age: number
  position: string
  hours_to_work: string
  monthly_salary: number
  is_working: boolean
  monthly_worked_minutes: number
  qr_code_text: string
  // penalties: IPenalty[]
}
