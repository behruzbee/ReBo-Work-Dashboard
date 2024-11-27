import { IWorker } from './types/worker'

export { type IWorker } from './types/worker'
export { workerSchema } from './schema'

export const workers: IWorker[] = [
  {
    id: 'asdsdasd',
    age: 23,
    firstName: 'Behruz',
    name: 'Baxtiyorov',
    position: 'IT & MARKETOLOG',
    hours_to_work: '9h',
    is_working: false,
    monthly_salary: '30000000',
    monthly_worked_minutes: 410000,
    qr_code_text: 'ssd'
  },
  {
    id: 'asd32423dsc',
    age: 21,
    firstName: 'Behruz',
    name: 'Baxtiyorov',
    position: 'PROJECT MANAGER',
    hours_to_work: '9h',
    is_working: true,
    monthly_salary: '30000000',
    monthly_worked_minutes: 410000,
    qr_code_text: 'ssd'
  }
]
