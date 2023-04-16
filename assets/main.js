// define variablese a utilizar en la App.

const registros =[]
const hist_registros=[]
let regId = -1

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
    regId++ // Aumenta en 1 el número del ID de Registro
    event.preventDefault()
    const registro = readform()
    insertRecord(registro,regId)
    saveDataLS()
    // readDataLS()
    limpiarFormulario()
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
    registros.push(registro);
    return registro    
}

function insertRecord(registro, regId){
    // const nuevaTarjeta = document.createElement()
    const listaRegistros = document.getElementById('cardSection')
    listaRegistros.innerHTML +=`
    <div class="cards-container" id="${registro.regId}">
    <div class="cards"">
    <img src="./assets/images/avatar1.png" alt="">
    <h2>${registro.id}</h2>
    <h2>${registro.name}</h2>
    <h2>${registro.lastname}</h2>
    <h2>${registro.projectStatus}</h2>
    <h2>${registro.assignDate}</h2>
        <a id="${registro.regId})" onclick="viewRecordDetails(${registro.regId})" class="opt-btn detalles" href="#">Detalles</a>
        <a id="${registro.regId}" onclick="editRecord(${registro.regId})" class="opt-btn modificar" href="#">Modificar</a>
        <a id="${registro.regId}" onclick="deleteRecord(${registro.regId})" class="opt-btn eliminar" href="#">Eliminar</a>
    </div>
    </div>`
    console.log(registro.regId)
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
    const registro = document.getElementById(value)    
    const detalleRegistro = document.createElement('div')
    //acá estoy agregando el detalle de la actividad
    console.log(registro)
    detalleRegistro.innerHTML =`
    <h2>Tarea asignada:<h2>
    <h2>${value}<h2> 
    <a onclick="hideRecordDetails(${value})" class="opt-btn cerrar" href="#">Ocultar</a>
    `
    detalleRegistro.className='card-detail'
    detalleRegistro.id= 'Desc'+value;
    registro.appendChild(detalleRegistro);
    registro.style.height = "100px";
    // setTimeout(hideRecordDetails,500);
}

function hideRecordDetails(value){
    const registro = document.getElementById(value)
    const escondeRegistro = document.getElementById('Desc'+value)
    registro.removeChild(escondeRegistro)
    console.log(escondeRegistro)
    registro.style.height = "40px";
}

function editRecord(value){
    console.log(value)
    // vuelve a cargar la información en el formulario 
    document.getElementById('id').value = registros[value].id
    document.getElementById('name').value = registros[value].name
    document.getElementById('lastName').value = registros[value].lastname
    document.getElementById('phone').value = registros[value].phone
    document.getElementById('assignDate').value = registros[value].assignDate
    document.getElementById('desc').value = registros[value].desc
    const modificando =document.getElementById(value)
    modificando.style.backgroundColor = "gray"
}

function deleteRecord(value){
    const registroEliminado = registros.splice(value,1)
    saveDataLS()   
    console.log(registroEliminado)
    console.log(registros)
    const listaRegistros = document.getElementById('cardSection') 
    const registro = document.getElementById(value)
    listaRegistros.removeChild(registro)
    console.log(value + ' eliminado')
}