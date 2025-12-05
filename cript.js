/* =========================================================
   MALLA CURRICULAR INTERACTIVA
   - Genera la malla en base a datos JS
   - Marca ramos aprobados
   - Valida requisitos antes de aprobar
   - Persiste estado en localStorage
   ========================================================= */

/* Clave para guardar en LocalStorage */
const STORAGE_KEY = "mallaMineriaAprobados";

/* ---------------------------------------------------------
   DEFINICIÓN DE RAMOS POR SEMESTRE
   - id: identificador interno (sin espacios ni tildes)
   - name: nombre que se muestra en pantalla
   --------------------------------------------------------- */

const semesters = [
  {
    name: "Semestre 1",
    courses: [
      { id: "intro_calculo", name: "Introducción al cálculo" },
      { id: "intro_algebra", name: "Introducción al álgebra" },
      { id: "intro_fisica", name: "Introducción a la Física clásica" },
      { id: "herramientas_compu", name: "Herramientas Computacionales" },
      { id: "desafios", name: "Desafíos" },
      { id: "biologia", name: "Biología" }
    ]
  },
  {
    name: "Semestre 2",
    courses: [
      { id: "calculo_diferencial", name: "Cálculo Diferencial" },
      { id: "algebra_lineal", name: "Álgebra lineal" },
      { id: "moderna", name: "Moderna" },
      { id: "progra", name: "Progra" },
      { id: "proyectos", name: "Proyectos" }
    ]
  },
  {
    name: "Semestre 3",
    courses: [
      { id: "cvv", name: "CVV" },
      { id: "edo", name: "EDO" },
      { id: "mecanica", name: "Mecánica" },
      { id: "metodos", name: "Métodos" },
      { id: "quimica", name: "Química" }
    ]
  },
  {
    name: "Semestre 4",
    courses: [
      { id: "caa", name: "CAA" },
      { id: "economia", name: "Economía" },
      { id: "electromagnetismo", name: "Electromagnetismo" },
      { id: "termodinamica", name: "Termodinámica" },
      { id: "modulo", name: "Módulo" }
    ]
  },
  {
    name: "Semestre 5",
    courses: [
      { id: "probabilidad", name: "Probabilidad" },
      { id: "quimica_mineralogica", name: "Química mineralógica" },
      { id: "geologia_ing", name: "Geología para ingenieros" },
      { id: "mineria_sustentabilidad", name: "Minería y Sustentabilidad" },
      { id: "mecanica_rocas_1", name: "Mecánica de rocas 1" }
    ]
  },
  {
    name: "Semestre 6",
    courses: [
      { id: "optimizacion", name: "Optimización" },
      { id: "fisioquimica", name: "Fisioquímica" },
      { id: "intro_yacimientos", name: "Introducción a Yacimientos" },
      { id: "fenomenos", name: "Fenómenos" },
      { id: "mecanica_rocas_2", name: "Mecánica de rocas 2" }
    ]
  },
  {
    name: "Semestre 7",
    courses: [
      { id: "evaluacion_proyectos", name: "Evaluación de proyectos" },
      { id: "metalurgia_extractiva", name: "Metalurgia extractiva" },
      {
        id: "analisis_geoestadistico",
        name: "Análisis estadístico y geoestadístico de datos"
      },
      {
        id: "fundamentos_tecnologia_minera",
        name: "Fundamentos de tecnología minera"
      },
      {
        id: "procesamiento_minerales_1",
        name: "Procesamiento de minerales 1"
      },
      { id: "practica_profesional_1", name: "Práctica profesional 1" }
    ]
  },
  {
    name: "Semestre 8",
    courses: [
      { id: "economia_minerales", name: "Economía de minerales" },
      { id: "evaluacion_yacimientos", name: "Evaluación de yacimientos" },
      { id: "legislacion_minera", name: "Legislación minera" },
      {
        id: "medioambiente_comunidades",
        name: "Medio ambiente y comunidades"
      },
      {
        id: "procesamiento_minerales_2",
        name: "Procesamiento de minerales 2"
      }
    ]
  },
  {
    name: "Semestre 9",
    courses: [
      {
        id: "diseno_minas_subterraneas",
        name: "Diseño y planificación de minas subterráneas"
      },
      {
        id: "diseno_minas_cielo_abierto",
        name: "Diseño y planificación de minas a cielo abierto"
      },
      {
        id: "gestion_operaciones_mineras",
        name: "Gestión de operaciones mineras"
      },
      { id: "seguridad_minera", name: "Seguridad minera" },
      { id: "aguas_relaves", name: "Aguas y relaves" },
      { id: "electivo_especialidad_1", name: "Electivo de especialidad" },
      { id: "practica_profesional_2", name: "Práctica profesional 2" }
    ]
  },
  {
    name: "Semestre 10",
    courses: [
      {
        id: "intro_titulo_trabajo",
        name: "Introducción al título de trabajo"
      },
      { id: "taller_proyecto_minero", name: "Taller de proyecto minero" },
      {
        id: "evaluacion_gestion_proyectos_mineros",
        name: "Evaluación y gestión de proyectos mineros"
      },
      { id: "electivo_especialidad_2", name: "Electivo especialidad 1" },
      { id: "electivo_especialidad_3", name: "Electivo especialidad 2" }
    ]
  },
  {
    name: "Semestre 11",
    courses: [
      { id: "trabajo_titulo", name: "Trabajo de título" }
    ]
  }
];

