
let modalConfiguracion = document.getElementById("modal-configuracion");
let btnConfigOff = document.getElementById('btn-config-off');
let btnCerrarConfig = document.getElementById('btn-cerrar-configuracion');
let btnGuardarConfig = document.getElementById('btn-guardar-configuracion');
let rango = document.getElementById('inputRate');



export function funcionesConfig() {

    btnConfigOff.addEventListener("click", function () {
        modalConfiguracion.showModal();

    });

    btnCerrarConfig.addEventListener("click", function () {
        modalConfiguracion.close();
        document.getElementById('btncerrarOffcanvas').click();
    });

    btnGuardarConfig.addEventListener("click", function () {
        modalConfiguracion.close();
        document.getElementById('btncerrarOffcanvas').click();
    });

    rango.addEventListener("change", () => {
        document.getElementById('range-value').innerText = 'Velocidad de reproducción: ' + rango.value;
    })
}







