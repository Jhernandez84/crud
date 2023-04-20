// define variablese a utilizar en la App.
const registros =[]
let hist_registros=[]
let regId = 0
let editandoRegistro = false
let editandoIndice = 0
let modoDemo = false
let cargaLS = false
let value = 0
readDataLS() // valida si existen o no datos en LS.
updProjectStatus() //carga algunos extras del proyecto.

function demo(){
    if (modoDemo == false){
    modoDemo = true
    console.log('Clic en el botón Demo, carga los registros de ejemplo.')
// define 3 tareas de ejemplo para desplegar en la aplicación
    const d1 = {
        regId:Date.now()*(Math.round(Math.random()*100)),
        id: '17388935',
        name: 'Daniela',
        lastname: 'Navarro',
        projectStatus: 'Completado',
        desc: 'Desarrollar UI para CRUD',
        assignDate: '2023-03-29'}
    const d2 = {
        regId:Date.now()*(Math.round(Math.random()*100)),
        id: '15957386',
        name: 'Jonathan',
        lastname: 'Hernandez',
        projectStatus: 'Asignado',
        desc: 'Terminar código JavaScript de CRUD',
        assignDate: '2023-04-10',
    }
    const d3 = {
        regId:Date.now()*(Math.round(Math.random()*100)),
        id: '7831008',
        name: 'José',
        lastname: 'Hernández',
        projectStatus: 'Pendiente',
        desc: 'Habilitar modo Demo en CRUD',
        assignDate: '2023-04-15'
    }
    registros.push(d1)
    registros.push(d2)
    registros.push(d3)
    console.log(registros)
    saveDataLS()
    readDataLS()
    updProjectStatus()
    }else{
        console.log('Demo ya fue ejecutado')
    }
}

const demoButton =document.getElementById('demo')
demoButton.addEventListener('click',demo)

const addButton = document.getElementById('nuevoRegistro')
addButton.addEventListener('click',creaRegistro)

function creaRegistro(event){
    event.preventDefault()
    if (editandoRegistro == false){
        const registro = readform()
        registros.push(registro);
        cargaLS = false
        insertRecord(registro)
        updProjectStatus()
        limpiarFormulario()
        saveDataLS()
    }else{
        console.log(editandoIndice)
        saveRecordupdate(editandoIndice)
        updProjectStatus()
    }
}

function limpiarFormulario(){
    const form= document.getElementById('form')
    form.reset()
}

function readform(){
    const idInput = document.getElementById('id')
    const nameInput = document.getElementById('name')
    const lastNameInput = document.getElementById('lastName')
    const projectStatusInput = document.getElementById('projectStatus')
    const assignDateInput = document.getElementById('assignDate')
    const descInput = document.getElementById('desc')
    const registro = {
        regId:regId,
        id: idInput.value,
        name: nameInput.value,
        lastname: lastNameInput.value,
        projectStatus: projectStatusInput.value,
        desc: descInput.value,
        assignDate: assignDateInput.value,
    }
    return registro    
}

function insertRecord(registro){
    // const nuevaTarjeta = document.createElement()
    if (cargaLS == false){
    regId = Date.now()*(Math.round(Math.random()*100))
    }
    cargaLS = true
    const listaRegistros = document.getElementById('cardSection')
    listaRegistros.innerHTML +=`
    <div class="cards-container" id="Child${registro.regId}">
    <div class="cards" id="${registro.regId}">
    <img src="./assets/images/avatar1.png" alt="">
    <h2 id="crdid${registro.regId}">${registro.id}</h2>
    <h2 id="crdName${registro.regId}">${registro.name}</h2>
    <h2 id="crdLastName${registro.regId}">${registro.lastname}</h2>
    <h2 id="crdProStatus${registro.regId}">${registro.projectStatus}</h2>
    <h2 id="crdAssDate${registro.regId}">${registro.assignDate}</h2>
        <a id="vrd${registro.regId})" onclick="viewRecordDetails(${registro.regId})" class="opt-btn detalles" href="#">Detalles</a>
        <a id="${registro.regId}" onclick="editRecord(${registro.regId})" class="opt-btn modificar" href="#">Modificar</a>
        <a id="${registro.regId}" onclick="deleteRecord(${registro.regId})" class="opt-btn eliminar" href="#">Eliminar</a>
    </div>
    </div>`
}

function saveDataLS(){
    localStorage.setItem('registros', JSON.stringify(registros)) //setItem recibe dos parametros, 
}

