import Swal from "sweetalert2";

const alert = {

    confirm: async ({
        title = "Are you sure?",
        text = "",
        confirmText = "Yes",
        cancelText = "Cancel",
        icon = "warning",
    }) => {
        const result = await Swal.fire({
            title,
            text,
            icon,

            showCancelButton: true,

            confirmButtonText: confirmText,
            cancelButtonText: cancelText,

            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#64748b",

            background: "#1e293b",
            color: "#fff",
        });

        return result.isConfirmed;
    },

};

export default alert;