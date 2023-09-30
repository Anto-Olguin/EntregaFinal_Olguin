// Inicializa puntuacion
let puntaje = parseInt(localStorage.getItem("puntaje")) || 0;
const opciones = ["piedra", "papel", "tijera"];
const botones = document.querySelectorAll(".container button");

botones.forEach((button) => {
    button.addEventListener("click", () => {
        partida(button.id);
    });
});

let medallas = [];

fetch('./rewards.json')
.then(response => response.json())
.then(data => {
    console.log(data);
    medallas = data.regalos;
});

function eleccionPc() {
    const randomIndex = Math.floor(Math.random() * opciones.length)
    return opciones[randomIndex]
}

function ronda(eleccionJugador, eleccionCompu) {
    if (eleccionJugador === eleccionCompu) {
        return "Empate."
    } else if (
        (eleccionJugador === "piedra" && eleccionCompu === "tijera") ||
        (eleccionJugador === "papel" && eleccionCompu === "piedra") ||
        (eleccionJugador === "tijera" && eleccionCompu === "papel")
    ) {
        return "¡Ganaste!"
    } else {
        return "¡Perdiste!"
    }
}

function actualizarPuntaje(puntos) {
    puntaje += puntos;
    localStorage.setItem("puntaje", puntaje);

    // Muestra el puntaje
    const puntajeMostrado = document.querySelector(".puntaje");
    puntajeMostrado.textContent = `Puntaje: ${puntaje}`;
}

function partida(eleccionJugador) {
    const eleccionCompu = eleccionPc()
    const resultado = ronda(eleccionJugador, eleccionCompu)
    const resultadoMostrado = document.querySelector(".resultado p")
    resultadoMostrado.textContent = `Elegiste ${eleccionJugador}. La computadora eligió ${eleccionCompu}. ${resultado}`

    if (resultado === "¡Ganaste!") {

        // Sumo 3 puntos
        actualizarPuntaje(3)

        Toastify({
            text: "¡Sumaste 3 puntos!",
            className: "info",
            style: {
                background: "#98CD3C",
            },
        }).showToast()
    }
}

actualizarPuntaje(0);

const modal = document.getElementById('shopModal');
const abrirModalBtn = document.getElementById('shop');
const cerrarModalBtn = document.getElementById('cerrarModal');
const medallasLista = document.getElementById('medallasLista');


abrirModalBtn.addEventListener('click', abrirModal);
cerrarModalBtn.addEventListener('click', cerrarModal);

function abrirModal() {
    modal.style.display = 'block';
    cargarLista();
}

function cerrarModal() {
modal.style.display = 'none';
}

function cargarLista() {
    medallasLista.innerHTML = '';

    medallas.forEach((item) => {
        const divClassMedalla = document.createElement('div');
        divClassMedalla.classList.add('medalla');

        const imgMedalla = document.createElement('img');
        imgMedalla.src = item.imagen;

        const pMedalla = document.createElement('p');
        pMedalla.innerText = `${item.descripcion} \n ${item.puntos} puntos`;

        const btnComprar = document.createElement('button');
        btnComprar.id = `medalla-${item.id}`;
        btnComprar.classList.add('btn-comprar');
        btnComprar.innerText = 'Comprar regalo';
        btnComprar.addEventListener('click', () => comprarMedalla(item.id));

        divClassMedalla.appendChild(imgMedalla);
        divClassMedalla.appendChild(pMedalla);
        divClassMedalla.appendChild(btnComprar);

        medallasLista.appendChild(divClassMedalla);
    });
}

function comprarMedalla(numeroDeMedalla) {
    const medallaElementoHtml = document.getElementById(`medalla-${numeroDeMedalla}`);
    let medalla = medallas.find(medalla => medalla.id == numeroDeMedalla);

    if (puntaje >= medalla.puntos && !medalla.comprada) {
        actualizarPuntaje(-medalla.puntos);
        medallaElementoHtml.innerText = 'Regalo comprado!';
        medalla.comprada = true;
    }
}