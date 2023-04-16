// define variablese a utilizar en la App.

const registros =[]
const regId = 0

// define 3 tareas de ejemplo para desplegar en la aplicación
const registro = {
    id: 17388935,
    name: 'Jonathan',
    lastName: 'Hernandez',
    phone: '978778829',
    desc: 'Limpiar algo rápido',
    status: 'En proceso',
    assignDate: '2023-04-10'
}
registros.push(registro)
console.log(registros)

const addButton = document.getElementById('nuevoRegistro')
addButton.addEventListener('click',creaRegistro)

function creaRegistro(event){
    event.preventDefault()
    const registro = readform()
    insertRecord(registro)
}

function readform(){
    const idInput = document.getElementById('id')
    const nameInput = document.getElementById('name')
    const lastNameInput = document.getElementById('lastName')
    const phoneInput = document.getElementById('phone')
    const assignDateInput = document.getElementById('assignDate')
    const descInput = document.getElementById('desc')
    const registro = {
        regId: regId,
        id: idInput.value,
        name: nameInput.value,
        lastname: lastNameInput.value,
        phone: phoneInput.value,
        desc: descInput.value,
        assignDate: assignDateInput.value,
        status: 'Asignado',
        assignDate: '2023-04-10'
    }
    registros.push(registro);
    return registro
}

function insertRecord(registro){
    // const nuevaTarjeta = document.createElement()
    const listaRegistros = document.getElementById('cardSection')
    listaRegistros.innerHTML +=`
    <div class="cards" id="cards">
    <img src="./assets/images/avatar1.png" alt="">
    <h2>${registro.id}</h2>
    <h2>${registro.name}</h2>
    <h2>${registro.lastname}</h2>
    <h2>${registro.phone}</h2>
    <h2>${registro.assignDate}</h2>
    <h2>${registro.status}</h2>
        <a id="detalles" onclick="viewRecordDetails(${registro.regId})" class="opt-bnt detalles" href="#">Ver</a>
        <a id="modificar" onclick="editRecord(${registro.regId})" class="opt-bnt modificar" href="#">Modificar</a>
        <a id="eliminar" onclick="editRecord(${registro.regId})" class="opt-bnt eliminar" href="#">Eliminar</a>
    </div>`
}

function viewRecordDetails(){
    console.log('mostrando detalle registro')


}

function editRecord(){
    alert('editando registro')

}

function deleteRecord(){
    alert('eliminando registro')

}