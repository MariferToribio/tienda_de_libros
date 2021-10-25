const ClickbuttonReg = document.querySelectorAll('.enviar')
const ClickbuttonIni = document.querySelectorAll('.iniciar')
const div_cont = document.querySelector('.continuar_div')
const pay_cont = document.querySelector('.pay_div')


let users = []

ClickbuttonReg.forEach(btn => {
    btn.addEventListener('click', addUser)
})

ClickbuttonIni.forEach(btn => {
    btn.addEventListener('click', validate)
})

function addUser(){
    var userName = document.getElementById('nombre').value
    var userEmail = document.getElementById('correo').value
    var userPass = document.getElementById('contrasenia').value
    var userPassAgain = document.getElementById('contrasenia-again').value
    if(userPass != userPassAgain){
        alert("Contraseñas no coinciden");
    }

    else {
        const newUser = {
            nombre: userName,
            correo: userEmail,
            password: userPass
        }

        let same = 0
        for (let i = 0; i < users.length; i++) {
            if (users[i].correo === newUser.correo) {
                alert("Ya existe una cuenta con este correo");
                same = same + 1
            }
        }

        if (same === 0) {
            users.push(newUser)
            addLocalStorageUsers();
            alert("Registrado");
        }
    }
}

function validate(){
    var userEmail = document.getElementById('correo-ini').value
    var userPass = document.getElementById('contrasenia-ini').value

    let sameEmail = 0
    let samePassword = 0
    for (let i = 0; i < users.length; i++) {
        if (users[i].correo === userEmail) {
            sameEmail++
            if(users[i].password === userPass) {
                samePassword++
                console.log("hola2")
                showButton()
            }
        }
    }

    if(sameEmail === 0 && samePassword === 0){
        alert("No existe cuenta")
    }
    if(sameEmail === 1 && samePassword === 0){
        alert("Contraseña incorrecta")
    }
}

function showButton() {
    div_cont.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('continue')
    const Content = `
        <div><h4></h4></div>
        <div>
            <span><a class="botons button-pay" href="pago.html">Continuar</a></span>
        </div>
    `
    div.innerHTML = Content;
    div_cont.append(div)

    div.querySelector(".button-pay").addEventListener('click', getTotal)
}

function addLocalStorageUsers(){
    sessionStorage.setItem('users', JSON.stringify(users))
}

window.onload = function(){
    const storage = JSON.parse(sessionStorage.getItem('users'));
    if(storage){
        users = storage;
    }
}

function getTotal() {
    //itemCartTotal.innerHTML = `Total $${Total}`

    const div = document.createElement('div')
    div.classList.add('pay')
    const Content = `
        <div>
            <h3 class="itemCartTotalPay text-white">Total a pagar: 0</h3>
        </div>
        
        <script src="./js/scripts.js"></script>
    `
    div.innerHTML = Content;
    pay_cont.append(div)
    console.log("hola4")
}