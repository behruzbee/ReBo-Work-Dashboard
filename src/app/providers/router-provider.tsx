import { createBrowserRouter, Navigate, RouterProvider as Provider } from 'react-router-dom'

import { LayoutPage } from '~pages/layouts'
import { HistoriesPage } from '~pages/histories'
import { PenaltiesPage } from '~pages/penalties'
import { WorkerCreatePage, WorkersPage } from '~pages/workers'

import { RouterPaths } from '~shared/constants/router-path'

const router = createBrowserRouter([
    {
        element: <LayoutPage />,
        children: [
            { path: RouterPaths.workers.root, element: <WorkersPage /> },
            { path: RouterPaths.workers.create, element: <WorkerCreatePage /> },
            { path: RouterPaths.workers.update, element: <WorkerCreatePage /> },
            { path: RouterPaths.histories.root, element: <HistoriesPage /> },
            { path: RouterPaths.penalties.root, element: <PenaltiesPage /> },
        ]
    },
    {
        path: "/",
        element: <Navigate to={RouterPaths.workers.root} />
    }
])

const RouterProvider = () => {
    return (
        <Provider router={router} />
    )
}

export default RouterProvider