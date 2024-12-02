import QueryProvider from './query-provider'
import RouterProvider from './router-provider'
import ToastifyProvider from './toastify-provider'

const Providers = () => {
    return (
        <QueryProvider>
            <RouterProvider />
            <ToastifyProvider />
        </QueryProvider>
    )
}

export default Providers