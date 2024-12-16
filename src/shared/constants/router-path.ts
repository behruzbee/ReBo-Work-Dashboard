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
export const BonusesPaths = {
  root: '/bonuses',
  create: '/bonuses/create',
}
export const HistoriesPaths = {
  root: '/histories',
  create: '/histories/create'
}

export const AuthPaths = {
  login: "/login",
}

export const RouterPaths = {
  root: '/',
  workers: WorkersPaths,
  penalties: PenaltiesPaths,
  bonuses: BonusesPaths,
  histories: HistoriesPaths,
  auth: AuthPaths
}
