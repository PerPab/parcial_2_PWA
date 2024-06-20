import { URLapi, listaTareas, conexionAPI } from "./conexion.js";
import { guardarTarea } from "./editarNota.js"


let modalEditar = document.getElementById("modal-editar");
let btnCrearNav = document.getElementById("btn-nueva-nav");
let btnCrearOff = document.getElementById("btn-nueva-off");
let btnCerrarModal = document.getElementById("btn-cerrar");
let modalCrear = document.getElementById("modal-crear-nueva");
let btnGuardarNota = document.getElementById("btn-guardar");
let btnCerrarModalEditar = document.getElementById('btn-cerrar-meditar');
let btnGuardarModalEditar = document.getElementById('btn-guardar-meditar');
let offCanvas = document.getElementById('offcanvasScrollingCrearTarea');


export function botonesModal() {

    btnCrearNav.addEventListener("click", function () {
        modalCrear.showModal();
        document.getElementById("input-titulo").blur()
    });

    btnCrearOff.addEventListener("click", function () {
        modalCrear.showModal();
        document.getElementById("input-titulo").blur()

    });

    btnCerrarModal.addEventListener("click", function () {
        modalCrear.close();
        document.getElementById('btncerrarOffcanvas').click();
    });

    btnCerrarModalEditar.addEventListener("click", function () {
        modalEditar.close();
    });

    btnGuardarNota.addEventListener("click", function () { // envia una nota nueva

        if (document.getElementById("input-titulo").value == "" || document.getElementById("input-descripcion").value == "") {
            //document.getElementById("btn-cerrar").click();

            Swal.fire({
                position: "center",
                target: document.getElementById('modal-crear-nueva'),
                icon: "warning",
                title: "Debes completar los campos!",
                showConfirmButton: false,
                timer: 2500

            });

        } else {
            EnviarTarea();
        }
    })

    document.getElementById('btncerrarOffcanvas').click();
};



btnGuardarModalEditar.addEventListener("click", function () { // guarda una nota editada
    guardarTarea();
    document.getElementById('btncerrarOffcanvas').click();
    Swal.fire({
        position: "center",
        target: document.getElementById('nota'),
        icon: "success",
        title: "Cambios guardados!",
        showConfirmButton: false,
        timer: 1500

    });
});


export function LimpiarMain() {
    let ListaTareasDom = document.getElementById('contenedorTareas');
    ListaTareasDom.innerHTML = '';
}

function CrearTarea() {
    let objeto = {
        id: "",
        fechacreacion: new Date().toLocaleString(),
        fechaconclucion: "",
        titulo: document.getElementById("input-titulo").value,
        descripcion: document.getElementById("input-descripcion").value,
        estado: "pendiente"
    }
    return objeto;
}

export function EnviarTarea() {
    let tarea = CrearTarea()
    const opciones = {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tarea)
    }
    fetch(URLapi, opciones)
        .then((response) => {
            if (response.status === 201) {
                LimpiarMain(); // se eliminan los child del la lista de cards
                listaTareas.length = 0; // se limpia la lista de elementos
                modalCrear.close();
                document.getElementById('btncerrarOffcanvas').click();
                conexionAPI(); // vuelve a renderizar la lista en el main con los nuevos elementos
                return response.json()
            }
        })
}


