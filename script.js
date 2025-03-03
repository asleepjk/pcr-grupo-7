// Suponiendo que el archivo JSON se llama 'coeficientes.json' y está en el mismo directorio
let coeficientes;
let elementosAzul = []; // Array para almacenar los elementos de Azul para UnidadManiobra
let elementosFuegoAzul = []; // Array para almacenar los elementos de Azul para ApoyoFuego
let elementosNegro = []; // Similar para Negro
let elementosFuegoNegro = []; // Similar para Negro

// Cargando el archivo JSON
fetch('coeficientes.json')
    .then(response => response.json())
    .then(data => coeficientes = data);

// Función para agregar elementos de "UnidadManiobra"
function agregarElemento(fuerza) {
    agregarElementoGenerico(fuerza, 'UnidadManiobra', `contenedor-elementos-${fuerza}`);
}

// Función para agregar elementos de "ApoyoFuego"
function agregarElementoFuego(fuerza) {
    agregarElementoGenerico(fuerza, 'ApoyoFuego', `contenedor-elementos-fuego-${fuerza}`);
}

// Función genérica para agregar elementos
function agregarElementoGenerico(fuerza, categoria, contenedorId) {
    let contenedorElementos = document.getElementById(contenedorId);
    let form = document.createElement('form');
    form.onsubmit = function(event) { event.preventDefault(); seleccionarElemento(this, fuerza, categoria); };

    // Dropdown para seleccionar el elemento
    let dropdown = document.createElement('select');
    dropdown.name = `elemento${categoria}`;
    let opcionDefault = document.createElement('option');
    opcionDefault.text = 'Seleccione un elemento';
    opcionDefault.value = '';
    dropdown.appendChild(opcionDefault);

    let elementos = Object.keys(coeficientes[fuerza][categoria]);
    elementos.forEach(elemento => {
        let opcion = document.createElement('option');
        opcion.value = elemento;
        opcion.text = elemento;
        dropdown.appendChild(opcion);
    });
    form.appendChild(dropdown);

    // Campo de entrada para la cantidad
    let inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.name = 'cantidad';
    inputCantidad.placeholder = 'Cantidad';
    inputCantidad.min = 0;
    inputCantidad.required = true;
    form.appendChild(inputCantidad);

    // Campo de entrada para la capacidad operativa
    let inputCapOper = document.createElement('input');
    inputCapOper.type = 'number';
    inputCapOper.name = 'capOper';
    inputCapOper.placeholder = 'Capacidad Operativa';
    inputCapOper.step = '0.01';
    inputCapOper.min = 0;
    inputCapOper.max = 1;
    inputCapOper.required = true;
    form.appendChild(inputCapOper);

    // Botón para enviar el formulario
    let submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Agregar';
    form.appendChild(submitBtn);

    contenedorElementos.appendChild(form);
}

function seleccionarElemento(form, fuerza, categoria) {
    let elementoSeleccionado = form[`elemento${categoria}`].value;
    let cantidad = parseFloat(form.cantidad.value);
    let capOper = parseFloat(form.capOper.value);
    let arrayElementos = categoria === 'UnidadManiobra' ? (fuerza === 'azul' ? elementosAzul : elementosNegro) : (fuerza === 'azul' ? elementosFuegoAzul : elementosFuegoNegro);
    let tablaId = categoria === 'UnidadManiobra' ? `tabla-${fuerza}` : `tabla-fuego-${fuerza}`;
    let subtotalId = categoria === 'UnidadManiobra' ? `subtotal-${fuerza}` : `subtotal-fuego-${fuerza}`;

    if (elementoSeleccionado === '' || isNaN(cantidad) || isNaN(capOper) || cantidad <= 0 || capOper <= 0 || capOper > 1) {
        alert('Por favor, introduzca valores válidos.');
        return;
    }
    let coef = coeficientes[fuerza][categoria][elementoSeleccionado];
    let cantReal = cantidad * capOper;
    let total = cantReal * coef;

    let elemento = { nombre: elementoSeleccionado, cantidad: cantidad, capOper: capOper, coef: coef, cantReal: cantReal, total: total };

    arrayElementos.push(elemento);
    actualizarTabla(tablaId, arrayElementos, subtotalId);
    actualizarComparacion();
    form.remove();
}

