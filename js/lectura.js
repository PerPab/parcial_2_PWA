

/*export class Speakit extends SpeechSynthesis {
    static utteranceRate = 1.03
    static utterancePitch = 1.0
    static totalAvailableVoices = 0
    static totalVoices = []

    static #getAvailableVoices() {
        return new Promise(function (resolve, reject) {
            if ('speechSynthesis' in window) {
                let voices = speechSynthesis.getVoices()
                if (voices.length > 0) {
                    voices.sort((a, b) => a.lang.localeCompare(b.lang))
                    Speakit.totalAvailableVoices = voices.length
                    resolve(voices)
                } else {
                    speechSynthesis.onvoiceschanged = () => {
                        voices = speechSynthesis.getVoices()
                        voices.sort((a, b) => a.lang.localeCompare(b.lang))
                        Speakit.totalAvailableVoices = voices.length
                        resolve(voices)
                    }
                }
            } else {
                reject('SpeechSynthesis API is not available in this web browser.')
            }
        })
    }

    static async getVoices() {
        if (Speakit.totalVoices.length === 0) {
            Speakit.totalVoices = await this.#getAvailableVoices()
        }
        return Speakit.totalVoices
    }

    static readText(text, lang, nameOfVoice) {
        return new Promise(function (resolve, reject) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = lang || "es-MX"
            utterance.rate = Speakit.utteranceRate || 1
            utterance.pitch = Speakit.utterancePitch || 1
            if (nameOfVoice) {
                let voice = speechSynthesis.getVoices().find(v => v.name === nameOfVoice)
                voice ? utterance.voice = voice : console.error(`The selected voice '${nameOfVoice}' is not avialable.`)
            }
            utterance.onend = () => resolve()
            utterance.onerror = (error) => reject(error)
            speechSynthesis.speak(utterance)
        })
    }

    static isSpeaking() {
        return speechSynthesis.speaking
    }

    static isPaused() {
        return speechSynthesis.paused
    }

    static pauseSpeaking() {
        speechSynthesis.pause()
    }

    static resumeSpeaking() {
        speechSynthesis.resume()
    }

    static stopSpeaking() {
        try {
            Speakit.pauseSpeaking()
            speechSynthesis.cancel(e)
        } catch (error) {
            console.warn("Speaking cancelled by the App.")
            return
        }
    }

    static TTStest() {
        if (speechSynthesis) {
            return "🟢 Your web browser has supporting for Text-To-Speech."
        } else {
            return "🔴 Your web browser does not supports Text-To-Speech. Consider to use a Webkit or Blink (Chromium) based web browser."
        }
    }

    static about() {
        return `Copyright 2024-02-08: Fernando Omar Luna - @ mobile padawan.

        Send me an email to (ferproonline at gmail dot com) or DMme by Twitter/X (@ mobile padawan) just to tell me what kind of use you are giving to this class and/or just to 'say Hi!'.

        This library is free of use and modify, but, please, don't remove this method.`
    }

}*/

const ISOlangs = []

const inputRate = document.getElementById('inputRate')
const selectVoice = document.getElementById('selectVoice')
//const labelInputRate = document.getElementById('labelInputRate')

// const synthesis = window.speechSynthesis
const synthesis = speechSynthesis //usa la api speechSynthesis
const utterance = new SpeechSynthesisUtterance()

/*inputRate.addEventListener("change", () => {
    console.log(inputRate.value)
    labelInputRate.textContent = 'Velocidad de reproducción: ' + inputRate.value
})*/

/*function reproducirTexto() {
    utterance.text = textoAreproducir.value || "Debes especificar un texto válido." //el texto a reproducir
    utterance.lang = selectVoice.value //lenguaje, lee el atributo value de elemento html selectVoice
    utterance.pitch = 1 // tono de la voz, velocidad
    utterance.rate = inputRate.value  // velocidad del texto/discurso tono

    utterance.addEventListener("start", () => console.log("Texto en reproducción."))
    utterance.addEventListener("end", () => console.log("Finalizó la reproducción del texto."))
    synthesis.speak(utterance)
}*/

//btnSpeak.addEventListener("click", () => reproducirTexto())

function obtenerVoces() {
    ISOlangs.push(...synthesis.getVoices())
    ISOlangs.sort((a, b) => {
        if (a.lang > b.lang) return 1
        if (a.lang < b.lang) return -1
        return 0
    })
    console.table(ISOlangs)
}


/*export function leerNota(nota) {
    let NotaAreproducir = ''
    NotaAreproducir = nota;
    if (nota == '' || nota == undefined || nota == null) {
        NotaAreproducir = "No hay nada que leer, Debes especificar un texto válido."
    }
    Speakit.utterancePitch = 1
    Speakit.utteranceRate = 1
    Speakit.readText(NotaAreproducir, 'es-MX')
}*/


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

