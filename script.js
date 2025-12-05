"use strict";

// ==============================
//  MALLA CURRICULAR INTERACTIVA
// ==============================

// ----- Definición de la malla: semestres y ramos -----
const semestres = [
  {
    nombre: "Semestre 1",
    ramos: [
      { id: "intro-calculo", nombre: "Introducción al cálculo" },
      { id: "intro-algebra", nombre: "Introducción al álgebra" },
      { id: "intro-fisica", nombre: "Introducción a la Física clásica" },
      { id: "herr-compu", nombre: "Herramientas Computacionales" },
      { id: "desafios", nombre: "Desafíos" },
      { id: "biologia", nombre: "Biología" }
    ]
  },
  {
    nombre: "Semestre 2",
    ramos: [
      { id: "calculo-diferencial", nombre: "Cálculo Diferencial" },
      { id: "algebra-lineal", nombre: "Álgebra lineal" },
      { id: "moderna", nombre: "Moderna" },
      { id: "progra", nombre: "Progra" },
      { id: "proyectos", nombre: "Proyectos" }
    ]
  },
  {
    nombre: "Semestre 3",
    ramos: [
      { id: "cvv", nombre: "CVV" },
      { id: "edo", nombre: "EDO" },
      { id: "mecanica", nombre: "Mecánica" },
      { id: "metodos", nombre: "Métodos" },
      { id: "quimica", nombre: "Química" }
    ]
  },
  {
    nombre: "Semestre 4",
    ramos: [
      { id: "caa", nombre: "CAA" },
      { id: "economia", nombre: "Economía" },
      { id: "electromagnetismo", nombre: "Electromagnetismo" },
      { id: "termodinamica", nombre: "Termodinámica" },
      { id: "modulo", nombre: "Módulo" }
    ]
  },
  {
    nombre: "Semestre 5",
    ramos: [
      { id: "probabilidad", nombre: "Probabilidad" },
      { id: "quimica-mineralogica", nombre: "Química mineralógica" },
      { id: "geologia-ing", nombre: "Geología para ingenieros" },
      { id: "mineria-sustentabilidad", nombre: "Minería y Sustentabilidad" },
      { id: "mec-rocas-1", nombre: "Mecánica de rocas 1" }
    ]
  },
  {
    nombre: "Semestre 6",
    ramos: [
      { id: "optimizacion", nombre: "Optimización" },
      { id: "fisioquimica", nombre: "Fisioquímica" },
      { id: "intro-yacimientos", nombre: "Introducción a Yacimientos" },
      { id: "fenomenos", nombre: "Fenómenos" },
      { id: "mec-rocas-2", nombre: "Mecánica de rocas 2" }
    ]
  },
  {
    nombre: "Semestre 7",
    ramos: [
      { id: "evaluacion-proyectos", nombre: "Evaluación de proyectos" },
      { id: "metalurgia-extractiva", nombre: "Metalurgia extractiva" },
      {
        id: "analisis-geoestadistico",
        nombre: "Análisis estadístico y geoestadístico de datos"
      },
      {
        id: "fundamentos-tec-minera",
        nombre: "Fundamentos de tecnología minera"
      },
      {
        id: "proc-minerales-1",
        nombre: "Procesamiento de minerales 1"
      },
      {
        id: "practica-1",
        nombre: "Práctica profesional 1"
      }
    ]
  },
  {
    nombre: "Semestre 8",
    ramos: [
      {
        id: "economia-minerales",
        nombre: "Economía de minerales"
      },
      {
        id: "evaluacion-yacimientos",
        nombre: "Evaluación de yacimientos"
      },
      {
        id: "legislacion-minera",
        nombre: "Legislación minera"
      },
      {
        id: "medio-ambiente-comunidades",
        nombre: "Medio ambiente y comunidades"
      },
      {
        id: "proc-minerales-2",
        nombre: "Procesamiento de minerales 2"
      }
    ]
  },
  {
    nombre: "Semestre 9",
    ramos: [
      {
        id: "diseno-minas-sub",
        nombre: "Diseño y planificación de minas subterráneas"
      },
      {
        id: "diseno-minas-cielo",
        nombre: "Diseño y planificación de minas a cielo abierto"
      },
      {
        id: "gestion-operaciones",
        nombre: "Gestión de operaciones mineras"
      },
      {
        id: "seguridad-minera",
        nombre: "Seguridad minera"
      },
      {
        id: "aguas-relaves",
        nombre: "Aguas y relaves"
      },
      {
        id: "electivo-especialidad-1",
        nombre: "Electivo de especialidad"
      },
      {
        id: "practica-2",
        nombre: "Práctica profesional 2"
      }
    ]
  },
  {
    nombre: "Semestre 10",
    ramos: [
      {
        id: "introduccion-titulo",
        nombre: "Introducción al título de trabajo"
      },
      {
        id: "taller-proyecto-minero",
        nombre: "Taller de proyecto minero"
      },
      {
        id: "eval-gestion-proyectos-mineros",
        nombre: "Evaluación y gestión de proyectos mineros"
      },
      {
        id: "electivo-especialidad-2",
        nombre: "Electivo especialidad"
      },
      {
        id: "electivo-especialidad-3",
        nombre: "Electivo especialidad"
      }
    ]
  },
  {
    nombre: "Semestre 11",
    ramos: [
      {
        id: "trabajo-titulo",
        nombre: "Trabajo de título"
      }
    ]
  }
];

