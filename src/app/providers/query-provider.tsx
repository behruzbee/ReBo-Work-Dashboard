import { QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"

import { queryClient } from "~shared/libs/query-clients"

const QueryProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider