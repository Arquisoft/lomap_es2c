import React from 'react'
import Swal from 'sweetalert2';

export async function handleErrors(functionToExec: any, f: any) {
    try {
        return functionToExec();
    } catch (e: any) {
        Swal.fire({
            icon: 'error',
            title: "Error",
            text: "Error",
            confirmButtonColor: '#81c784',
        }).then((result) => {
            if (result.isConfirmed)
                f();
        });
    }
}