function readDataLS(){
    hist_registros = JSON.parse(localStorage.getItem('registros'))
    if (hist_registros !=null) {
        hist_registros.forEach((el)=> registros.push(el))
        hist_registros.forEach((el)=> insertRecord(el))
    }else{
        console.log('No hay datos para mostrar en LS')
    }
}

function viewRecordDetails(value){
    value = value
    const registro = document.getElementById("Child"+value) 
    const detalleRegistro = document.createElement('div')
    let indice = registros.map(registro => registro.regId).indexOf(value)
    //acá estoy agregando el detalle de la actividad
    detalleRegistro.innerHTML =`
    <h2>Tarea asignada:<h2>
    <h2>${registros[indice].desc}<h2> 
    <a onclick="hideRecordDetails(${value})" class="opt-btn cerrar" href="#">Ocultar</a>
    `
    detalleRegistro.className='card-detail'
    detalleRegistro.id= 'Desc'+value;
    registro.appendChild(detalleRegistro);
    registro.style.height = "100px";
}

function hideRecordDetails(value){
    const registro = document.getElementById("Child"+value)
    const escondeRegistro = document.getElementById('Desc'+value)
    registro.removeChild(escondeRegistro)
    registro.style.height = "40px";
}

function editRecord(value){
    let indice = registros.map(registro => registro.regId).indexOf(value)
    editandoRegistro = true
    editandoIndice = indice
    const actualizaRegistro = document.getElementById('nuevoRegistro')
    actualizaRegistro.innerHTML = 'Actualizar Registro'
    // vuelve a cargar la información en el formulario 
    regId = registros[indice].regId
    console.log(regId)
    document.getElementById('id').value = registros[indice].id
    document.getElementById('name').value = registros[indice].name
    document.getElementById('lastName').value = registros[indice].lastname
    document.getElementById('projectStatus').value = registros[indice].projectStatus
    document.getElementById('assignDate').value = registros[indice].assignDate
    document.getElementById('desc').value = registros[indice].desc
    const modificando =document.getElementById(value)
    modificando.style.backgroundColor = "gray"
    // setTimeout(alertEditRecord(), 1000000)
}

// function alertEditRecord(value){
//     console.log(value)
//     const modificando =document.getElementById(value)
//     modificando.style.backgroundColor = "#252525"
// }

function saveRecordupdate(value){
    const registro = {
        regId: registros[editandoIndice].regId,
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        lastname: document.getElementById('lastName').value,
        projectStatus: document.getElementById('projectStatus').value,
        assignDate: document.getElementById('assignDate').value,
        desc: document.getElementById('desc').value,
    }
    registros.splice(editandoIndice,1,registro)
    const actualizaRegistro = document.getElementById('nuevoRegistro')
    actualizaRegistro.innerHTML = 'Guardar Registro'
    editandoRegistro = false
    document.getElementById('crdid'+regId).innerText = registros[editandoIndice].id
    document.getElementById('crdName'+regId).innerText = registros[editandoIndice].name
    document.getElementById('crdLastName'+regId).innerText = registros[editandoIndice].lastname
    document.getElementById('crdProStatus'+regId).innerText = registros[editandoIndice].projectStatus
    document.getElementById('crdAssDate'+regId).innerText = registros[editandoIndice].assignDate
    updProjectStatus()
    limpiarFormulario()
    saveDataLS()
}

function deleteRecord(value){
    let indice = registros.map(registro => registro.regId).indexOf(value)
    registros.splice(indice,1)
    saveDataLS()  
    const listaRegistros = document.getElementById('cardSection') 
    const registro = document.getElementById("Child"+value)
    listaRegistros.removeChild(registro)
    updProjectStatus()
    limpiarFormulario()
}

function updProjectStatus(){
    if (registros != null){
    const pAssi = registros.filter(registros => registros.projectStatus === "Asignado")
    const pPdte = registros.filter(registros => registros.projectStatus === "Pendiente")
    const pComp = registros.filter(registros => registros.projectStatus === "Completado")
    document.getElementById("nProTot").innerText = `${registros.length} Proyecto(s) en desarrollo.`
    document.getElementById("nProAss").innerText = `${pAssi.length} Proyecto(s) asignados.`
    document.getElementById("nProCom").innerText = `${pComp.length} Proyecto(s) completados.`
    document.getElementById("nProPdt").innerText = `${pPdte.length} Proyecto(s) pendientes.`
    }
}