/* ---------------------------------------------------------
   LISTA DE REQUISITOS POR RAMO
   - clave: id del ramo
   - valor: arreglo de ids de ramos requisitos
   --------------------------------------------------------- */

const prerequisites = {
  // Semestre 2
  calculo_diferencial: ["intro_calculo"],
  algebra_lineal: ["intro_algebra"],
  moderna: ["intro_calculo", "intro_algebra", "intro_fisica"],
  progra: ["herramientas_compu"],
  proyectos: ["desafios"],

  // Semestre 3
  cvv: ["calculo_diferencial", "algebra_lineal"],
  edo: ["calculo_diferencial", "algebra_lineal"],
  mecanica: ["calculo_diferencial", "algebra_lineal", "moderna"],
  metodos: ["calculo_diferencial", "moderna"],
  quimica: ["moderna", "progra"],

  // Semestre 4
  caa: ["cvv", "edo"],
  economia: ["cvv"],
  electromagnetismo: ["cvv", "edo", "mecanica"],
  termodinamica: ["quimica", "cvv", "mecanica"],
  modulo: ["metodos", "proyectos"],

  // Semestre 5
  probabilidad: ["cvv"],
  quimica_mineralogica: ["quimica"],
  geologia_ing: ["calculo_diferencial", "modulo"],
  mineria_sustentabilidad: ["modulo"],
  mecanica_rocas_1: ["mecanica"],

  // Semestre 6
  optimizacion: ["caa"],
  fisioquimica: ["termodinamica"],
  intro_yacimientos: ["geologia_ing", "quimica_mineralogica"],
  fenomenos: ["termodinamica"],
  mecanica_rocas_2: ["mecanica_rocas_1", "geologia_ing"],

  // Semestre 7
  evaluacion_proyectos: ["probabilidad", "economia"],
  metalurgia_extractiva: [
    "quimica_mineralogica",
    "fenomenos",
    "fisioquimica"
  ],
  analisis_geoestadistico: ["probabilidad"],
  fundamentos_tecnologia_minera: ["mecanica_rocas_2"],
  procesamiento_minerales_1: [
    "quimica_mineralogica",
    "mineria_sustentabilidad"
  ],
  practica_profesional_1: ["mineria_sustentabilidad", "geologia_ing"],

  // Semestre 8
  economia_minerales: [
    "evaluacion_proyectos",
    "mineria_sustentabilidad",
    "optimizacion"
  ],
  evaluacion_yacimientos: [
    "intro_yacimientos",
    "analisis_geoestadistico"
  ],
  legislacion_minera: ["mineria_sustentabilidad"],
  medioambiente_comunidades: [
    "metalurgia_extractiva",
    "fundamentos_tecnologia_minera"
  ],
  procesamiento_minerales_2: [
    "procesamiento_minerales_1",
    "fenomenos"
  ],

  // Semestre 9
  diseno_minas_subterraneas: [
    "evaluacion_proyectos",
    "fundamentos_tecnologia_minera",
    "analisis_geoestadistico"
  ],
  diseno_minas_cielo_abierto: [
    "evaluacion_proyectos",
    "fundamentos_tecnologia_minera",
    "analisis_geoestadistico"
  ],
  gestion_operaciones_mineras: [
    "fundamentos_tecnologia_minera",
    "procesamiento_minerales_2",
    "economia_minerales",
    "analisis_geoestadistico"
  ],
  seguridad_minera: [
    "practica_profesional_1",
    "fundamentos_tecnologia_minera"
  ],
  aguas_relaves: ["procesamiento_minerales_2"],
  // Electivo especialidad 1: sin requisitos
  // Práctica profesional 2:
  practica_profesional_2: [
    "practica_profesional_1",
    "metalurgia_extractiva",
    "fundamentos_tecnologia_minera"
  ],

  // Semestre 10
  intro_titulo_trabajo: ["practica_profesional_2"],
  taller_proyecto_minero: [
    "procesamiento_minerales_2",
    "seguridad_minera",
    "diseno_minas_cielo_abierto",
    "diseno_minas_subterraneas"
  ],
  evaluacion_gestion_proyectos_mineros: [
    "economia_minerales",
    "procesamiento_minerales_2",
    "fundamentos_tecnologia_minera"
  ],
  // Electivos especialidad 2 y 3: sin requisitos

  // Semestre 11
  trabajo_titulo: ["intro_titulo_trabajo", "taller_proyecto_minero"]
};

