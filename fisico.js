function addTableListenersFisico() {
    const tablasSecundarias = document.querySelectorAll(".tabla-secundaria"); 

    tablasSecundarias.forEach(tabla => {
        tabla.addEventListener("input", function (event) {
            if (event.target.tagName === "INPUT") {
                calcularTablaSecundariaFisico(tabla.id);
            }
        });
    });
}

// Función para calcular cualquier tabla secundaria
function calcularTablaSecundariaFisico(tablaID) {
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
    actualizarTablaPrincipalFisico();
}

// Función para actualizar la tabla principal con los valores de las secundarias
function actualizarTablaPrincipalFisico() {
    const factores = {
        "relieve": "relieve",
        "vegetacion": "vegetacion",
        "hidrografia": "hidrografia",
        "arte": "arte",
        "localidades": "localidades",
        "naturaleza": "naturaleza"
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

        //Agregar a la tabla maestra
        document.getElementById(`cant-${idBase}_master`).value = subtotalNuestras.toFixed(2);
        document.getElementById(`total-${idBase}_master`).value = totalNuestrasFactor.toFixed(2);

        document.getElementById(`cant-${idBase}-enemigo_master`).value = subtotalEnemigo.toFixed(2);
        document.getElementById(`total-${idBase}-enemigo_master`).value = totalEnemigoFactor.toFixed(2);


        // Acumulamos los totales generales
        totalNuestras += totalNuestrasFactor;
        totalEnemigo += totalEnemigoFactor;
    });

    // Insertamos los subtotales en la tabla principal
    document.getElementById("subtotal-nuestras-fisico").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo-fisico").value = totalEnemigo.toFixed(2);
    // Agregar a la tabla maestra
    document.getElementById("subtotal-nuestras-fisico_master").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo_master").value = totalEnemigo.toFixed(2);


    // Calcular POT COMB
    let potComb = totalNuestras !== 0 ? totalEnemigo / totalNuestras : 0;
    document.getElementById("potcomb-politica-fisico").value = potComb.toFixed(2);
    // Agregar a la tabla maestra
    document.getElementById("potcomb-politica-fisico_master").value = potComb.toFixed(2);
}

// GUARDAR DATOS
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        console.log("🔹 Restaurando valores en fisico...");
        loadAllTableDataFisico(); // 🔥 Restaurar valores SOLO de fisico
    }, 100);

    document.querySelectorAll("#fisico input[type='number']").forEach((input, index) => {
        input.dataset.index = `fisico_${index}`;
        input.addEventListener("input", function () {
            console.log(`📝 Guardando en fisico: Index ${index} = ${input.value}`);
        });
    });
});

// 🔹 Guardar SOLO los valores de fisico en `localStorage`
function saveAllTableDataFisico() {
    let tableData_fisico = [];

    document.querySelectorAll("#fisico input[type='number']").forEach((input, index) => {
        tableData_fisico[index] = input.value;
        console.log(`✅ Guardado en fisico: Index ${index} = ${input.value}`);
    });

    localStorage.setItem("allTableDatafisico", JSON.stringify(tableData_fisico));
    console.log("📦 Datos guardados en localStorage para fisico:", tableData_fisico);
}

// 🔹 Cargar SOLO los valores de fisico desde `localStorage`
function loadAllTableDataFisico() {
    let storedData_fisico = JSON.parse(localStorage.getItem("allTableDatafisico")) || [];
    console.log("📥 Cargando datos de fisico desde localStorage:", storedData_fisico);

    document.querySelectorAll("#fisico input[type='number']").forEach((input, index) => {
        if (storedData_fisico[index] !== undefined) {
            input.value = storedData_fisico[index];
            console.log(`🔄 Restaurado en fisico: Index ${index} = ${input.value}`);
        }
    });
}

