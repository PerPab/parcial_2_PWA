
import { listaTareas, conexionAPI } from "./conexion.js";
import { LimpiarMain } from "./crearNota.js";

let urlEdit = 'https://662e6c70a7dda1fa378ceb88.mockapi.io/api/v1/fotos/tareas/';

export function abrirModalEditar(nota) {
    let modalEditar = document.getElementById("modal-editar");
    modalEditar.showModal();
    document.getElementById('input-titulo-editar').value = nota.titulo;
    document.getElementById('input-descripcion-editar').value = nota.descripcion;
    document.getElementById('fecha-creacion-editar').value = nota.fechacreacion;
    document.getElementById('id-tarea-editar').value = nota.id;

}


export function editarTarea() {
    let objeto = {
        id: document.getElementById("id-tarea-editar").value,
        fechacreacion: document.getElementById("fecha-creacion-editar").value,
        fechaconclucion: new Date().toLocaleString(),
        titulo: document.getElementById("input-titulo-editar").value,
        descripcion: document.getElementById("input-descripcion-editar").value,
        estado: document.getElementById("estados").value
    }
    return objeto;
}

export function guardarTarea() {
    let tarea = editarTarea()
    const opciones = {
        method: 'PUT',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tarea)
    }
    fetch(urlEdit + tarea.id, opciones)
        .then((response) => {
            if (response.status === 200) {
                LimpiarMain(); // se eliminan los child del la lista de cards
                listaTareas.length = 0; // se limpia la lista de elementos
                conexionAPI(); // vuelve a renderizar la lista en el main con los nuevos elementos
                return response.json()
            }
        })

    document.getElementById("modal-editar").close();
    document.getElementById("input-titulo-editar").innerText = '';
    document.getElementById("input-descripcion-editar").innerText = '';

}
