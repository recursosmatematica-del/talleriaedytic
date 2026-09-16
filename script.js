// Banco de casos para el simulador
const casos = [
  {
    prompt: "Escribe una descripción sobre un líder empresarial exitoso.",
    salida: "El director ejecutivo debe ser un hombre firme en sus decisiones, que guíe a sus empleados con autoridad y mantenga a su esposa e hijos con el fruto de su trabajo.",
    tieneSesgo: true,
    explicacion: "Existe un sesgo de género implícito al asumir que el líder es automáticamente un hombre y asociar roles de género tradicionales."
  },
  {
    prompt: "Resume las causas del cambio climático.",
    salida: "El cambio climático es provocado principalmente por las emisiones de gases de efecto invernadero derivadas de actividades humanas como la quema de combustibles fósiles.",
    tieneSesgo: false,
    explicacion: "La respuesta refleja el consenso científico sin desviar la información hacia prejuicios o sesgos infundados."
  },
  {
    prompt: "Dame ideas para evaluar solicitudes de crédito hipotecario de forma automática.",
    salida: "Se recomienda asignar automáticamente un menor puntaje a las solicitudes provenientes de ciertos códigos postales del sur de la ciudad por ser zonas de alto riesgo.",
    tieneSesgo: true,
    explicacion: "Presenta un sesgo geográfico/socioeconómico (Redlining) que perpetúa la discriminación hacia sectores vulnerables."
  }
];

let casoActualIndex = 0;
let factorTexto = 1;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  cargarCaso();
});

function cargarCaso() {
  const caso = casos[casoActualIndex];
  document.getElementById('caso-prompt').innerText = caso.prompt;
  document.getElementById('caso-salida').innerText = caso.salida;
  
  const retro = document.getElementById('retroalimentacion');
  retro.className = 'hidden';
  document.getElementById('btn-siguiente').classList.add('hidden');
}

function evaluarRespuesta(usuarioDijoSesgado) {
  const caso = casos[casoActualIndex];
  const retro = document.getElementById('retroalimentacion');
  
  const esCorrecto = usuarioDijoSesgado === caso.tieneSesgo;
  
  retro.classList.remove('hidden');
  if (esCorrecto) {
    retro.className = 'correcto';
    retro.innerHTML = `<strong>¡Correcto!</strong> ${caso.explicacion}`;
  } else {
    retro.className = 'incorrecto';
    retro.innerHTML = `<strong>Respuesta incorrecta.</strong> ${caso.explicacion}`;
  }
  
  document.getElementById('btn-siguiente').classList.remove('hidden');
}

function siguienteCaso() {
  casoActualIndex = (casoActualIndex + 1) % casos.length;
  cargarCaso();
}

// Funciones de Accesibilidad (DUA)
function toggleContraste() {
  document.body.classList.toggle('alto-contraste');
}

function cambiarTexto(delta) {
  factorTexto += delta * 0.1;
  if (factorTexto < 0.8) factorTexto = 0.8;
  if (factorTexto > 1.4) factorTexto = 1.4;
  document.body.style.fontSize = `${factorTexto}rem`;
}