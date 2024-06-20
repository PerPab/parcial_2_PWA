
const ISOlangs = []
const inputRate = document.getElementById('inputRate')
const selectVoice = document.getElementById('selectVoice')
const synthesis = speechSynthesis //usa la api speechSynthesis
const utterance = new SpeechSynthesisUtterance()

function obtenerVoces() {
    ISOlangs.push(...synthesis.getVoices())
    ISOlangs.sort((a, b) => {
        if (a.lang > b.lang) return 1
        if (a.lang < b.lang) return -1
        return 0
    })
    console.table(ISOlangs)
}

export function leerNota(nota) {
    let NotaAreproducir = ''
    NotaAreproducir = nota;
    if (nota == '' || nota == undefined || nota == null) {
        NotaAreproducir = "No hay nada que leer, Debes especificar un texto válido."
    }
    utterance.text = NotaAreproducir;
    utterance.lang = selectVoice.value //lenguaje, lee el atributo value de elemento html selectVoice
    utterance.pitch = 1 // tono de la voz, velocidad
    utterance.rate = inputRate.value  // velocidad del texto/discurso tono

    utterance.addEventListener("start", () => console.log("Texto en reproducción."))
    utterance.addEventListener("end", () => console.log("Finalizó la reproducción del texto."))
    synthesis.speak(utterance)
}

