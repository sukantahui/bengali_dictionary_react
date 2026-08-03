import toast from "react-hot-toast";

const defaultOptions = {
    duration: 3000,
};

const notify = {

    success(message) {
        toast.success(message, defaultOptions);
    },

    error(message) {
        toast.error(message, defaultOptions);
    },

    loading(message) {
        return toast.loading(message);
    },

    dismiss(id) {
        toast.dismiss(id);
    },

};

export default notify;