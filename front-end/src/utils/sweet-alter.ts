import Swal, { SweetAlertIcon } from "sweetalert2";

export const SwalAlert = (title: string, text: string, icon: SweetAlertIcon) => {
    return Swal.fire({
        title,
        text,
        icon
    })
}