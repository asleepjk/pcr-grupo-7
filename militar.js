function addTableListenersMilitar() {
    const tablasSecundarias = document.querySelectorAll(".tabla-secundaria"); 
    const tablasSecundariasShort = document.querySelectorAll(".tabla-secundaria-short"); 

    tablasSecundarias.forEach(tabla => {
        tabla.addEventListener("input", function (event) {
            if (event.target.tagName === "INPUT") {
                calcularTablaSecundariaMilitar(tabla.id);
            }
        });
    });

    tablasSecundariasShort.forEach(tabla => {
        tabla.addEventListener("input", function (event) {
            if (event.target.tagName === "INPUT") {
                calcularTablaSecundariaMilitarShort(tabla.id);
            }
        });
    });
}

// Función para calcular cualquier tabla secundaria
function calcularTablaSecundariaMilitar(tablaID) {
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
    actualizarTablaPrincipalMilitar();
}

// Función para calcular cualquier tabla secundaria
function calcularTablaSecundariaMilitarShort(tablaID) {
    let filas = document.querySelectorAll(`#${tablaID} tbody tr`);

    let subtotalNuestras = 0;
    let subtotalEnemigo = 0;

    filas.forEach((fila) => {
        let inputs = fila.getElementsByTagName("input");

        if (inputs.length >= 6) { // Cambiar la cantidad de columnas
            let cant = parseFloat(inputs[0].value) || 0;
            //let aprobacion = parseFloat(inputs[1].value) || 0;
            let coef = parseFloat(inputs[1].value) || 1;

            let cantEne = parseFloat(inputs[3].value) || 0;
            //let aprobacionEne = parseFloat(inputs[6].value) || 0;
            let coefEne = parseFloat(inputs[4].value) || 1;

            //let cantReal = cant * aprobacion;
            //inputs[2].value = cantReal.toFixed(2); // CANT REAL

            //let cantRealEne = cantEne * aprobacionEne;
            //inputs[7].value = cantRealEne.toFixed(2); // CANT REAL ENEMIGO

            let total = cant * coef;
            inputs[2].value = total.toFixed(2); // TOTAL NUESTRAS
            subtotalNuestras += total;

            let totalEne = cantEne * coefEne;
            inputs[5].value = totalEne.toFixed(2); // TOTAL ENEMIGO
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
    actualizarTablaPrincipalMilitar();
}

// Función para actualizar la tabla principal con los valores de las secundarias
function actualizarTablaPrincipalMilitar() {
    const factores = {
        "ft": "ft",
        "fn": "fn",
        "fa": "fa",
        "experiencia": "experiencia",
        "liderazgo": "liderazgo"
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

        //Agregar a tablas maestras
        document.getElementById(`cant-${idBase}_master`).value = subtotalNuestras.toFixed(2);
        document.getElementById(`total-${idBase}_master`).value = totalNuestrasFactor.toFixed(2);

        document.getElementById(`cant-${idBase}-enemigo_master`).value = subtotalEnemigo.toFixed(2);
        document.getElementById(`total-${idBase}-enemigo_master`).value = totalEnemigoFactor.toFixed(2);

        // Acumulamos los totales generales
        totalNuestras += totalNuestrasFactor;
        totalEnemigo += totalEnemigoFactor;
    });

    // Insertamos los subtotales en la tabla principal
    document.getElementById("subtotal-nuestras-militar").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo-militar").value = totalEnemigo.toFixed(2);

    // Agregar a tabla maestra
    document.getElementById("subtotal-nuestras-militar_master").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo-militar_master").value = totalEnemigo.toFixed(2);

    // Calcular POT COMB
    let potComb = totalNuestras !== 0 ? totalEnemigo / totalNuestras : 0;
    document.getElementById("potcomb-militar").value = potComb.toFixed(2);
    document.getElementById("potcomb-militar_master").value = potComb.toFixed(2);
}


// GUARDAR DATOS
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        console.log("🔹 Restaurando valores en militar...");
        loadAllTableDataMilitar(); // 🔥 Restaurar valores SOLO de Militar
    }, 100);

    document.querySelectorAll("#militar input[type='number']").forEach((input, index) => {
        input.dataset.index = `militar_${index}`;
        input.addEventListener("input", function () {
            console.log(`📝 Guardando en Militar: Index ${index} = ${input.value}`);
        });
    });
});

// 🔹 Guardar SOLO los valores de Militar en `localStorage`
function saveAllTableDataMilitar() {
    let tableData_mil = [];

    document.querySelectorAll("#militar input[type='number']").forEach((input, index) => {
        tableData_mil[index] = input.value;
        console.log(`✅ Guardado en Militar: Index ${index} = ${input.value}`);
    });

    localStorage.setItem("allTableDataMilitar", JSON.stringify(tableData_mil));
    console.log("📦 Datos guardados en localStorage para Militar:", tableData_mil);
}

// 🔹 Cargar SOLO los valores de Militar desde `localStorage`
function loadAllTableDataMilitar() {
    let storedData_mil = JSON.parse(localStorage.getItem("allTableDataMilitar")) || [];
    console.log("📥 Cargando datos de Militar desde localStorage:", storedData_mil);

    document.querySelectorAll("#militar input[type='number']").forEach((input, index) => {
        if (storedData_mil[index] !== undefined) {
            input.value = storedData_mil[index];
            console.log(`🔄 Restaurado en Militar: Index ${index} = ${input.value}`);
        }
    });
}