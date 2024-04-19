import { Obj3D } from './Obj3D.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './point3D.js';

// Declaración de variables globales
let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

// Obtener el elemento canvas y el contexto 2D
canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvHLines;
let obj: Obj3D;
let ang: number = 0;

// Función para leer un archivo
function leerArchivo(e: any) {
  var archivo = e.target.files[0];
  console.log(archivo);
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
    obj = new Obj3D();
    if (obj.read(contenido)) {
      cv = new CvHLines(graphics, canvas);
      cv.setObj(obj);
      cv.paint();
    }
  };
  lector.readAsText(archivo);
}

// Función para mostrar el contenido del archivo
function mostrarContenido(contenido: any) {
  var elemento = document.getElementById('contenido-archivo');
  elemento.innerHTML = contenido;
}

// Función para manejar el cambio de vista
function vp(dTheta: number, dPhi: number, fRho: number): void {
  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
      alert('datos no validos');
  } else
    alert('aun no has leido un archivo');
}

// Funciones para manejar el movimiento de la vista
function eyeDownFunc() {
  vp(0, 0.1, 1);
}

function eyeUpFunc() {
  vp(0, -0.1, 1);
}

function eyeLeftFunc() {
  vp(-0.1, 0, 1);
}

function eyeRightFunc() {
  vp(0.1, 0, 1);
}

// Funciones para manejar el zoom
function incrDistFunc() {
  vp(0, 0, 2);
}

function decrDistFunc() {
  vp(0, 0, 0.5);
}

// Funciones para rotar una pieza específica hacia la derecha/arriba
function pza1DerFunc() {
  let af = 10;
  var tr = 0.1;
  //funcion de rotar
  Rota3D.initRotate(obj.w[800], obj.w[801], af * Math.PI / 180);

  for (let i = 1; i <= 52; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  for (let i = 58; i <= 134; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
 //funcion de alejar
  for (var i = 1; i <= 52; i++) {
    obj.w[i].z = obj.w[i].z + tr;
  }
  for (var i = 58; i <= 134; i++) {
    obj.w[i].z = obj.w[i].z + tr;
  }
  for (var i = 800; i <= 801; i++) {
    obj.w[i].z = obj.w[i].z + tr;
  }

  cv.setObj(obj);
  cv.paint();
}
// Funciones para rotar una pieza compuesta hacia la izquierda/abajo
function pza1IzqFunc() {
  let af = -10;
  var tr = -0.1;
  Rota3D.initRotate(obj.w[800], obj.w[801], af * Math.PI / 180);
//rotar
  for (let i = 1; i <= 52; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  for (let i = 58; i <= 134; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  //alejar
  for (var i = 1; i <= 52; i++) {
    obj.w[i].z = obj.w[i].z + tr;
  }
  for (var i = 58; i <= 134; i++) {
    obj.w[i].z = obj.w[i].z + tr;
  }
  for (var i = 800; i <= 801; i++) {
    obj.w[i].z = obj.w[i].z + tr;
  }

  cv.setObj(obj);
  cv.paint();
}


// Función para rotar una pieza específica
function Patitafunc() {
  let af = 20;
  Rota3D.initRotate(obj.w[101], obj.w[102], af * Math.PI / 180);
  for (let i = 1; i <= 8; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }

  cv.setObj(obj);
  cv.paint();
}

let rotationInProgress = false; // Variable de control para la rotación

// Función para iniciar o detener la rotación de todo el objeto
function rotarTodo() {
  // Comprobar si la rotación está en progreso
  if (rotationInProgress) {
    // Si la rotación está en progreso, detenerla
    rotationInProgress = false;
  } else {
    // Si la rotación no está en progreso, iniciarla
    rotationInProgress = true;
    // Iniciar la rotación
    rotateTodo();
  }
}

function rotateTodo() {
  // Realizar la rotación del objeto
  let af = 1;
  Rota3D.initRotate(obj.w[902], obj.w[903], af * Math.PI / 180);

  for (let i = 1; i <= 52; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  Rota3D.initRotate(obj.w[902], obj.w[903], af * Math.PI / 180);

  for (let i = 58; i <= 134; i++) {
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  cv.setObj(obj);
  cv.paint();

  // Comprobar si la rotación aún está en progreso
  if (rotationInProgress) {
    // Si la rotación está en progreso, continuar la rotación en el siguiente frame
    requestAnimationFrame(rotateTodo);
  }
}
let anima; //variable para el intervalo
// Función para animar la rotación de la pieza 1 hacia la derecha
function animation() {
  pza1DerFunc();
}
// Función para iniciar la animación de rotación hacia la derecha
function iniciarAnimacion() {
  anima = setInterval(animation, 100);
}


// Función para animar la rotación de la pieza 1 hacia la izquierda
function animationR() {
  pza1IzqFunc();
}
// Función para iniciar la animación de rotación hacia la izquierda
function iniciarAnimacionR() {
  anima = setInterval(animationR, 100);
}


// Función para detener la animación
function detenerAA() {
  clearInterval(anima);
}

// Función de inicialización del programa
function init() {
  obj = new Obj3D();
  cv = new CvHLines(graphics, canvas);

  // Asignar eventos a los botones
  document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
  document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
  document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
  document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
  document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
  document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);
  document.getElementById('pza12Izq').addEventListener('click', iniciarAnimacionR, false);
  document.getElementById('pza12Der').addEventListener('click', detenerAA, false);
  document.getElementById('Patita').addEventListener('click', iniciarAnimacion, false);
  document.getElementById('startRotation').addEventListener('click', rotarTodo, false);

  // Asignar evento al input de carga de archivo
  document.getElementById('file-input').addEventListener('change', leerArchivo, false);
}

init();

// Variables para el control de la interacción del mouse en el canvas
let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3,
  phi = 1.3,
  SensibilidadX = 0.02,
  SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix = evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    let x = SensibilidadX * (Pfx - Pix);
    let y = SensibilidadY * (Pfy - Piy);
    Pix = Pfx;
    Piy = Pfy;
    vp(x, y, 1);
  }
}

function off(evento: any) {
  flag = false;
}

// Asignar eventos al canvas para la interacción del mouse
canvas.addEventListener('mousedown', handleMouse, false);
canvas.addEventListener('mousemove', makeVizualization, false);
canvas.addEventListener('mouseup', off, false);
canvas.addEventListener('mouseout', off, false);
