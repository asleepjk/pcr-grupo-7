function addTableListeners() {
    const tablasSecundarias = document.querySelectorAll(".tabla-secundaria"); 

    tablasSecundarias.forEach(tabla => {
        tabla.addEventListener("input", function (event) {
            if (event.target.tagName === "INPUT") {
                calcularTablaSecundaria(tabla.id);
            }
        });
    });
}

// Función para calcular cualquier tabla secundaria
function calcularTablaSecundaria(tablaID) {
    let filas = document.querySelectorAll(`#${tablaID} tbody tr`);

    let subtotalNuestras = 0;
    let subtotalEnemigo = 0;

    filas.forEach((fila) => {
        let inputs = fila.getElementsByTagName("input");

        if (inputs.length >= 10) { // Asegurar que la fila tiene los campos necesarios
            let cant = parseFloat(inputs[0].value) || 0;
            let aprobacion = parseFloat(inputs[1].value) || 0;
            let coef = parseFloat(inputs[3].value) || 1;

            let cantEne = parseFloat(inputs[5].value) || 0;
            let aprobacionEne = parseFloat(inputs[6].value) || 0;
            let coefEne = parseFloat(inputs[8].value) || 1;

            let cantReal = cant * aprobacion;
            inputs[2].value = cantReal.toFixed(2); // CANT REAL

            let cantRealEne = cantEne * aprobacionEne;
            inputs[7].value = cantRealEne.toFixed(2); // CANT REAL ENEMIGO

            let total = cantReal * coef;
            inputs[4].value = total.toFixed(2); // TOTAL NUESTRAS
            subtotalNuestras += total;

            let totalEne = cantRealEne * coefEne;
            inputs[9].value = totalEne.toFixed(2); // TOTAL ENEMIGO
            subtotalEnemigo += totalEne;
        }
    });

    // Insertar los subtotales en la tabla
    let subtotalInputs = document.querySelectorAll(`#${tablaID} tbody tr:last-child input`);
    if (subtotalInputs.length >= 2) {
        subtotalInputs[0].value = subtotalNuestras.toFixed(2);
        subtotalInputs[1].value = subtotalEnemigo.toFixed(2);
    }

    let potComb = subtotalNuestras !== 0 ? subtotalEnemigo / subtotalNuestras : 0;
    let totalInputs = document.querySelectorAll(`#${tablaID} tbody td:last-child input`);
    if (totalInputs.length > 0) {
        totalInputs[0].value = potComb.toFixed(2);
    }

    // Actualizar la tabla principal después de recalcular la tabla secundaria
    actualizarTablaPrincipal();
}

// Función para actualizar la tabla principal con los valores de las secundarias
function actualizarTablaPrincipal() {
    const categoria = "politica"; // Cambiar según la pestaña (ej: "economia", "social")
    const factores = {
        "gobierno-central_politica": "gobierno-central",
        "partidos-politicos_politica": "partidos-politicos",
        "gobiernos-locales_politica": "gobiernos-locales",
        "relaciones-internacionales_politica": "relaciones-internacionales"
    };

    let totalNuestras = 0, totalEnemigo = 0;

    Object.entries(factores).forEach(([factor, idBase]) => {
        let subtotalNuestrasInput = document.querySelector(`#${factor} tbody tr:last-child input`);
        let subtotalEnemigoInput = document.querySelector(`#${factor} tbody tr:last-child td:last-child input`);

        let subtotalNuestras = subtotalNuestrasInput ? parseFloat(subtotalNuestrasInput.value) || 0 : 0;
        let subtotalEnemigo = subtotalEnemigoInput ? parseFloat(subtotalEnemigoInput.value) || 0 : 0;

        let coefNuestras = parseFloat(document.getElementById(`coef-${idBase}`).value) || 1;
        let coefEnemigo = parseFloat(document.getElementById(`coef-${idBase}-enemigo`).value) || 1;

        let totalNuestrasFactor = subtotalNuestras * coefNuestras;
        let totalEnemigoFactor = subtotalEnemigo * coefEnemigo;

        ["", "_master"].forEach(sufijo => {
            document.getElementById(`cant-${idBase}${sufijo}`).value = subtotalNuestras.toFixed(2);
            document.getElementById(`total-${idBase}${sufijo}`).value = totalNuestrasFactor.toFixed(2);
            document.getElementById(`cant-${idBase}-enemigo${sufijo}`).value = subtotalEnemigo.toFixed(2);
            document.getElementById(`total-${idBase}-enemigo${sufijo}`).value = totalEnemigoFactor.toFixed(2);
        });

        totalNuestras += totalNuestrasFactor;
        totalEnemigo += totalEnemigoFactor;
    });

    ["", "_master"].forEach(sufijo => {
        document.getElementById(`subtotal-nuestras${sufijo}`).value = totalNuestras.toFixed(2);
        document.getElementById(`subtotal-enemigo${sufijo}`).value = totalEnemigo.toFixed(2);
    });

    let potComb = totalNuestras !== 0 ? totalEnemigo / totalNuestras : 0;
    ["", "_master"].forEach(sufijo => {
        document.getElementById(`potcomb-politica${sufijo}`).value = potComb.toFixed(2);
    });

    actualizarGraficos(categoria); // Ahora llama a la función genérica
}

// GUARDAR DATOS
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        console.log("🔹 Restaurando valores en política...");
        loadAllTableDataPolitica(); // 🔥 Restaurar valores SOLO de Política
    }, 100);

    document.querySelectorAll("#politica input[type='number']").forEach((input, index) => {
        input.dataset.index = `politica_${index}`;
        input.addEventListener("input", function () {
            console.log(`📝 Guardando en Política: Index ${index} = ${input.value}`);
        });
    });
});

// 🔹 Guardar SOLO los valores de Política en `localStorage`
function saveAllTableDataPolitica() {
    let tableData = [];

    document.querySelectorAll("#politica input[type='number']").forEach((input, index) => {
        tableData[index] = input.value;
        console.log(`✅ Guardado en Política: Index ${index} = ${input.value}`);
    });

    localStorage.setItem("allTableDataPolitica", JSON.stringify(tableData));
    console.log("📦 Datos guardados en localStorage para Política:", tableData);
}

// 🔹 Cargar SOLO los valores de Política desde `localStorage`
function loadAllTableDataPolitica() {
    let storedData = JSON.parse(localStorage.getItem("allTableDataPolitica")) || [];
    console.log("📥 Cargando datos de Política desde localStorage:", storedData);

    document.querySelectorAll("#politica input[type='number']").forEach((input, index) => {
        if (storedData[index] !== undefined) {
            input.value = storedData[index];
            console.log(`🔄 Restaurado en Política: Index ${index} = ${input.value}`);
        }
    });
}
