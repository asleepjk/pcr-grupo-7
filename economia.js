function addTableListenersEconomia() {
    const tablasSecundarias = document.querySelectorAll(".tabla-secundaria"); 

    tablasSecundarias.forEach(tabla => {
        tabla.addEventListener("input", function (event) {
            if (event.target.tagName === "INPUT") {
                calcularTablaSecundariaEconomia(tabla.id);
            }
        });
    });
}

// Función para calcular cualquier tabla secundaria
function calcularTablaSecundariaEconomia(tablaID) {
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
    actualizarTablaPrincipalEconomia();
}

// Función para actualizar la tabla principal con los valores de las secundarias
function actualizarTablaPrincipalEconomia() {
    const categoria = "economia";
    const factores = {
        "produccion-economia": "produccion-economia",
        "distribucion-economia": "distribucion-economia",
        "consumo-economia": "consumo-economia",
        "defensa-economia": "defensa-economia",
        "reserva-economia": "reserva-economia",
        "informal-economia": "informal-economia"
    }

    let totalNuestras = 0;
    let totalEnemigo = 0;

    Object.entries(factores).forEach(([factor, idBase]) => {
        let subtotalNuestrasInput = document.querySelector(`#${factor} tbody tr:last-child input`);
        let subtotalEnemigoInput = document.querySelector(`#${factor} tbody tr:last-child td:last-child input`);

        let subtotalNuestras = subtotalNuestrasInput ? parseFloat(subtotalNuestrasInput.value) || 0 : 0;
        let subtotalEnemigo = subtotalEnemigoInput ? parseFloat(subtotalEnemigoInput.value) || 0 : 0;

        let coefNuestras = parseFloat(document.getElementById(`coef-${idBase}`).value) || 1;
        let coefEnemigo = parseFloat(document.getElementById(`coef-${idBase}-enemigo`).value) || 1;

        let totalNuestrasFactor = subtotalNuestras * coefNuestras;
        let totalEnemigoFactor = subtotalEnemigo * coefEnemigo;

        // Asignamos los valores correspondientes en la tabla principal
        document.getElementById(`cant-${idBase}`).value = subtotalNuestras.toFixed(2);
        document.getElementById(`total-${idBase}`).value = totalNuestrasFactor.toFixed(2);

        document.getElementById(`cant-${idBase}-enemigo`).value = subtotalEnemigo.toFixed(2);
        document.getElementById(`total-${idBase}-enemigo`).value = totalEnemigoFactor.toFixed(2);

        // Agregar tabla maestra
        document.getElementById(`cant-${idBase}_master`).value = subtotalNuestras.toFixed(2);
        document.getElementById(`total-${idBase}_master`).value = totalNuestrasFactor.toFixed(2);

        document.getElementById(`cant-${idBase}-enemigo_master`).value = subtotalEnemigo.toFixed(2);
        document.getElementById(`total-${idBase}-enemigo_master`).value = totalEnemigoFactor.toFixed(2);

        // Acumulamos los totales generales
        totalNuestras += totalNuestrasFactor;
        totalEnemigo += totalEnemigoFactor;

        actualizarGraficos(categoria);
    });

    // Insertamos los subtotales en la tabla principal
    document.getElementById("subtotal-nuestras-economia").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo-economia").value = totalEnemigo.toFixed(2);

    // Agregar tabla maestra
    document.getElementById("subtotal-nuestras-economia_master").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo-economia_master").value = totalEnemigo.toFixed(2);

    // Calcular POT COMB
    let potComb = totalNuestras !== 0 ? totalEnemigo / totalNuestras : 0;
    document.getElementById("potcomb-politica-economia").value = potComb.toFixed(2);
    // Agregar tabla maestra
    document.getElementById("potcomb-politica-economia_master").value = potComb.toFixed(2);
}

// GUARDAR DATOS
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        console.log("🔹 Restaurando valores en política...");
        loadTabTableDataEconomia(); // 🔥 Restaurar valores en todas las tablas (principal y secundarias)
    }, 0);

    document.querySelectorAll("input[type='number']").forEach((input, index) => {
        input.dataset.index = index; // 🔥 Guardar la posición del input como identificador único
        input.addEventListener("input", function () {
            console.log(`📝 Guardando en tabla secundaria: Index ${index} = ${input.value}`);
            saveAllTableDataEconomia();
        });
    });
});

// 🔹 Guardar TODOS los valores en `localStorage`
function saveAllTableDataEconomia() {
    let tableData = [];
    
    document.querySelectorAll("input[type='number']").forEach((input, index) => {
        tableData[index] = input.value; // 🔥 Guardar cada valor por su posición en la tabla
        console.log(`✅ Guardado: Index ${index} = ${input.value}`);
    });

    localStorage.setItem("allTableData", JSON.stringify(tableData));
    console.log("📦 Datos guardados en localStorage:", tableData);
}

// 🔹 Restaurar valores de TODAS las tablas de `politica.html`
function loadTabTableDataEconomia() {
    let storedData = JSON.parse(localStorage.getItem("allTableData")) || [];
    console.log("📥 Cargando datos desde localStorage:", storedData);

    setTimeout(() => {
        document.querySelectorAll("input[type='number']").forEach((input, index) => {
            if (storedData[index] !== undefined) {
                input.value = storedData[index]; // 🔥 Restaurar el valor basado en su posición
                console.log(`🔄 Restaurado: Index ${index} = ${input.value}`);
            }
        });
    }, 0);
}


// GUARDAR DATOS
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        console.log("🔹 Restaurando valores en economia...");
        loadAllTableDataEconomia(); // 🔥 Restaurar valores SOLO de economia
    }, 100);

    document.querySelectorAll("#economia input[type='number']").forEach((input, index) => {
        input.dataset.index = `economia_${index}`;
        input.addEventListener("input", function () {
            console.log(`📝 Guardando en economia: Index ${index} = ${input.value}`);
        });
    });
});

// 🔹 Guardar SOLO los valores de economia en `localStorage`
function saveAllTableDataEconomia() {
    let tableData_eco = [];

    document.querySelectorAll("#economia input[type='number']").forEach((input, index) => {
        tableData_eco[index] = input.value;
        console.log(`✅ Guardado en economia: Index ${index} = ${input.value}`);
    });

    localStorage.setItem("allTableDataeconomia", JSON.stringify(tableData_eco));
    console.log("📦 Datos guardados en localStorage para economia:", tableData_eco);
}

// 🔹 Cargar SOLO los valores de economia desde `localStorage`
function loadAllTableDataEconomia() {
    let storedData_eco = JSON.parse(localStorage.getItem("allTableDataeconomia")) || [];
    console.log("📥 Cargando datos de economia desde localStorage:", storedData_eco);

    document.querySelectorAll("#economia input[type='number']").forEach((input, index) => {
        if (storedData_eco[index] !== undefined) {
            input.value = storedData_eco[index];
            console.log(`🔄 Restaurado en economia: Index ${index} = ${input.value}`);
        }
    });
}
