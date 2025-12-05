// ==============================
//  MALLA CURRICULAR INTERACTIVA
//  - Organización por semestres
//  - Click para aprobar ramos
//  - Validación de requisitos
//  - Persistencia con localStorage
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

// ----- Requisitos de cada ramo (por ID) -----
// IMPORTANTE:
//  - Si un ramo no aparece aquí, se asume "sin requisitos".
//  - Las claves DEBEN coincidir con los id definidos arriba.
const requisitos = {
    // Semestre 2
    "calculo-diferencial": ["intro-calculo"],
    "algebra-lineal": ["intro-algebra"],
    moderna: ["intro-calculo", "intro-algebra", "intro-fisica"],
    progra: ["herr-compu"],
    proyectos: ["desafios"],

    // Semestre 3
    cvv: ["calculo-diferencial", "algebra-lineal"],
    edo: ["calculo-diferencial", "algebra-lineal"],
    mecanica: ["calculo-diferencial", "algebra-lineal", "moderna"],
    metodos: ["calculo-diferencial", "moderna"],
    quimica: ["moderna", "progra"],

    // Semestre 4
    caa: ["cvv", "edo"],
    economia: ["cvv"],
    electromagnetismo: ["cvv", "edo", "mecanica"],
    termodinamica: ["quimica", "cvv", "mecanica"],
    modulo: ["metodos", "proyectos"],

    // Semestre 5
    probabilidad: ["cvv"],
    "quimica-mineralogica": ["quimica"],
    "geologia-ing": ["calculo-diferencial", "modulo"],
    "mineria-sustentabilidad": ["modulo"],
    "mec-rocas-1": ["mecanica"],

    // Semestre 6
    optimizacion: ["caa"],
    fisioquimica: ["termodinamica"],
    "intro-yacimientos": ["geologia-ing", "quimica-mineralogica"],
    fenomenos: ["termodinamica"],
    "mec-rocas-2": ["mec-rocas-1", "geologia-ing"],

    // Semestre 7
    "evaluacion-proyectos": ["probabilidad", "economia"],
    "metalurgia-extractiva": [
        "quimica-mineralogica",
        "fenomenos",
        "fisioquimica"
    ],
    "analisis-geoestadistico": ["probabilidad"],
    "fundamentos-tec-minera": ["mec-rocas-2"],
    "proc-minerales-1": [
        "quimica-mineralogica",
        "mineria-sustentabilidad"
    ],
    "practica-1": ["mineria-sustentabilidad", "geologia-ing"],

    // Semestre 8
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

    // Semestre 9
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
    "electivo-especialidad-1": [], // sin requisitos

    // Semestre 9 (Práctica 2)
    "practica-2": [
        "practica-1",
        "metalurgia-extractiva",
        "fundamentos-tec-minera"
    ],

    // Semestre 10
    "introduccion-titulo": ["practica-2"],
    "taller-proyecto-minero": [
        "proc-minerales-2",
        "seguridad-minera",
        "diseno-minas-cielo",
        "diseno-minas-sub"
    ],
    "eval-gestion-proyectos-mineros": [
        "economia-minerales", // corregido desde "economia de materiales"
        "proc-minerales-2",
        "fundamentos-tec-minera"
    ],
    "electivo-especialidad-2": [], // sin requisitos
    "electivo-especialidad-3": [], // sin requisitos

    // Semestre 11
    "trabajo-titulo": [
        "introduccion-titulo",
        "taller-proyecto-minero"
    ]
};

// ----- Estado en memoria -----
let aprobados = new Set();      // IDs de ramos aprobados
let mapaRamos = {};             // id -> nombre (para mostrar en mensajes)
let mensajeTimeoutId = null;    // controlar timeout del mensaje

// Clave para localStorage
const STORAGE_KEY = "malla-aprobados-v1";

