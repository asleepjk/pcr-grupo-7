let sparklineNuestras = {}, sparklineEnemigo = {}, chart = {};

function loadGraficos() {
    const categorias = ["politica", "economia", "social", "militar", "infraestructura", "informacion", "fisico"];

    categorias.forEach(categoria => {
        // Verificar si existen los divs en el HTML
        let sparkNuestrasDiv = document.getElementById(`sparkNuestras-${categoria}`);
        let sparkEnemigoDiv = document.getElementById(`sparkEnemigo-${categoria}`);
        let chartDiv = document.getElementById(`chart${categoria.charAt(0).toUpperCase() + categoria.slice(1)}`);

        if (!sparkNuestrasDiv || !sparkEnemigoDiv || !chartDiv) {
            console.warn(`Algunos elementos para ${categoria} no se encontraron.`);
            return;
        }

         // Obtener datos desde la tabla
         let { nuestrasData, enemigoData, factores } = obtenerDatosDesdeTabla(categoria);

        // Inicializar sparklines
        sparklineNuestras[categoria] = new ApexCharts(sparkNuestrasDiv, {
            chart: { type: "area", height: 50, sparkline: { enabled: true } },
            stroke: { curve: "smooth" },
            series: [{ name: "Nuestras", data: [] }],
            colors: ['#0a4ed5'],
            tooltip: {
                enabled: true,
                y: { title: { formatter: () => "Nuestras" } },
                x: {
                    formatter: function(value, { dataPointIndex }) {
                        return factores[dataPointIndex] || "Sin dato"; // Muestra el factor correspondiente
                    }
                }
            },
            labels: factores // Se usará en el tooltip
        });

        sparklineEnemigo[categoria] = new ApexCharts(sparkEnemigoDiv, {
            chart: { type: "area", height: 50, sparkline: { enabled: true } },
            stroke: { curve: "smooth" },
            series: [{ name: "Enemigo", data: [] }],
            colors: ['#cebc1a'],
            tooltip: {
                enabled: true,
                y: { title: { formatter: () => "Enemigo" } },
                x: {
                    formatter: function(value, { dataPointIndex }) {
                        return factores[dataPointIndex] || "Sin dato"; // Muestra el factor correspondiente
                    }
                }
            },
            labels: factores
        });

        sparklineNuestras[categoria].render();
        sparklineEnemigo[categoria].render();

        // Inicializar gráfico de barras
        window[`chart_${categoria}`] = new ApexCharts(chartDiv, {
            chart: { type: "bar", height: 350 },
            colors: ['#0a4ed5', '#cebc1a'],
            series: [{ name: "Nuestras", data: [] }, { name: "Enemigo", data: [] }],
            xaxis: { categories: [] },
            plotOptions: { bar: { horizontal: false, columnWidth: "50%", dataLabels: { position: "top" } } }
        });

        window[`chart_${categoria}`].render();

        // Cargar datos iniciales
        actualizarGraficos(categoria);
    });

    // Añadir esto al final de la función loadGraficos
    const toggleButtons = document.querySelectorAll('.toggle-collapse');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Botón clickeado');
            
            const targetId = this.getAttribute('data-target');
            const collapseElement = document.getElementById(targetId);
            
            if (collapseElement) {
                if (collapseElement.style.display === 'none' || getComputedStyle(collapseElement).display === 'none') {
                    collapseElement.style.display = 'block';
                    this.querySelector('span').textContent = '▼';
                } else {
                    collapseElement.style.display = 'none';
                    this.querySelector('span').textContent = '▲';
                }
            }
        });
    });
}

function obtenerDatosDesdeTabla(categoria) {
    const factoresPorCategoria = {
        "politica": ["gobierno-central", "partidos-politicos", "gobiernos-locales", "relaciones-internacionales"],
        "economia": [ "produccion-economia", "distribucion-economia", "consumo-economia", "defensa-economia", "reserva-economia", "informal-economia"],
        "social": ["identidad", "gestion", "recursos"],
        "militar": ["ft", "fn", "fa", "experiencia", "liderazgo"],
        "infraestructura": ["hidroelectrica", "represas", "refineria", "puertos", "aeropuertos", "vial"],
        "informacion": ["membresias","agencias", "medios", "infodef"],
        "fisico": ["relieve","vegetacion","hidrografia","arte","localidades","naturaleza"]
    };

    let factores = factoresPorCategoria[categoria] || [];
    let nuestrasData = [];
    let enemigoData = [];

    factores.forEach(idBase => {
        let nuestras = parseFloat(document.getElementById(`total-${idBase}_master`)?.value) || 0;
        let enemigo = parseFloat(document.getElementById(`total-${idBase}-enemigo_master`)?.value) || 0;
        nuestrasData.push(nuestras);
        enemigoData.push(enemigo);
    });

    return { nuestrasData, enemigoData, factores };
}

function actualizarGraficos(categoria) {
    let { nuestrasData, enemigoData, factores } = obtenerDatosDesdeTabla(categoria);

    let chart = window[`chart_${categoria}`];

    if (chart) {
        chart.updateSeries([
            { name: 'Nuestras', data: nuestrasData },
            { name: 'Enemigo', data: enemigoData }
        ]);

        chart.updateOptions({ xaxis: { categories: factores } });
    }

    // Actualizar los sparklines
    if (sparklineNuestras[categoria] && sparklineEnemigo[categoria]) {
        sparklineNuestras[categoria].updateSeries([{ data: nuestrasData }]);
        sparklineEnemigo[categoria].updateSeries([{ data: enemigoData }]);
    }
}



document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".toggle-collapse").forEach(button => {
        button.addEventListener("click", function () {
            let targetId = this.getAttribute("data-target");
            let targetDiv = document.getElementById(targetId);

            if (targetDiv) {
                targetDiv.classList.toggle("show");

                // Cambiar el texto del botón si está colapsado o expandido
                if (targetDiv.classList.contains("show")) {
                    this.innerText = `Ocultar ${this.innerText.replace("Mostrar", "").trim()}`;
                } else {
                    this.innerText = `Mostrar ${this.innerText.replace("Ocultar", "").trim()}`;
                }
            }
        });
    });
});
