import Swal from "sweetalert2";

export function temporalSuccessMessage(text: String) {
    Swal.fire({
        position: 'top',
        title: text,
        showConfirmButton: false,
        timer: 3500,
        width: '98.7vw',
        backdrop: false,
        customClass: {
            popup: 'swal-popup',
            title: 'swal-text',
        },
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        willOpen: function () {
            const swalContainer = Swal.getPopup();
            swalContainer.addEventListener('mouseenter', () => {
                Swal.stopTimer();
            });
            swalContainer.addEventListener('mouseleave', () => {
                Swal.resumeTimer();
            });
        }
    })
}