// ----- Requisitos de cada ramo -----
const requisitos = {
  "calculo-diferencial": ["intro-calculo"],
  "algebra-lineal": ["intro-algebra"],
  "moderna": ["intro-calculo", "intro-algebra", "intro-fisica"],
  "progra": ["herr-compu"],
  "proyectos": ["desafios"],

  "cvv": ["calculo-diferencial", "algebra-lineal"],
  "edo": ["calculo-diferencial", "algebra-lineal"],
  "mecanica": ["calculo-diferencial", "algebra-lineal", "moderna"],
  "metodos": ["calculo-diferencial", "moderna"],
  "quimica": ["moderna", "progra"],

  "caa": ["cvv", "edo"],
  "economia": ["cvv"],
  "electromagnetismo": ["cvv", "edo", "mecanica"],
  "termodinamica": ["quimica", "cvv", "mecanica"],
  "modulo": ["metodos", "proyectos"],

  "probabilidad": ["cvv"],
  "quimica-mineralogica": ["quimica"],
  "geologia-ing": ["calculo-diferencial", "modulo"],
  "mineria-sustentabilidad": ["modulo"],
  "mec-rocas-1": ["mecanica"],

  "optimizacion": ["caa"],
  "fisioquimica": ["termodinamica"],
  "intro-yacimientos": ["geologia-ing", "quimica-mineralogica"],
  "fenomenos": ["termodinamica"],
  "mec-rocas-2": ["mec-rocas-1", "geologia-ing"],

  "evaluacion-proyectos": ["probabilidad", "economia"],
  "metalurgia-extractiva": [
    "quimica-mineralogica",
    "fenomenos",
    "fisioquimica"
  ],
  "analisis-geoestadistico": ["probabilidad"],
  "fundamentos-tec-minera": ["mec-rocas-2"],
  "proc-minerales-1": ["quimica-mineralogica", "mineria-sustentabilidad"],
  "practica-1": ["mineria-sustentabilidad", "geologia-ing"],

  "economia-minerales": [
    "evaluacion-proyectos",
    "mineria-sustentabilidad",
    "optimizacion"
  ],
  "evaluacion-yacimientos": [
    "intro-yacimientos",
    "analisis-geoestadistico"
  ],
  "legislacion-minera": ["mineria-sustentabilidad"],
  "medio-ambiente-comunidades": [
    "metalurgia-extractiva",
    "fundamentos-tec-minera"
  ],
  "proc-minerales-2": ["proc-minerales-1", "fenomenos"],

  "diseno-minas-sub": [
    "evaluacion-proyectos",
    "fundamentos-tec-minera",
    "analisis-geoestadistico"
  ],
  "diseno-minas-cielo": [
    "evaluacion-proyectos",
    "fundamentos-tec-minera",
    "analisis-geoestadistico"
  ],
  "gestion-operaciones": [
    "fundamentos-tec-minera",
    "proc-minerales-2",
    "economia-minerales",
    "analisis-geoestadistico"
  ],
  "seguridad-minera": ["practica-1", "fundamentos-tec-minera"],
  "aguas-relaves": ["proc-minerales-2"],
  "electivo-especialidad-1": [],

  "practica-2": [
    "practica-1",
    "metalurgia-extractiva",
    "fundamentos-tec-minera"
  ],

  "introduccion-titulo": ["practica-2"],
  "taller-proyecto-minero": [
    "proc-minerales-2",
    "seguridad-minera",
    "diseno-minas-cielo",
    "diseno-minas-sub"
  ],
  "eval-gestion-proyectos-mineros": [
    "economia-minerales",
    "proc-minerales-2",
    "fundamentos-tec-minera"
  ],
  "electivo-especialidad-2": [],
  "electivo-especialidad-3": [],

  "trabajo-titulo": [
    "introduccion-titulo",
    "taller-proyecto-minero"
  ]
};

// ----- Estado -----
let aprobados = new Set();
let mapaRamos = {};
let mensajeTimeoutId = null;
const STORAGE_KEY = "malla-aprobados-v1";