/* ---------------------------------------------------------
   MAPA AUXILIAR: id -> nombre del ramo
   --------------------------------------------------------- */

const courseNameById = {};
semesters.forEach((sem) => {
  sem.courses.forEach((c) => {
    courseNameById[c.id] = c.name;
  });
});

/* ---------------------------------------------------------
   ESTADO ACTUAL: conjunto de ramos aprobados
   --------------------------------------------------------- */

/**
 * Conjunto (Set) con los ids de ramos aprobados.
 * Se carga desde localStorage si existe.
 */
const approvedCourses = loadApprovedFromStorage();

/* ---------------------------------------------------------
   FUNCIÓN PRINCIPAL: INICIALIZAR INTERFAZ
   --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid-semestral");
  buildSemesterColumns(grid); // Generar columnas y tarjetas
  updateLockStates();        // Marcar visualmente ramos bloqueados / disponibles
  refreshApprovedStyles();   // Aplicar estilos de aprobados desde localStorage
});

/* ---------------------------------------------------------
   CONSTRUCCIÓN DEL DOM
   --------------------------------------------------------- */

/**
 * Genera dinámicamente las columnas por semestre y sus ramos.
 */
function buildSemesterColumns(gridContainer) {
  semesters.forEach((semester) => {
    const column = document.createElement("section");
    column.className = "semester-column";

    const header = document.createElement("div");
    header.className = "semester-header";

    const title = document.createElement("h2");
    title.className = "semester-title";
    title.textContent = semester.name;

    const count = document.createElement("span");
    count.className = "semester-count";
    count.textContent = `${semester.courses.length} ramos`;

    header.appendChild(title);
    header.appendChild(count);

    const list = document.createElement("div");
    list.className = "courses-list";

    semester.courses.forEach((course) => {
      const card = document.createElement("article");
      card.className = "course-card";
      card.dataset.id = course.id;

      const nameEl = document.createElement("div");
      nameEl.className = "course-name";
      nameEl.textContent = course.name;
      card.appendChild(nameEl);

      // Si tiene requisitos, mostrar una línea dentro de la tarjeta
      const prereqs = prerequisites[course.id];
      if (prereqs && prereqs.length > 0) {
        const prereqText = prereqs
          .map((id) => courseNameById[id] || id)
          .join(", ");
        const prereqEl = document.createElement("div");
        prereqEl.className = "course-prereqs";
        prereqEl.textContent = prereqText;
        card.appendChild(prereqEl);
      }

      // Manejar clic para aprobar / desaprobar
      card.addEventListener("click", () => handleCourseClick(course.id));

      list.appendChild(card);
    });

    column.appendChild(header);
    column.appendChild(list);
    gridContainer.appendChild(column);
  });
}

/* ---------------------------------------------------------
   LÓGICA DE APROBACIÓN Y BLOQUEO
   --------------------------------------------------------- */

