// define variablese a utilizar en la App.

const registros =[]
const hist_registros=[]
let regId = 0
let editandoRegistro = false
let editandoIndice = 0
//readDataLS()

// define 3 tareas de ejemplo para desplegar en la aplicación
// const registro = {
//     id: 17388935,
//     name: 'Jonathan',
//     lastName: 'Hernandez',
//     phone: '978778829',
//     desc: 'Limpiar algo rápido',
//     status: 'En proceso',
//     assignDate: '2023-04-10'
// }
// registros.push(registro)
// console.log(registros)

const addButton = document.getElementById('nuevoRegistro')
addButton.addEventListener('click',creaRegistro)

function creaRegistro(event){
    console.log(editandoRegistro)
    event.preventDefault()
    if (editandoRegistro === false){
    regId = registros.length // Aumenta en 1 el número del ID de Registro
    const registro = readform()
    registros.push(registro);
    insertRecord(registro,regId)
    saveDataLS()
    // readDataLS()
    updProjectStatus()
    limpiarFormulario()
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
        regId: regId,
        id: idInput.value,
        name: nameInput.value,
        lastname: lastNameInput.value,
        projectStatus: projectStatusInput.value,
        desc: descInput.value,
        assignDate: assignDateInput.value,
    }
    return registro    
}

function insertRecord(registro, regId){
    // const nuevaTarjeta = document.createElement()
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
    // console.log(registro.regId)
}

function saveDataLS(){
    //console.log(tareas)
    console.log(JSON.stringify(registros))
    localStorage.setItem('registros',JSON.stringify(registros)) //setItem recibe dos parametros, 
}

function readDataLS(){
    const hist_registros = JSON.parse(localStorage.getItem('registros'))
    hist_registros.foreach((el)=> createrow(el))
    console.log(hist_registros)
}

function viewRecordDetails(value){
    const registro = document.getElementById("Child"+value) 
    const detalleRegistro = document.createElement('div')
    //acá estoy agregando el detalle de la actividad
    detalleRegistro.innerHTML =`
    <h2>Tarea asignada:<h2>
    <h2>${registros[value].desc}<h2> 
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
    console.log(escondeRegistro)
    registro.style.height = "40px";
}

function editRecord(value){
    editandoRegistro = true
    editandoIndice = value
    const actualizaRegistro = document.getElementById('nuevoRegistro')
    actualizaRegistro.innerHTML = 'Actualizar Registro'
    // vuelve a cargar la información en el formulario 
    document.getElementById('id').value = registros[value].id
    document.getElementById('name').value = registros[value].name
    document.getElementById('lastName').value = registros[value].lastname
    document.getElementById('projectStatus').value = registros[value].projectStatus
    document.getElementById('assignDate').value = registros[value].assignDate
    document.getElementById('desc').value = registros[value].desc
    const modificando =document.getElementById(value)
    modificando.style.backgroundColor = "gray"
    editandoIndice = value
    console.log(editandoIndice)
}

function saveRecordupdate(value){
    const registro = readform()
    console.log(registro)
    console.log(value)
    const registroActualizado = registros.splice(value,1,registro)
    saveDataLS()   
    console.log(registroActualizado)
    console.log(registros)
    const actualizaRegistro = document.getElementById('nuevoRegistro')
    actualizaRegistro.innerHTML = 'Guardar Registro'
    editandoRegistro = false
    updCardDetails(registro,value)
    const modificando =document.getElementById(value)
    modificando.style.backgroundColor = "#252525"
    updProjectStatus()
    limpiarFormulario()
}

function updCardDetails(registro,value){
    console.log(registro,value)
    document.getElementById("crdid"+value).innerText = registro.id
    document.getElementById("crdid"+value).innerText= registro.id
    document.getElementById("crdName"+value).innerText = registro.name
    document.getElementById("crdLastName"+value).innerText = registro.lastname
    document.getElementById("crdProStatus"+value).innerText = registro.projectStatus
    document.getElementById("crdAssDate"+value).innerText = registro.assignDate
    // document.getElementById('crddesc').innerText = registro.desc
}

function deleteRecord(value){
    const registroEliminado = registros.splice(value,1)
    saveDataLS()   
    console.log(registroEliminado)
    console.log(registros)
    const listaRegistros = document.getElementById('cardSection') 
    const registro = document.getElementById("Child"+value)
    listaRegistros.removeChild(registro)
    updProjectStatus()
    limpiarFormulario()
}

function updProjectStatus(){
    const pAssi = registros.filter(registros => registros.projectStatus === "Asignado")
    const pPdte = registros.filter(registros => registros.projectStatus === "Pendiente")
    const pComp = registros.filter(registros => registros.projectStatus === "Completado")
    document.getElementById("nProTot").innerText = `${registros.length} Proyecto(s) en desarrollo.`
    document.getElementById("nProAss").innerText = `${pAssi.length} Proyecto(s) asignados.`
    document.getElementById("nProCom").innerText = `${pComp.length} Proyecto(s) completados.`
    document.getElementById("nProPdt").innerText = `${pPdte.length} Proyecto(s) pendientes.`
}