import { createBrowserRouter, Navigate } from "react-router-dom";

import { LayoutPage } from "~pages/layouts";
import { HistoriesPage, HistoryCreatePage } from "~pages/histories";
import { PenaltiesPage, PenaltyCreatePage } from "~pages/penalties";
import { UpdateWorkerPage, WorkerCreatePage, WorkersPage } from "~pages/workers";
import { RouterPaths } from "~shared/constants/router-path";

export const router = createBrowserRouter([
    {
        element: <LayoutPage />,
        children: [
            { path: RouterPaths.workers.root, element: <WorkersPage /> },
            { path: RouterPaths.workers.create, element: <WorkerCreatePage /> },
            { path: RouterPaths.workers.update, element: <UpdateWorkerPage /> },
            { path: RouterPaths.histories.root, element: <HistoriesPage /> },
            { path: RouterPaths.histories.create, element: <HistoryCreatePage /> },
            { path: RouterPaths.penalties.root, element: <PenaltiesPage /> },
            { path: RouterPaths.penalties.create, element: <PenaltyCreatePage /> },
        ]
    },
    {
        path: RouterPaths.root,
        element: <Navigate to={RouterPaths.workers.root} />
    }
])