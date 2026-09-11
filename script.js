/* =========================================================
   GRUPO 1 — PRESENTACIÓN
   NAVEGACIÓN + VIDEO DE FONDO
   ========================================================= */

let escenaActual = 0;
let escenaActualAnterior = 0;

const escenas = document.querySelectorAll(".escena");
const totalEscenas = escenas.length;

const contador = document.getElementById("contador");

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnPantalla = document.getElementById("btnPantalla");

const videoIntro = document.getElementById("videoIntro");
const videoIntroWrap = document.getElementById("videoIntroWrap");


/* =========================================================
   MOSTRAR ESCENA
   ========================================================= */

function mostrarEscena(numero) {

    if (numero < 0 || numero >= totalEscenas) {
        return;
    }

    escenaActual = numero;


    /* ACTIVAR LA ESCENA CORRESPONDIENTE */

    escenas.forEach((escena, indice) => {

        if (indice === numero) {
            escena.classList.add("activa");
        } else {
            escena.classList.remove("activa");
        }

    });


    /* =====================================================
       CONTADOR
       ===================================================== */

    contador.textContent =
        String(numero + 1).padStart(2, "0") +
        " / " +
        String(totalEscenas).padStart(2, "0");


    /* =====================================================
       VIDEO DE FONDO
       
       EL VIDEO SE UTILIZA EN LAS PRIMERAS 4 ESCENAS
       
       ESCENA 1 = índice 0
       ESCENA 2 = índice 1
       ESCENA 3 = índice 2
       ESCENA 4 = índice 3
       ===================================================== */

    const esIntro = numero <= 3;


    if (esIntro) {

        /* Mostrar el contenedor del video */

        videoIntroWrap.classList.add("visible");


        /*
           Cuando regresamos a la primera escena,
           el video vuelve a comenzar.
        */

        if (
            numero === 0 &&
            escenaActualAnterior !== 0
        ) {

            videoIntro.currentTime = 0;

        }


        /* Reproducir automáticamente */

        videoIntro.play().catch(function() {

            /*
               Algunos navegadores pueden bloquear
               temporalmente el autoplay.
            */

        });

    } else {

        /*
           Desde la escena 5 en adelante,
           el video deja de mostrarse.
        */

        videoIntroWrap.classList.remove("visible");

        videoIntro.pause();

    }


    escenaActualAnterior = numero;


    actualizarBotones();

}


/* =========================================================
   SIGUIENTE ESCENA
   ========================================================= */

function siguiente() {

    if (escenaActual < totalEscenas - 1) {

        mostrarEscena(escenaActual + 1);

    }

}


/* =========================================================
   ESCENA ANTERIOR
   ========================================================= */

function anterior() {

    if (escenaActual > 0) {

        mostrarEscena(escenaActual - 1);

    }

}


/* =========================================================
   ACTUALIZAR BOTONES
   ========================================================= */

function actualizarBotones() {

    /*
       Botón anterior
    */

    if (escenaActual === 0) {

        btnAnterior.style.opacity = "0.35";
        btnAnterior.style.pointerEvents = "none";

    } else {

        btnAnterior.style.opacity = "1";
        btnAnterior.style.pointerEvents = "auto";

    }


    /*
       Botón siguiente
    */

    if (escenaActual === totalEscenas - 1) {

        btnSiguiente.style.opacity = "0.35";
        btnSiguiente.style.pointerEvents = "none";

    } else {

        btnSiguiente.style.opacity = "1";
        btnSiguiente.style.pointerEvents = "auto";

    }

}


/* =========================================================
   TECLADO
   ========================================================= */

document.addEventListener("keydown", function(event) {


    /* -----------------------------------------------------
       FLECHA DERECHA / ESPACIO / PAGE DOWN
       ----------------------------------------------------- */

    if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === " "
    ) {

        event.preventDefault();

        siguiente();

    }


    /* -----------------------------------------------------
       FLECHA IZQUIERDA / PAGE UP
       ----------------------------------------------------- */

    if (
        event.key === "ArrowLeft" ||
        event.key === "PageUp"
    ) {

        event.preventDefault();

        anterior();

    }


    /* -----------------------------------------------------
       HOME = PRIMERA ESCENA
       ----------------------------------------------------- */

    if (event.key === "Home") {

        event.preventDefault();

        mostrarEscena(0);

    }


    /* -----------------------------------------------------
       END = ÚLTIMA ESCENA
       ----------------------------------------------------- */

    if (event.key === "End") {

        event.preventDefault();

        mostrarEscena(totalEscenas - 1);

    }

});


/* =========================================================
   BOTONES DE NAVEGACIÓN
   ========================================================= */

btnAnterior.addEventListener(
    "click",
    function() {

        anterior();

    }
);


btnSiguiente.addEventListener(
    "click",
    function() {

        siguiente();

    }
);


/* =========================================================
   PANTALLA COMPLETA
   ========================================================= */

function pantallaCompleta() {

    if (!document.fullscreenElement) {

        document.documentElement
            .requestFullscreen()
            .catch(function() {});

    } else {

        document.exitFullscreen()
            .catch(function() {});

    }

}


/* Botón de pantalla completa */

btnPantalla.addEventListener(
    "click",
    function() {

        pantallaCompleta();

    }
);


/* =========================================================
   DOBLE CLIC = PANTALLA COMPLETA
   ========================================================= */

document.addEventListener(
    "dblclick",
    function() {

        pantallaCompleta();

    }
);


/* =========================================================
   CUANDO TERMINA EL VIDEO
   ========================================================= */

videoIntro.addEventListener(
    "ended",
    function() {

        /*
           El video NO cambia automáticamente
           de diapositiva.

           El expositor decide cuándo continuar
           utilizando la flecha derecha.
        */

        videoIntro.currentTime =
            videoIntro.duration || 0;

    }
);


/* =========================================================
   INICIAR PRESENTACIÓN
   ========================================================= */

mostrarEscena(0);