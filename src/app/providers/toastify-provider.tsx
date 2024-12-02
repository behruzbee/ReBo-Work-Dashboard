
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToastifyProvider = () => {
    return (
        <ToastContainer position='bottom-right' autoClose={3000} />
    )
}

export default ToastifyProvider