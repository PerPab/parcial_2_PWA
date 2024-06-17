import { listaTareas } from "./conexion.js";
import { leerNota } from "./lectura.js";
import { abrirModalEditar } from "./editarNota.js";



export function RenderizaTarea() {
    let contenedorTareas = document.getElementById('contenedorTareas');
    listaTareas.forEach((tarea) => {
        if (contenedorTareas != null) {
            let div = document.createElement('div');
            div.classList.add('container-fluid', 'contenedor-cards')
            div.innerHTML = CrearCard(tarea);
            contenedorTareas.append(div);
            document.getElementById('btn-play-' + tarea.id).addEventListener('click', function () {
                leerNota(tarea.descripcion);
            });
            document.getElementById('btn-editar-' + tarea.id).addEventListener('click', function () {
                abrirModalEditar(tarea);
            });
            if (tarea.estado == 'completada' || tarea.estado == 'cancelada') {
                document.getElementById('btn-play-' + tarea.id).classList.add('ocultar');
                document.getElementById('btn-editar-' + tarea.id).classList.add('ocultar');
            }
        }
    })
}

export function pantallaInicio() {
    let plantilla = `
    <div class="pantalla-inicio">
    <h4 class="text-center">No hay Tareas para mostrar</h4>
    <h6 class="text-center">(Prueba crear una nueva)</h6>
    <img>
    </div>
    
    `
    document.getElementById('contenedorTareas').innerHTML = plantilla;
}

export function CrearCard(tarea) {
    let clase = 'clase-pendiente';
    if (tarea.estado == 'completada') {
        clase = 'clase-completada'
    } else if (tarea.estado == 'cancelada') {
        clase = 'clase-cancelada'
    }
    let plantilla = `
    <div id="${tarea.id}" class="nota ${clase}">
        <div class="contenedor-titulo-fecha">
            <div class="titulo">
                <h5 class="m-2">${tarea.titulo}</h5>
            </div>
            <div id="fecha-creacion" class="fecha">
            <small><p class="texto-fecha p-0 m-2">${tarea.fechacreacion}</p></small>
            </div>
        </div>
        <div id="desc-tarea" class="descripcion-tarea hidden">
            <p class="p-0 m-0 hidden descripcion">${tarea.descripcion}</p>
        </div>
        <div class="contenedor-boton-play">
            <button id="btn-editar-${tarea.id}" class="p-0 btn-editar btn-play"><img class="m-0 p-0 img-btn" src="./img/edit_icon.png"></button>
            <button id="btn-play-${tarea.id}" class="p-0 btn-leer btn-play"><img class="m-0 p-0 img-btn" src="./img/play-icon.png"></button>
        </div>
    </div>
    `
    return plantilla;
}