function actualizarTabla(tablaId, elementos, subtotalId) {
    let tbody = document.querySelector(`#${tablaId} tbody`);
    tbody.innerHTML = '';
    let subtotal = elementos.reduce((acc, elem) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${elem.nombre}</td>
                        <td>${elem.cantidad}</td>
                        <td>${elem.capOper}</td>
                        <td>${elem.cantReal.toFixed(2)}</td>
                        <td>${elem.coef}</td>
                        <td>${elem.total.toFixed(2)}</td>`;
        tbody.appendChild(tr);
        return acc + elem.total;
    }, 0);

    document.getElementById(subtotalId).innerText = subtotal.toFixed(2);
}
    
    function actualizarComparacion() {
        let subtotalAzul = elementosAzul.reduce((acc, elem) => acc + elem.total, 0);
        let subtotalNegro = elementosNegro.reduce((acc, elem) => acc + elem.total, 0);
        if(subtotalNegro>subtotalAzul){
        let comparacion = (subtotalNegro / subtotalAzul).toFixed(2) + ' a 1'; // Asumimos que Negro es siempre más alto para este ejemplo
        document.getElementById('pot-comb-maniobra').innerText = comparacion;
        }
        else{
        let comparacion = (subtotalAzul / subtotalNegro).toFixed(2) + ' a 1'; // Asumimos que Negro es siempre más alto para este ejemplo
        document.getElementById('pot-comb-maniobra').innerText = comparacion;
        }

            // Sumar los subtotales de 'UnidadManiobra' y 'ApoyoFuego'
    let subtotalManiobraAzul = elementosAzul.reduce((acc, elem) => acc + elem.total, 0);
    let subtotalFuegoAzul = elementosFuegoAzul.reduce((acc, elem) => acc + elem.total, 0);
    let subtotalManiobraNegro = elementosNegro.reduce((acc, elem) => acc + elem.total, 0);
    let subtotalFuegoNegro = elementosFuegoNegro.reduce((acc, elem) => acc + elem.total, 0);

    let totalAzul = subtotalManiobraAzul + subtotalFuegoAzul;
    let totalNegro = subtotalManiobraNegro + subtotalFuegoNegro;

    // Calculamos la proporción y determinamos a favor de quién está
    let proporcion;
    let aFavorDe;
    if (totalNegro >= totalAzul) {
        proporcion = (totalNegro / totalAzul).toFixed(2);
        aFavorDe = 'a favor del Enemigo';
    } else {
        proporcion = (totalAzul / totalNegro).toFixed(2);
        aFavorDe = 'a favor de las Fuerzas Amigas';
    }

    // Actualizamos el HTML con los nuevos valores
    document.getElementById('potencia-combativa-azul').innerText = totalAzul.toFixed(2);
    document.getElementById('potencia-combativa-negro').innerText = totalNegro.toFixed(2);
    document.getElementById('proporcion-combativa').innerText = `${proporcion} a 1 ${aFavorDe}`;

    document.getElementById("pcc-refuerzo-azul").innerText = document.getElementById("potencia-combativa-azul").innerText
    document.getElementById("pcc-refuerzo-negro").innerText = document.getElementById("potencia-combativa-negro").innerText


    }



function actualizarSelectorElemento(categoria, selector) {
    // Limpiando las opciones existentes
    selector.innerHTML = '';
    document.getElementById('coeficiente').value = coeficiente;
    // Obteniendo los elementos de la categoría seleccionada
    let elementos = coeficientes['azul'][categoria]; // Asume 'azul' o ajusta según sea necesario

    // Creando nuevas opciones
    for (let elemento in elementos) {
        let opcion = document.createElement('option');
        opcion.value = elemento;
        opcion.text = elemento;
        selector.appendChild(opcion);
    }

    
}

function calcularPotenciaCombativa() {
    // Aquí tendrías que calcular los promedios basándote en los valores de los factores ingresados
    let totalAmiga = parseFloat(document.getElementById('total-fza-amiga').innerText);
    let totalEno = parseFloat(document.getElementById('total-eno').innerText);

    // Valores PCD Refuerzo son los totales previamente calculados en el cuadro resumen
    let pcdRefuerzoAzul = parseFloat(document.getElementById('potencia-combativa-azul').innerText);
    let pcdRefuerzoNegro = parseFloat(document.getElementById('potencia-combativa-negro').innerText);

    // Calculamos los PCC multiplicando el PCD Refuerzo por el multiplicador
    let pccAzul = pcdRefuerzoAzul * totalAmiga;
    let pccNegro = pcdRefuerzoNegro * totalEno;

    // Actualizamos el HTML con los nuevos valores
    document.getElementById('multiplicador-azul').innerText = totalAmiga.toFixed(2);
    document.getElementById('pcc-azul').innerText = pccAzul.toFixed(2);
    document.getElementById('multiplicador-negro').innerText = totalEno.toFixed(2);
    document.getElementById('pcc-negro').innerText = pccNegro.toFixed(2);

    // Calculamos el resumen final
    let proporcion = pccNegro >= pccAzul ? (pccNegro / pccAzul).toFixed(2) : (pccAzul / pccNegro).toFixed(2);
    let aFavorDe = pccNegro >= pccAzul ? 'a favor de las Fuerzas Enemigas' : 'a favor de las Fuerzas Amigas';
    document.getElementById('resumen-pcc').innerText = `${proporcion} a 1 ${aFavorDe}`;
}

function calcularPromedios() {
    // Obtener todos los inputs para FZA AMIGA y ENO
    let inputsFzaAmiga = document.querySelectorAll('.fza-amiga');
    let inputsEno = document.querySelectorAll('.eno');

    // Sumar y contar los valores para FZA AMIGA y ENO
    let sumaFzaAmiga = 0, sumaEno = 0, contador = 0;
    inputsFzaAmiga.forEach(input => {
        sumaFzaAmiga += parseFloat(input.value) || 0; // Usamos || 0 para prevenir NaN
        contador++;
    });
    inputsEno.forEach(input => {
        sumaEno += parseFloat(input.value) || 0; // Usamos || 0 para prevenir NaN
    });

    // Calcular promedios
    let promedioFzaAmiga = (contador > 0) ? sumaFzaAmiga / contador : 0;
    let promedioEno = (contador > 0) ? sumaEno / contador : 0;

    // Actualizar totales en la tabla
    document.getElementById('total-fza-amiga').innerText = promedioFzaAmiga.toFixed(2);
    document.getElementById('total-eno').innerText = promedioEno.toFixed(2);

    document.getElementById('multiplicador-azul').innerText = promedioFzaAmiga.toFixed(2);
    document.getElementById('multiplicador-negro').innerText = promedioEno.toFixed(2);

    let pcc_azul = promedioFzaAmiga.toFixed(2) * parseFloat(document.getElementById('potencia-combativa-azul').innerText).toFixed(2);
    let pcc_negro = promedioEno.toFixed(2) * parseFloat(document.getElementById("pcc-refuerzo-negro").innerText).toFixed(2);

    document.getElementById('pcc-azul').innerText = pcc_azul.toFixed(2);
    document.getElementById('pcc-negro').innerText = pcc_negro.toFixed(2);

    document.getElementById("pcc-refuerzo-azul").innerText = parseFloat(document.getElementById('potencia-combativa-azul').innerText).toFixed(2);
    document.getElementById("pcc-refuerzo-negro").innerText = parseFloat(document.getElementById("potencia-combativa-negro").innerText).toFixed(2);

    let proporcionalidad;
    let resumenAzul = parseFloat(document.getElementById('pcc-azul').innerText).toFixed(2);
    let resumenNegro= parseFloat(document.getElementById('pcc-negro').innerText).toFixed(2);

    if (resumenNegro >= resumenAzul) {
        proporcionalidad= (resumenNegro / resumenAzul).toFixed(2);
        aFavorDeResumen = 'a favor del Enemigo';
    } else {
        proporcionalidad = (resumenAzul / resumenNegro).toFixed(2);
        aFavorDeResumen = 'a favor de las Fuerzas Amigas';
    }

    document.getElementById('resumen-pcc').innerText = `${proporcionalidad} a 1 ${aFavorDeResumen}`;
    // Actualizamos el HTML con los nuevos valores
    document.getElementById('potencia-combativa-azul').innerText = totalAzul.toFixed(2);
    document.getElementById('potencia-combativa-negro').innerText = totalNegro.toFixed(2);
    document.getElementById('proporcion-combativa').innerText = `${proporcion} a 1 ${aFavorDe}`;

    document.getElementById("pcc-refuerzo-azul").innerText = document.getElementById("potencia-combativa-azul").innerText
    document.getElementById("pcc-refuerzo-negro").innerText = document.getElementById("potencia-combativa-negro").innerText

    // Ahora podríamos llamar a otra función que use estos promedios para hacer más cálculos, si es necesario
    // calcularPotenciaCombativa(); // Por ejemplo, si necesitas calcular algo después de obtener los promedios
}

// Asegurarse de que calcularPromedios se llame cada vez que un input cambia
document.querySelectorAll('.fza-amiga, .eno').forEach(input => {
    input.addEventListener('change', calcularPromedios);
});

// Iniciar la función al cargar la página para calcular los promedios iniciales
window.onload = calcularPromedios;



