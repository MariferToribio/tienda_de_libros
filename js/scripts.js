const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
const totalPay = document.querySelector('.itemCartTotalPay')

let carrito = []

const ClickbuttonSearch = document.querySelectorAll('.button-search')
const card = document.querySelector('.card-complete')
let books = []

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})

ClickbuttonSearch.forEach(btn => {
  btn.addEventListener('click', search)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
      title: itemTitle,
      precio: itemPrice,
      img: itemImg,
      cantidad: 1
    }

    addItemCarrito(newItem)
}

function addItemCarrito(newItem){
  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 

function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  sessionStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(sessionStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}

function search() {
  check_books()

  var busqueda = document.getElementById('buscar-text').value
  let busquedaM = busqueda.toUpperCase()

  let categoriaBook = ''

  card.innerHTML = ''
  books.map(item => {
    let titulo = item.titulo.toUpperCase()
    let categoria = item.categoria.toUpperCase()
    if (titulo === busquedaM || categoria === busquedaM) {
      if(titulo === busquedaM){
        categoriaBook = item.categoria.toUpperCase()
      }

      const div = document.createElement('div')
      div.classList.add('Book')
      const Content = `
                <div class="col d-flex justify-content-center mb-4">
                    <div class="card shadow mb-1 bg-light rounded" style="width: 20rem;">
                        <h5 class="card-title pt-2 text-center text-success">${item.titulo}</h5>
                        <img src=${item.image} class="card-img-top" id="imagen" alt="...">
                            <div class="card-body">
                                <h6 id="category">${item.categoria}</h6>
                                <p class="card-text text-dark-50 description" id="descripcion">${item.descripcion}</p>
                                <h5 class="text-success" id="precio">Precio: <span class="precio">$ ${item.precio }</span></h5>
                                <div class="d-grid gap-2">
                                    <button  class="btn btn-success button">Añadir a Carrito</button>
                                </div>            
                            </div>
                    </div>
                </div>
                
                <script src="./js/scripts.js"></script>
            `
      div.innerHTML = Content;
      card.append(div)

      div.querySelector(".button").addEventListener('click', addToCarritoItem)
    }
  })

  if(categoriaBook.length > 0) {
    card.innerHTML = ''
    books.map(item => {
      let categoria = item.categoria.toUpperCase()
      if (categoria === categoriaBook) {

        const div = document.createElement('div')
        div.classList.add('Book')
        const Content = `
                    <div class="col d-flex justify-content-center mb-4">
                        <div class="card shadow mb-1 bg-light rounded" style="width: 20rem;">
                            <h5 class="card-title pt-2 text-center text-success">${item.titulo}</h5>
                            <img src=${item.image} class="card-img-top" id="imagen" alt="...">
                                <div class="card-body">
                                    <h6 id="category">${item.categoria}</h6>
                                    <p class="card-text text-dark-50 description" id="descripcion">${item.descripcion}</p>
                                    <h5 class="text-success" id="precio">Precio: <span class="precio">$ ${item.precio}</span></h5>
                                    <div class="d-grid gap-2">
                                        <button  class="btn btn-success button">Añadir a Carrito</button>
                                    </div>            
                                </div>
                        </div>
                    </div>
                `
        div.innerHTML = Content;
        card.append(div)

        div.querySelector(".button").addEventListener('click', addToCarritoItem)
      }
    })
  }
}

function check_books(){
  if(books.length === 0){
    const newBook = { titulo: 'Guia de Habitos Inteligentes', categoria: 'Exito profesional', precio: 239, descripcion: 'La Guía de Hábitos Inteligentes es un Éxito de Ventas Internacional con más de 2,000 Opiniones Cinco-Estrellas en Amazon, Google Play, y Goodreads, incluyendo traducciones en cuatro idiomas.', image: './imagenes/libro1.jpg'}
    books.push(newBook)
    const newBook2 = { titulo: 'A Cinco Pies de Ti', categoria: 'Ficcion', precio: 344, descripcion: 'BESTSELLER DEL NEW YORK TIMES. Necesitamos estar cerca de las personas que queremos casi tanto como el aire que respiramos.', image: './imagenes/libro2.jpg'}
    books.push(newBook2)
    const newBook3 = { titulo: 'Bajo un cielo escarlata', categoria: 'Ficcion', precio: 109, descripcion: 'El chico que se convirtió en espía por amor en uno de los momentos más oscuros de la historia. La novela basada en la verdadera y épica historia de un héroe olvidado de la Segunda Guerra Mundial.', image: './imagenes/libro3.jpg'}
    books.push(newBook3)
    const newBook4 = { titulo: 'Escrito en el agua', categoria: 'Misterio', precio: 358, descripcion: 'Una apasionante novela sobre las historias que nos contamos al recordar nuestro pasado y su poder para destruirnos.', image: './imagenes/libro4.jpg'}
    books.push(newBook4)
    const newBook5 = { titulo: 'La chica del tren', categoria: 'Misterio', precio: 288, descripcion: 'La chica del tren es una novela de intriga y misterio de la autora británica Paula Hawkins, publicada en 2015.', image: './imagenes/libro5.jpg'}
    books.push(newBook5)
    const newBook6 = { titulo: 'No soy un monstruo', categoria: 'Misterio', precio: 99, descripcion: 'No soy un monstruo es una novela de la periodista, presentadora y escritora Carme Chaparro publicado el 21 de marzo de 2017.', image: './imagenes/libro6.jpg'}
    books.push(newBook6)
    const newBook7 = { titulo: 'Yo se por que canta el pajaro enjaulado', categoria: 'Biografia', precio: 450, descripcion: 'En el primer volumen de su autobiografía, Maya Angelou nos habla de su dura infancia y de los trances por los que tuvo que pasar hasta convertirse en una mujer independiente.', image: './imagenes/libro7.jpg'}
    books.push(newBook7)
    const newBook8 = { titulo: 'La ladrona de libros', categoria: 'Ficcion', precio: 297, descripcion: 'La ladrona de libros es una novela de Markus Zusak publicada en 2005.', image: './imagenes/libro8.jpg'}
    books.push(newBook8)
  }
}
