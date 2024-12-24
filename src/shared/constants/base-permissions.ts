const baseWorkerPermission = {
  readWorkers: 3,
  readWorker: 1,
  delete: 1,
  update: 1,
  create: 1
}

const baseHistoryPermission = {
  readHistories: 3,
  delete: 2,
  create: 2
}

const baseBonusPermission = {
  read: 3,
  delete: 2,
  create: 2
}

const basePenaltyPermission = {
  read: 3,
  delete: 2,
  create: 2
}

const baseUsersPermission =  {
  read: 1,
  delete: 1,
  create: 1
}

export const basePermissions = {
  worker: baseWorkerPermission,
  history: baseHistoryPermission,
  bonus: baseBonusPermission,
  penalty: basePenaltyPermission,
  users: baseUsersPermission
}

export const permissionStatus = ['super-admin', 'direktor', 'menejer', 'Xodim']