// ==============================
//  INICIALIZACIÓN
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  const contenedorMalla = document.getElementById("malla");
  if (!contenedorMalla) return;

  // Mapa id -> nombre
  semestres.forEach(function (semestre) {
    semestre.ramos.forEach(function (ramo) {
      mapaRamos[ramo.id] = ramo.nombre;
    });
  });

  cargarEstadoDesdeStorage();

  // Render malla
  semestres.forEach(function (semestre) {
    const columna = document.createElement("section");
    columna.className = "semestre";

    const titulo = document.createElement("h2");
    titulo.className = "semestre__titulo";
    titulo.textContent = semestre.nombre;
    columna.appendChild(titulo);

    const contRamos = document.createElement("div");
    contRamos.className = "semestre__ramos";

    semestre.ramos.forEach(function (ramo) {
      const item = document.createElement("div");
      item.className = "ramo";
      item.dataset.id = ramo.id;
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");

      const reqs = requisitos[ramo.id] || [];
      if (reqs.length > 0) {
        const nombresReq = reqs.map(function (idReq) {
          return mapaRamos[idReq] || idReq;
        });
        item.title = "Requisitos: " + nombresReq.join(", ");
      } else {
        item.title = "Sin requisitos";
      }

      const spanNombre = document.createElement("span");
      spanNombre.className = "ramo__nombre";
      spanNombre.textContent = ramo.nombre;
      item.appendChild(spanNombre);

      if (aprobados.has(ramo.id)) {
        item.classList.add("aprobado");
        item.setAttribute("aria-pressed", "true");
      } else {
        item.setAttribute("aria-pressed", "false");
      }

      item.addEventListener("click", manejarClickRamo);

      item.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          manejarClickRamo.call(item, evento);
        }
      });

      contRamos.appendChild(item);
    });

    columna.appendChild(contRamos);
    contenedorMalla.appendChild(columna);
  });

  actualizarBloqueos();
});

// ==============================
//  LÓGICA
// ==============================
function manejarClickRamo() {
  const idRamo = this.dataset.id;
  const yaAprobado = aprobados.has(idRamo);

  if (yaAprobado) {
    aprobados.delete(idRamo);
    this.classList.remove("aprobado");
    this.setAttribute("aria-pressed", "false");
    guardarEstadoEnStorage();
    actualizarBloqueos();
    return;
  }

  const reqs = requisitos[idRamo] || [];
  const faltantes = reqs.filter(function (idReq) {
    return !aprobados.has(idReq);
  });

  if (faltantes.length > 0) {
    const nombresFaltantes = faltantes.map(function (id) {
      return mapaRamos[id] || id;
    });
    const nombreRamo = mapaRamos[idRamo] || idRamo;

    mostrarMensaje(
      'No puedes aprobar "' +
        nombreRamo +
        '" porque te faltan: ' +
        nombresFaltantes.join(", ") +
        "."
    );
    return;
  }

  aprobados.add(idRamo);
  this.classList.add("aprobado");
  this.setAttribute("aria-pressed", "true");
  guardarEstadoEnStorage();
  actualizarBloqueos();
}

function actualizarBloqueos() {
  const elementosRamos = document.querySelectorAll(".ramo");

  elementosRamos.forEach(function (elem) {
    const idRamo = elem.dataset.id;

    if (aprobados.has(idRamo)) {
      elem.classList.remove("bloqueado");
      return;
    }

    const reqs = requisitos[idRamo] || [];
    if (reqs.length === 0) {
      elem.classList.remove("bloqueado");
      return;
    }

    const faltantes = reqs.filter(function (idReq) {
      return !aprobados.has(idReq);
    });

    if (faltantes.length > 0) {
      elem.classList.add("bloqueado");
    } else {
      elem.classList.remove("bloqueado");
    }
  });
}

function mostrarMensaje(texto) {
  const contMensaje = document.getElementById("mensaje");
  if (!contMensaje) return;

  contMensaje.textContent = texto;
  contMensaje.classList.add("mensaje--visible");

  if (mensajeTimeoutId !== null) {
    clearTimeout(mensajeTimeoutId);
  }

  mensajeTimeoutId = setTimeout(function () {
    contMensaje.classList.remove("mensaje--visible");
    mensajeTimeoutId = null;
  }, 4500);
}

function cargarEstadoDesdeStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      aprobados = new Set();
      return;
    }
    const arregloIds = JSON.parse(data);
    if (Array.isArray(arregloIds)) {
      aprobados = new Set(arregloIds);
    } else {
      aprobados = new Set();
    }
  } catch (err) {
    console.error("Error al leer localStorage:", err);
    aprobados = new Set();
  }
}

function guardarEstadoEnStorage() {
  try {
    const arreglo = Array.from(aprobados);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arreglo));
  } catch (err) {
    console.error("Error al guardar en localStorage:", err);
  }
}