// ==============================
//  INICIALIZACIÓN
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    const contenedorMalla = document.getElementById("malla");

    // 1) Construir mapa id -> nombre (para mensajes, títulos, etc.)
    semestres.forEach((semestre) => {
        semestre.ramos.forEach((ramo) => {
            mapaRamos[ramo.id] = ramo.nombre;
        });
    });

    // 2) Cargar estado desde localStorage
    cargarEstadoDesdeStorage();

    // 3) Renderizar la malla
    semestres.forEach((semestre) => {
        const columna = document.createElement("section");
        columna.classList.add("semestre");

        const titulo = document.createElement("h2");
        titulo.classList.add("semestre__titulo");
        titulo.textContent = semestre.nombre;
        columna.appendChild(titulo);

        const contRamos = document.createElement("div");
        contRamos.classList.add("semestre__ramos");

        semestre.ramos.forEach((ramo) => {
            const item = document.createElement("div");
            item.classList.add("ramo");
            item.dataset.id = ramo.id;
            item.setAttribute("role", "button");
            item.setAttribute("tabindex", "0");

            // Título con requisitos para mostrar en tooltip
            const reqs = requisitos[ramo.id] || [];
            if (reqs.length > 0) {
                const nombresReq = reqs.map(
                    (idReq) => mapaRamos[idReq] || idReq
                );
                item.title = "Requisitos: " + nombresReq.join(", ");
            } else {
                item.title = "Sin requisitos";
            }

            // Texto del ramo
            const spanNombre = document.createElement("span");
            spanNombre.classList.add("ramo__nombre");
            spanNombre.textContent = ramo.nombre;
            item.appendChild(spanNombre);

            // Marcar como aprobado si estaba en el estado guardado
            if (aprobados.has(ramo.id)) {
                item.classList.add("aprobado");
                item.setAttribute("aria-pressed", "true");
            } else {
                item.setAttribute("aria-pressed", "false");
            }

            // Manejar click (toggle de aprobado)
            item.addEventListener("click", manejarClickRamo);

            // Accesible con Enter y Barra Espaciadora
            item.addEventListener("keydown", (evento) => {
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

    // 4) Calcular ramos bloqueados inicialmente
    actualizarBloqueos();
});

// ==============================
//  MANEJADORES / LÓGICA
// ==============================

/**
 * Maneja el click en un ramo:
 * - Si está aprobado, lo desmarca.
 * - Si NO está aprobado, verifica requisitos antes de aprobarlo.
 */
function manejarClickRamo() {
    const idRamo = this.dataset.id;
    const yaAprobado = aprobados.has(idRamo);

    // Si ya estaba aprobado, lo desmarcamos (toggle)
    if (yaAprobado) {
        aprobados.delete(idRamo);
        this.classList.remove("aprobado");
        this.setAttribute("aria-pressed", "false");
        guardarEstadoEnStorage();
        actualizarBloqueos();
        return;
    }

    // Si no estaba aprobado, revisar requisitos
    const reqs = requisitos[idRamo] || [];
    const faltantes = reqs.filter((idReq) => !aprobados.has(idReq));

    if (faltantes.length > 0) {
        // Construir mensaje con los nombres de los requisitos faltantes
        const nombresFaltantes = faltantes.map(
            (id) => mapaRamos[id] || id
        );
        const nombreRamo = mapaRamos[idRamo] || idRamo;

        mostrarMensaje(
            `No puedes aprobar "${nombreRamo}" porque te faltan: ${nombresFaltantes.join(
                ", "
            )}.`
        );
        return;
    }

    // Requisitos OK -> marcar como aprobado
    aprobados.add(idRamo);
    this.classList.add("aprobado");
    this.setAttribute("aria-pressed", "true");

    // Guardar y recalcular bloqueos
    guardarEstadoEnStorage();
    actualizarBloqueos();
}

/**
 * Recorre todos los ramos y les pone la clase "bloqueado" si
 * aún no cumplen con sus requisitos.
 */
function actualizarBloqueos() {
    const elementosRamos = document.querySelectorAll(".ramo");

    elementosRamos.forEach((elem) => {
        const idRamo = elem.dataset.id;

        // Si ya está aprobado, no puede estar bloqueado
        if (aprobados.has(idRamo)) {
            elem.classList.remove("bloqueado");
            return;
        }

        const reqs = requisitos[idRamo] || [];
        if (reqs.length === 0) {
            // Sin requisitos, nunca está bloqueado
            elem.classList.remove("bloqueado");
            return;
        }

        const faltantes = reqs.filter((idReq) => !aprobados.has(idReq));
        if (faltantes.length > 0) {
            elem.classList.add("bloqueado");
        } else {
            elem.classList.remove("bloqueado");
        }
    });
}

/**
 * Muestra un mensaje flotante (tipo "toast") en la parte inferior.
 */
function mostrarMensaje(texto) {
    const contMensaje = document.getElementById("mensaje");
    contMensaje.textContent = texto;
    contMensaje.classList.add("mensaje--visible");

    // Limpiar timeout anterior, si existe
    if (mensajeTimeoutId !== null) {
        clearTimeout(mensajeTimeoutId);
    }

    // Ocultar después de unos segundos
    mensajeTimeoutId = setTimeout(() => {
        contMensaje.classList.remove("mensaje--visible");
        mensajeTimeoutId = null;
    }, 4500);
}

/**
 * Carga el set de ramos aprobados desde localStorage.
 */
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

/**
 * Guarda el estado actual de ramos aprobados en localStorage.
 */
function guardarEstadoEnStorage() {
    try {
        const arreglo = Array.from(aprobados);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arreglo));
    } catch (err) {
        console.error("Error al guardar en localStorage:", err);
    }
}
