import { toast, cssTransition } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Zoom = cssTransition({
    enter: "zoomIn",
    exit: "zoomOut",
    duration: [20, 10]
});

let toastId = "ld-toast";

let toastDefaultConfiguration = {
    autoClose: 3000,
    draggable: false,
    closeButton: false,
    hideProgressBar: true,
    pauseOnFocusLoss: true,
    transition: Zoom,
    position: 'top-center',
    toastId: toastId,
    className: "ToastInfo"
};

function ToastUtil() {
    const showLoader = (cmp, config) => {
        const loaderToastId = "AppLoader";
        const toastConfig = {
            ...toastDefaultConfiguration,
            toastId: loaderToastId,
            ...config
        };
        if (!toast.isActive(loaderToastId)) {
            toast(cmp, toastConfig);
        } else {
            toast.update(loaderToastId, toastConfig);
        }
    }

    const done = (idToDismiss = toastId) => {
        toast.dismiss(idToDismiss)
    }

    return [showLoader, done]
}

export default ToastUtil
