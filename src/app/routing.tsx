import { createBrowserRouter, Navigate } from "react-router-dom";

import { LayoutPage, PrivatePage } from "~pages/layouts";
import { HistoriesPage, HistoryCreatePage } from "~pages/histories";
import { PenaltiesPage, PenaltyCreatePage } from "~pages/penalties";
import { UpdateWorkerPage, WorkerCreatePage, WorkerPage, WorkersPage } from "~pages/workers";
import { BonusCreatePage, BonusesPage } from "~pages/bonuses";
import { RouterPaths } from "~shared/constants/router-path";
import { LoginPage } from "~pages/login";

export const router = createBrowserRouter([
    {
        element: <PrivatePage />,
        children: [
            {
                element: <LayoutPage />,
                children: [
                    { path: RouterPaths.workers.root, element: <WorkersPage /> },
                    { path: RouterPaths.workers.worker, element: <WorkerPage /> },
                    { path: RouterPaths.workers.create, element: <WorkerCreatePage /> },
                    { path: RouterPaths.workers.update, element: <UpdateWorkerPage /> },
                    { path: RouterPaths.histories.root, element: <HistoriesPage /> },
                    { path: RouterPaths.histories.create, element: <HistoryCreatePage /> },
                    { path: RouterPaths.penalties.root, element: <PenaltiesPage /> },
                    { path: RouterPaths.penalties.create, element: <PenaltyCreatePage /> },
                    { path: RouterPaths.bonuses.root, element: <BonusesPage /> },
                    { path: RouterPaths.bonuses.create, element: <BonusCreatePage /> },
                ]
            }
        ]
    },
    {
        path: RouterPaths.auth.login,
        element: <LoginPage />,
    },
    {
        path: RouterPaths.root,
        element: <Navigate to={RouterPaths.workers.root} />
    },
    {
        path: "*",
        element: <Navigate to={RouterPaths.auth.login} />
    }
])