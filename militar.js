function addMainTableListenersMilitar() {
    // Busca la tabla principal usando su id
    const mainTable = document.getElementById("fa");
    if (mainTable) {
      // Agrega un listener de "input" a la tabla para detectar cambios en cualquiera de sus inputs
      mainTable.addEventListener("input", function (event) {
        if (event.target.tagName.toUpperCase() === "INPUT") {
          recalcAll();
        }
      });
      // Ejecuta la función de cálculo inicial
      recalcAll();
    }
  }

function addTableListenersMilitar() {
    const tablasSecundarias = document.querySelectorAll(".tabla-secundaria"); 
    const tablasSecundariasShort = document.querySelectorAll(".tabla-secundaria-short"); 
    const tablasSecundariasDDEE = document.querySelectorAll(".tabla-secundaria-mil");
    const tablasSecundariasCOL = document.querySelectorAll(".tabla-secundaria-col");

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

    tablasSecundariasCOL.forEach(tabla => {
        tabla.addEventListener("input", function (event) {
            if (event.target.tagName === "INPUT") {
                calcularTablaSecundariaCOL(tabla.id);
            }
        });
    });

    tablasSecundariasDDEE.forEach(tabla => {
        tabla.addEventListener("input", function (event) {
            if (event.target.tagName === "INPUT") {
                calcularTablaSecundariaDDEE(tabla.id);
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
function calcularTablaSecundariaDDEE(tablaID) {
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
    actualizarTablaDDEE();
}

// Función para calcular cualquier tabla secundaria
function calcularTablaSecundariaCOL(tablaID) {
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
    actualizarTablaDDEECOL();
}

//  CALCULAR POR DIVISIONES POR DIVISIONES

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

////////////// Función para actualizar la tabla DDEE/////////////////
function actualizarTablaDDEE() {
    const factores = {
        "ide-maniobra": "maniobra",
        "iide-maniobra": "maniobra",
        "iiide-maniobra": "maniobra",
        "ivde-maniobra": "maniobra",
        "vde-maniobra": "maniobra",

        "ide-fgos": "fgos",
        "iide-fgos": "fgos",
        "iiide-fgos": "fgos",
        "ivde-fgos": "fgos",

        "ide-proteccion": "proteccion",
        "iide-proteccion": "proteccion",
        "iiide-proteccion": "proteccion",
        "ivde-proteccion": "proteccion",
        "vde-proteccion": "proteccion",

        "ide-sost": "sost",
        "iide-sost": "sost",
        "iiide-sost": "sost",
        "ivde-sost": "sost",
        "vde-sost": "sost",

        "ide-c2": "c2",
        "iide-c2": "c2",
        "iiide-c2": "c2",
        "ivde-c2": "c2",
        "vde-c2": "c2",

        "intg-peru": "intg",
    };

    // Crear un objeto para almacenar los valores separados por cada idBase
    let totalesPorFactor = {};

    // Inicializar los totales por cada idBase
    Object.values(factores).forEach(idBase => {
        totalesPorFactor[idBase] = 0;
    });

    // Recorrer los factores y acumular valores en el objeto correspondiente
    Object.entries(factores).forEach(([factor, idBase]) => {
        let subtotalNuestrasInput = document.querySelector(`#${factor} tbody tr:last-child input`);

        let subtotalNuestras = subtotalNuestrasInput ? parseFloat(subtotalNuestrasInput.value) || 0 : 0;
        totalesPorFactor[idBase] += subtotalNuestras; // Acumular solo dentro de cada idBase
    });

    // Asignar los valores correctos a los inputs correspondientes
    Object.entries(totalesPorFactor).forEach(([idBase, total]) => {
        let input = document.getElementById(`cant-peru-${idBase}`);
        let inputTabla = document.getElementById(`cant-peru-${idBase}-resumen`);
        if (input && inputTabla) {
            input.value = total;
            inputTabla.value = total;
        }
        console.log(`cant-peru-${idBase}: ${total}`);
    });

    //actualizarGraficos(categoria);
}

////////////// Función para actualizar la tabla DDEE COL/////////////////
function actualizarTablaDDEECOL() {
    const factores = {
        "ide-maniobra-col": "maniobra",
        "iide-maniobra-col": "maniobra",
        "iiide-maniobra-col": "maniobra",
        "ivde-maniobra-col": "maniobra",
        "vde-maniobra-col": "maniobra",

        "ide-fgos-col": "fgos",
        "iide-fgos-col": "fgos",
        "iiide-fgos-col": "fgos",
        "ivde-fgos-col": "fgos",

        "ide-proteccion-col": "proteccion",
        "iide-proteccion-col": "proteccion",
        "iiide-proteccion-col": "proteccion",
        "ivde-proteccion-col": "proteccion",
        "vde-proteccion-col": "proteccion",

        "ide-sost-col": "sost",
        "iide-sost-col": "sost",
        "iiide-sost-col": "sost",
        "ivde-sost-col": "sost",
        "vde-sost-col": "sost",

        "ide-c2-col": "c2",
        "iide-c2-col": "c2",
        "iiide-c2-col": "c2",
        "ivde-c2-col": "c2",
        "vde-c2-col": "c2",

        "intg-col": "intg",
    };

    // Crear un objeto para almacenar los valores separados por cada idBase
    let totalesPorFactor = {};

    // Inicializar los totales por cada idBase
    Object.values(factores).forEach(idBase => {
        totalesPorFactor[idBase] = 0;
    });

    // Recorrer los factores y acumular valores en el objeto correspondiente
    Object.entries(factores).forEach(([factor, idBase]) => {
        let subtotalNuestrasInput = document.querySelector(`#${factor} tbody tr:last-child td:last-child input`);
        
        let subtotalNuestras = subtotalNuestrasInput ? parseFloat(subtotalNuestrasInput.value) || 0 : 0;
        totalesPorFactor[idBase] += subtotalNuestras; // Acumular solo dentro de cada idBase
    });

    // Asignar los valores correctos a los inputs correspondientes
    Object.entries(totalesPorFactor).forEach(([idBase, total]) => {
        let input = document.getElementById(`cant-col-${idBase}`);
        let inputTabla = document.getElementById(`cant-col-${idBase}-resumen`);
        if (input) {
            input.value = total;
            inputTabla.value = total;
        }
        console.log(`cant-col-${idBase}: ${total}`);
    });

    //actualizarGraficos(categoria);
}

// Función para actualizar la tabla principal con los valores de las secundarias
function actualizarTablaPrincipalMilitar() {
    const categoria = "militar";
    const factores = {
        "ft": "ft",
        "fn": "fn",
        "experiencia": "experiencia",
        "liderazgo": "liderazgo"
    };

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

        // Actualizamos los inputs internos de la tabla para este factor
        document.getElementById(`cant-${idBase}`).value = subtotalNuestras.toFixed(2);
        document.getElementById(`total-${idBase}`).value = totalNuestrasFactor.toFixed(2);

        document.getElementById(`cant-${idBase}-enemigo`).value = subtotalEnemigo.toFixed(2);
        document.getElementById(`total-${idBase}-enemigo`).value = totalEnemigoFactor.toFixed(2);

        // Actualizamos las tablas maestras
        document.getElementById(`cant-${idBase}_master`).value = subtotalNuestras.toFixed(2);
        document.getElementById(`total-${idBase}_master`).value = totalNuestrasFactor.toFixed(2);

        document.getElementById(`cant-${idBase}-enemigo_master`).value = subtotalEnemigo.toFixed(2);
        document.getElementById(`total-${idBase}-enemigo_master`).value = totalEnemigoFactor.toFixed(2);

        // Acumulamos los totales generales
        totalNuestras += totalNuestrasFactor;
        totalEnemigo += totalEnemigoFactor;
    });

    // Agregamos los valores de FA (ya presentes en la tabla) a los totales generales
    let faTotalNuestras = parseFloat(document.getElementById("total-fa_master").value) || 0;
    let faTotalEnemigo = parseFloat(document.getElementById("total-fa-enemigo_master").value) || 0;
    totalNuestras += faTotalNuestras;
    totalEnemigo += faTotalEnemigo;

    // Actualizamos los subtotales generales en la tabla principal
    document.getElementById("subtotal-nuestras-militar").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo-militar").value = totalEnemigo.toFixed(2);

    // Actualizamos también en la tabla maestra
    document.getElementById("subtotal-nuestras-militar_master").value = totalNuestras.toFixed(2);
    document.getElementById("subtotal-enemigo-militar_master").value = totalEnemigo.toFixed(2);

    // Calculamos POT COMB (división de total enemigo sobre total nuestras)
    let potComb = totalNuestras !== 0 ? totalEnemigo / totalNuestras : 0;
    document.getElementById("potcomb-militar").value = potComb.toFixed(2);
    document.getElementById("potcomb-militar_master").value = potComb.toFixed(2);

    // Finalmente, se envía la información a los gráficos (incluyendo FA)
    actualizarGraficos(categoria);
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

// calculo para FA tabla
     // Al cargarse el documento se asignan los event listeners a todos los inputs

     function recalcItemRow(row) {
        try {
          // --- Nuestras Fuerzas ---
          const friendlyCantInput = row.cells[1] && row.cells[1].querySelector("input");
          let friendlyCant = friendlyCantInput ? Number(friendlyCantInput.value) || 0 : 0;
          // Si el nombre (celda 0) contiene "personal disponible", usamos CANT directamente
          let nameText = row.cells[0] ? row.cells[0].textContent.trim().toLowerCase() : "";
          let friendlyCantRelat = nameText.includes("personal disponible")
                                  ? friendlyCant
                                  : friendlyCant * friendlyCant;
          let friendlyCantRelatInput = row.cells[2] && row.cells[2].querySelector("input");
          if (friendlyCantRelatInput) {
            friendlyCantRelatInput.value = friendlyCantRelat.toFixed(2);
          }
          const friendlyEfectInput = row.cells[3] && row.cells[3].querySelector("input");
          const friendlyCoefInput = row.cells[4] && row.cells[4].querySelector("input");
          let friendlyEfect = friendlyEfectInput ? Number(friendlyEfectInput.value) || 0 : 0;
          let friendlyCoef = friendlyCoefInput ? Number(friendlyCoefInput.value) || 0 : 0;
          let friendlyTotal = friendlyCantRelat * friendlyEfect * friendlyCoef;
          let friendlyTotalInput = row.cells[5] && row.cells[5].querySelector("input");
          if (friendlyTotalInput) {
            friendlyTotalInput.value = friendlyTotal.toFixed(2);
          }
        
          // --- Enemigo ---
          const enemyCantInput = row.cells[7] && row.cells[7].querySelector("input");
          let enemyCant = enemyCantInput ? Number(enemyCantInput.value) || 0 : 0;
          // La misma lógica de excepción para "personal disponible" se aplica en ambos lados
          let enemyCantRelat = nameText.includes("personal disponible")
                                  ? enemyCant
                                  : enemyCant * enemyCant;
          let enemyCantRelatInput = row.cells[8] && row.cells[8].querySelector("input");
          if (enemyCantRelatInput) {
            enemyCantRelatInput.value = enemyCantRelat.toFixed(2);
          }
          const enemyEfectInput = row.cells[9] && row.cells[9].querySelector("input");
          const enemyCoefInput = row.cells[10] && row.cells[10].querySelector("input");
          let enemyEfect = enemyEfectInput ? Number(enemyEfectInput.value) || 0 : 0;
          let enemyCoef = enemyCoefInput ? Number(enemyCoefInput.value) || 0 : 0;
          let enemyTotal = enemyCantRelat * enemyEfect * enemyCoef;
          let enemyTotalInput = row.cells[11] && row.cells[11].querySelector("input");
          if (enemyTotalInput) {
            enemyTotalInput.value = enemyTotal.toFixed(2);
          }
        } catch (error) {
          console.error("Error en recalcItemRow:", error, row);
        }
      }
      
      function recalcSubtotalRow(subRow) {
        try {
          // Se usa el data-category de la fila de subtotal para agrupar sus ítems
          let category = subRow.getAttribute("data-category");
          const itemRows = document.querySelectorAll(`#fa tr[data-category="${category}"]:not([data-subtotal])`);
          // --- Nuestras Fuerzas ---
          let sumFriendlyCantRelat = 0;
          itemRows.forEach(row => {
            let input = row.cells[2] && row.cells[2].querySelector("input");
            let val = input ? Number(input.value) || 0 : 0;
            sumFriendlyCantRelat += val;
          });
          let friendlyCantRelatSubtotal = subRow.cells[2] && subRow.cells[2].querySelector("input");
          if (friendlyCantRelatSubtotal) {
            friendlyCantRelatSubtotal.value = sumFriendlyCantRelat.toFixed(2);
          }
          const friendlyEfectSubtotalInput = subRow.cells[3] && subRow.cells[3].querySelector("input");
          const friendlyCoefSubtotalInput = subRow.cells[4] && subRow.cells[4].querySelector("input");
          let friendlyEfectSubtotal = friendlyEfectSubtotalInput ? Number(friendlyEfectSubtotalInput.value) || 0 : 0;
          let friendlyCoefSubtotal = friendlyCoefSubtotalInput ? Number(friendlyCoefSubtotalInput.value) || 0 : 0;
          let friendlySubtotalTotal = sumFriendlyCantRelat * friendlyEfectSubtotal * friendlyCoefSubtotal;
          let friendlySubtotalTotalInput = subRow.cells[5] && subRow.cells[5].querySelector("input");
          if (friendlySubtotalTotalInput) {
            friendlySubtotalTotalInput.value = friendlySubtotalTotal.toFixed(2);
          }
        
          // --- Enemigo ---
          let sumEnemyCantRelat = 0;
          itemRows.forEach(row => {
            let input = row.cells[8] && row.cells[8].querySelector("input");
            let val = input ? Number(input.value) || 0 : 0;
            sumEnemyCantRelat += val;
          });
          let enemyCantRelatSubtotal = subRow.cells[8] && subRow.cells[8].querySelector("input");
          if (enemyCantRelatSubtotal) {
            enemyCantRelatSubtotal.value = sumEnemyCantRelat.toFixed(2);
          }
          const enemyEfectSubtotalInput = subRow.cells[9] && subRow.cells[9].querySelector("input");
          const enemyCoefSubtotalInput = subRow.cells[10] && subRow.cells[10].querySelector("input");
          let enemyEfectSubtotal = enemyEfectSubtotalInput ? Number(enemyEfectSubtotalInput.value) || 0 : 0;
          let enemyCoefSubtotal = enemyCoefSubtotalInput ? Number(enemyCoefSubtotalInput.value) || 0 : 0;
          let enemySubtotalTotal = sumEnemyCantRelat * enemyEfectSubtotal * enemyCoefSubtotal;
          let enemySubtotalTotalInput = subRow.cells[11] && subRow.cells[11].querySelector("input");
          if (enemySubtotalTotalInput) {
            enemySubtotalTotalInput.value = enemySubtotalTotal.toFixed(2);
          }
        } catch (error) {
          console.error("Error en recalcSubtotalRow:", error, subRow);
        }
      }
      
      function recalcFinal() {
        try {
          // Recorre cada fila de subtotal (que tiene data-subtotal="true")
          const subtotalRows = document.querySelectorAll("#fa tr[data-subtotal='true']");
          let totalFriendly = 0, totalEnemy = 0;
          subtotalRows.forEach(row => {
            // Se asume que el TOTAL de nuestras fuerzas está en la celda 5
            let friendlyTotalInput = row.cells[5].querySelector("input");
            // Y el TOTAL del enemigo en la celda 11
            let enemyTotalInput = row.cells[11].querySelector("input");
            let friendlyVal = friendlyTotalInput ? Number(friendlyTotalInput.value) || 0 : 0;
            let enemyVal = enemyTotalInput ? Number(enemyTotalInput.value) || 0 : 0;
            totalFriendly += friendlyVal;
            totalEnemy += enemyVal;
          });
          // Actualiza los inputs finales usando los id que agregaste:
          const totalFaPeru = document.getElementById("total-fa-peru");
          const totalFaCol = document.getElementById("total-fa-col");
          const totalFa = document.getElementById("total-fa-tabla");

          const cantFa = document.getElementById("cant-fa_master");
          const cantFaCol = document.getElementById("cant-fa-enemigo_master");

          const tablaMilitarPE = document.getElementById("cant-fa");
          const tablaMilitarCOL = document.getElementById("cant-fa-enemigo");

          const totalFA_master = document.getElementById("total-fa_master");
          const totalFA_enemigo_master = document.getElementById("total-fa-enemigo_master");

          const totalfaTabla = document.getElementById("total-fa");
          const totalfaTablaCol = document.getElementById("total-fa-enemigo");

          if (totalFaPeru) {
            totalFaPeru.value = totalFriendly.toFixed(2);
            cantFa.value = totalFriendly.toFixed(2);
            tablaMilitarPE.value = totalFriendly.toFixed(2);
            totalFA_master.value = totalFriendly.toFixed(2);
            totalfaTabla.value = totalFriendly.toFixed(2);
          }
          if (totalFaCol) {
            totalFaCol.value = totalEnemy.toFixed(2);
            cantFaCol.value = totalEnemy.toFixed(2);
            tablaMilitarCOL.value = totalEnemy.toFixed(2);
            totalFA_enemigo_master.value = totalEnemy.toFixed(2);
            totalfaTablaCol.value = totalEnemy.toFixed(2);
          }
          if (totalFa) {
            totalFa.value = (totalFriendly !== 0 ? (totalEnemy / totalFriendly).toFixed(2) : "0");
          }
        } catch (error) {
          console.error("Error en recalcFinal:", error);
        }
      }
      
      
      function recalcAll() {
        try {
          // Recalcular cada fila de ítem (excluyendo las de subtotal)
          const itemRows = document.querySelectorAll("#fa tr[data-category]:not([data-subtotal])");
          itemRows.forEach(row => {
            recalcItemRow(row);
          });
          // Recalcular cada fila de subtotal
          const subtotalRows = document.querySelectorAll("#fa tr[data-subtotal='true']");
          subtotalRows.forEach(row => {
            recalcSubtotalRow(row);
          });
          // Recalcular el resumen final
          recalcFinal();
        } catch (error) {
          console.error("Error en recalcAll:", error);
        }
      }
      
      function addMainTableListenersMilitar() {
        const mainTable = document.getElementById("fa");
        if (mainTable) {
          mainTable.addEventListener("input", function (event) {
            if (event.target.tagName.toUpperCase() === "INPUT") {
              recalcAll();
            }
          });
          recalcAll();
        }
      }
      
      function initMilitarTab() {
        addTableListenersMilitar();  // Tus listeners para tablas secundarias
        loadAllTableDataMilitar();     // Carga de datos
        addMainTableListenersMilitar(); // Asigna listener y ejecuta cálculos para la tabla principal
      }
      