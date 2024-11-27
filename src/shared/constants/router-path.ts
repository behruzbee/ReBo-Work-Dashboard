export const WorkersPaths = {
  root: '/workers',
  create: `/workers/create`,
  update: `/workers/update/:id`
}
export const PenaltiesPaths = {
  root: '/penalties',
  create: `/penalties/create`,
  update: `/penalties/update/:id`
}
export const HistoriesPaths = {
  root: '/histories',
  create: `/histories/create`
}

export const RouterPaths = {
  root: '/',
  workers: WorkersPaths,
  penalties: PenaltiesPaths,
  histories: HistoriesPaths
}
