export const WorkersPaths = {
  root: '/workers',
  worker: '/worker/:id',
  create: '/workers/create',
  update: '/workers/update/:id'
}
export const PenaltiesPaths = {
  root: '/penalties',
  create: '/penalties/create',
}
export const HistoriesPaths = {
  root: '/histories',
  create: '/histories/create'
}

export const RouterPaths = {
  root: '/',
  workers: WorkersPaths,
  penalties: PenaltiesPaths,
  histories: HistoriesPaths
}
