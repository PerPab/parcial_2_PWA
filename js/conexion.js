import { pantallaInicio, RenderizaTarea } from "./renderizado.js";

//export const URLapi = "https://662e6c70a7dda1fa378ceb88.mockapi.io/api/v1/fotos/tareas?sortBy=fechacreacion&order=desc";
export const URLapi = "https://662e6c70a7dda1fa378ceb88.mockapi.io/api/v1/fotos/tareas?sortBy=fechacreacion&order=desc";
export let listaTareas = [];

export function conexionAPI() {
    fetch(URLapi)
        .then((response) => response.json())
        .then((data) => listaTareas.push(...data))
        .then(() => {
            if (listaTareas.length > 0) {
                listaTareas.sort((a, b) => { // ordena la lista por el estado
                    const estadosFinales = ["completada", "cancelada"];
                    if (estadosFinales.includes(a.estado) && !estadosFinales.includes(b.estado)) {
                        return 1;
                    }
                    if (!estadosFinales.includes(a.estado) && estadosFinales.includes(b.estado)) {
                        return -1;
                    }
                    return 0;
                });

                RenderizaTarea();
                console.log('Conexion exitosa')
            } else {

                pantallaInicio();
                Swal.fire({
                    position: "center",
                    target: document.getElementById('contenedorTareas'),
                    icon: "info",
                    title: "No hay tareas en la lista. Prueba crear una!",


                });
            }
        })


}

