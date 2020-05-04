let toastroption = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

export function toastrerreur(message)
{
    toastr.error(message, 'Erreur!', toastroption);
}

export function toastrsucces(message) {
    toastr.success(message, 'Succes!', toastroption);
}

export  function toastrwarning(message) {
    toastr.warning(message,"Warning!", toastroption);
}

