let cuadrosMostrados = 0;
let cuadro1 = null;
let cuadro2 = null;
let primerColor = null;
let segundoColor = null;
let movimientos = 0;
let aciertos = 0;
let audio;
let cuadros = document.querySelectorAll(".cuadro");
let colores = [
  "rojo","rojo","violeta","violeta","naranja","naranja","azul","azul","blanco","blanco","verde","verde",
];
window.colores = colores.sort(() => {
  return Math.random() - 0.5;
});

window.onload = function() {
  cargarColores();
};

function cargarColores(){
  asignarColores();
}

function mostrarCuadros(id) {
  asignarColores();
  cuadrosMostrados++;
  if (cuadrosMostrados == 1) {
    cuadro1 = document.getElementById(id);
    primerColor = colores[Number(id)];
    actualizarColorCuadros(cuadro1, primerColor);
    cuadro1.disabled = true;
    reproducirAudioClick();
  } else if (cuadrosMostrados == 2) {
    cuadro2 = document.getElementById(id);
    segundoColor = colores[Number(id)];
    actualizarColorCuadros(cuadro2, segundoColor);
    cuadro2.disabled = true;
    movimientos++;
    cargarMovimientos();
    if (primerColor == segundoColor) {
      cuadrosMostrados = 0;
      aciertos++;
      cargarAciertos();
      reproducirAudioAcierto();
      if (aciertos === 6) {
        mostrarMensajeDeGanador();
      }
    } else {
      setTimeout(() => {
        repetirTurnos();
      }, 200);
    }
  }
}

function asignarColores() {
  for (let i = 0; i < cuadros.length; i++) {
    cuadros[i].classList.add(colores[i]);
  }
}
function actualizarColorCuadros(cuadro,) {
  cuadro.classList.toggle("inicio-juego");
  cuadro.classList.toggle("cuadro-marcado");
}
function mostrarMensajeDeGanador() {
  const mensajeAlerta = document.createElement("div");
  mensajeAlerta.classList.add("alert-box");
  mensajeAlerta.innerHTML = "<h2>Fin del juego!</h2><p>🥇🥇🏆🏆</p>";
  document.body.appendChild(mensajeAlerta);
  reproducirAudioError();
}
function repetirTurnos() {
  actualizarColorCuadros(cuadro1, primerColor);
  actualizarColorCuadros(cuadro2, segundoColor);
  cuadro1.disabled = false;
  cuadro2.disabled = false;
  cuadrosMostrados = 0;
  audio = new Audio("./audio/error.mp3");
  audio.play();
}
function cargarAciertos() {
  let cargarAciertos = document.getElementById("cantidad-de-aciertos");
  let cargarAciertosMovil = document.getElementById(
    "cantidad-de-aciertos-movil"
  );
  cargarAciertos.innerHTML = aciertos;
  cargarAciertosMovil.innerHTML = aciertos;
}
function cargarMovimientos() {
  let cargarMovimientos = document.getElementById("cantidad-de-movimientos");
  let cargarMovimientosMovil = document.getElementById(
    "cantidad-de-movimientos-movil"
  );
  cargarMovimientos.innerHTML = movimientos;
  cargarMovimientosMovil.innerHTML = movimientos;
}
function reproducirAudioClick() {
  audio = new Audio("./audio/cuadro-seleccionado.mp3");
  audio.play();
}
function reproducirAudioAcierto() {
  audio = new Audio("./audio/acierto.mp3");
  audio.play();
}
function reproducirAudioError() {
  audio = new Audio("./audio/ganaste.mp3");
  audio.play();
}