/**
 * Maneja el clic en un ramo.
 * - Si ya está aprobado: lo desmarca (permite retroceder).
 * - Si no está aprobado: verifica requisitos antes de aprobar.
 */
function handleCourseClick(courseId) {
  const isApproved = approvedCourses.has(courseId);

  if (isApproved) {
    // Desmarcar como aprobado sin validar requisitos
    approvedCourses.delete(courseId);
    saveApprovedToStorage();
    refreshApprovedStyles();
    updateLockStates();
    showMessage(
      `Se desmarcó «${courseNameById[courseId]}» como aprobado.`,
      false
    );
    return;
  }

  // Verificar requisitos antes de aprobar
  const missing = getMissingPrerequisites(courseId);

  if (missing.length > 0) {
    // Tiene requisitos pendientes → mostrar mensaje y NO aprobar
    const missingNames = missing
      .map((id) => courseNameById[id] || id)
      .join(", ");
    showMessage(
      `No puedes aprobar «${courseNameById[courseId]}» porque faltan: ${missingNames}.`,
      true
    );
    return;
  }

  // Requisitos cumplidos → aprobar
  approvedCourses.add(courseId);
  saveApprovedToStorage();
  refreshApprovedStyles();
  updateLockStates();
  showMessage(`Marcaste «${courseNameById[courseId]}» como aprobado.`, false);
}

/**
 * Devuelve un arreglo con los ids de requisitos que aún no han sido aprobados.
 */
function getMissingPrerequisites(courseId) {
  const reqs = prerequisites[courseId] || [];
  return reqs.filter((reqId) => !approvedCourses.has(reqId));
}

/* ---------------------------------------------------------
   ESTILOS DINÁMICOS SEGÚN ESTADO
   --------------------------------------------------------- */

/**
 * Recorre todas las tarjetas y aplica / quita la clase de aprobado.
 */
function refreshApprovedStyles() {
  const allCards = document.querySelectorAll(".course-card");
  allCards.forEach((card) => {
    const id = card.dataset.id;
    if (approvedCourses.has(id)) {
      card.classList.add("course-card--approved");
    } else {
      card.classList.remove("course-card--approved");
    }
  });
}

/**
 * Marca visualmente qué ramos están "bloqueados" (faltan requisitos)
 * y cuáles están disponibles para aprobar.
 */
function updateLockStates() {
  const allCards = document.querySelectorAll(".course-card");
  allCards.forEach((card) => {
    const id = card.dataset.id;
    const missing = getMissingPrerequisites(id);

    // Si ya está aprobado, nunca se ve bloqueado
    if (approvedCourses.has(id)) {
      card.classList.remove("course-card--locked");
      return;
    }

    if (missing.length > 0) {
      card.classList.add("course-card--locked");
    } else {
      card.classList.remove("course-card--locked");
    }
  });
}

/* ---------------------------------------------------------
   LOCALSTORAGE: GUARDAR / CARGAR
   --------------------------------------------------------- */

/**
 * Carga desde localStorage el conjunto de ramos aprobados.
 */
function loadApprovedFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr);
  } catch (e) {
    console.warn("No se pudo leer el estado de la malla desde localStorage:", e);
    return new Set();
  }
}

/**
 * Guarda en localStorage el conjunto de ramos aprobados.
 */
function saveApprovedToStorage() {
  try {
    const arr = Array.from(approvedCourses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    console.warn("No se pudo guardar el estado de la malla en localStorage:", e);
  }
}

/* ---------------------------------------------------------
   MENSAJES AL USUARIO
   --------------------------------------------------------- */

/**
 * Muestra un mensaje en la barra inferior.
 * @param {string} text - texto del mensaje
 * @param {boolean} isError - si es true, se trata como mensaje de bloqueo/error
 */
function showMessage(text, isError = false) {
  const messageEl = document.getElementById("message-text");
  const bar = messageEl.parentElement;

  messageEl.textContent = text || "";

  // Pequeño efecto visual cuando cambia el mensaje
  bar.classList.remove("message-bar--highlight");
  void bar.offsetWidth; // hack para reiniciar la animación
  bar.classList.add("message-bar--highlight");

  // Si quisieras diferenciar color de error vs info,
  // se podría cambiar aquí con clases adicionales.
}

