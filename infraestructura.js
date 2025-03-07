function addTableListenersInfraestructura() {
    const tablasSecundarias = document.querySelectorAll(".tabla-secundaria"); 

    tablasSecundarias.forEach(tabla => {
        tabla.addEventListener("input", function (event) {
            if (event.target.tagName === "INPUT") {
                calcularTablaSecundariaInfraestructura(tabla.id);
            }
        });
    });
}

// Función para calcular cualquier tabla secundaria
function calcularTablaSecundariaInfraestructura(tablaID) {
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
    actualizarTablaPrincipalInfraestructura();
}

// Función para actualizar la tabla principal con los valores de las secundarias
function actualizarTablaPrincipalInfraestructura() {
    const categoria = "infraestructura";
    const factores = {
        "hidroelectrica": "hidroelectrica",
        "represas": "represas",
        "refineria": "refineria",
        "puertos": "puertos",
        "aeropuertos": "aeropuertos",
        "vial": "vial"
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
    document.getElementById("subtotal-nuestras-infraestructura").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo-infraestructura").value = totalEnemigo.toFixed(2);
    //Agregar a la tabla maestra
    document.getElementById("subtotal-nuestras-infraestructura_master").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo-infraestructura_master").value = totalEnemigo.toFixed(2);


    // Calcular POT COMB
    let potComb = totalNuestras !== 0 ? totalEnemigo / totalNuestras : 0;
    document.getElementById("potcomb-politica-infraestructura").value = potComb.toFixed(2);
    //Agregar a la tabla maestra
    document.getElementById("potcomb-politica-infraestructura_master").value = potComb.toFixed(2);

    actualizarGraficos(categoria);
}


// GUARDAR DATOS
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        console.log("🔹 Restaurando valores en infraestructura...");
        loadAllTableDataInfraestructura(); // 🔥 Restaurar valores SOLO de infraestructura
    }, 100);

    document.querySelectorAll("#infraestructura input[type='number']").forEach((input, index) => {
        input.dataset.index = `infraestructura_${index}`;
        input.addEventListener("input", function () {
            console.log(`📝 Guardando en infraestructura: Index ${index} = ${input.value}`);
        });
    });
});

// 🔹 Guardar SOLO los valores de infraestructura en `localStorage`
function saveAllTableDataInfraestructura() {
    let tableData_infraestructura = [];

    document.querySelectorAll("#infraestructura input[type='number']").forEach((input, index) => {
        tableData_infraestructura[index] = input.value;
        console.log(`✅ Guardado en infraestructura: Index ${index} = ${input.value}`);
    });

    localStorage.setItem("allTableDatainfraestructura", JSON.stringify(tableData_infraestructura));
    console.log("📦 Datos guardados en localStorage para infraestructura:", tableData_infraestructura);
}

// 🔹 Cargar SOLO los valores de infraestructura desde `localStorage`
function loadAllTableDataInfraestructura() {
    let storedData_infraestructura = JSON.parse(localStorage.getItem("allTableDatainfraestructura")) || [];
    console.log("📥 Cargando datos de infraestructura desde localStorage:", storedData_infraestructura);

    document.querySelectorAll("#infraestructura input[type='number']").forEach((input, index) => {
        if (storedData_infraestructura[index] !== undefined) {
            input.value = storedData_infraestructura[index];
            console.log(`🔄 Restaurado en infraestructura: Index ${index} = ${input.value}`);
        }
    });
}


