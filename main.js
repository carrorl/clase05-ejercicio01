const express = require('express');
const path = require('path')
const app = express();
const products = require('./data/products.json');

//EJS - Seteo de Vistas
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'));

//Pagina principal
app.get('/', (req, res) =>{ 
    res.render('./homepage')
    })
//Lista de productos
app.get('/productos', (req, res) =>{ 
    res.render('./productList', { products })
    })    
//Renderizado de cada producto
app.get('/productos/:id', (req, res) =>{ 
    
    const id = req.params.id;
    const product = products.find(productId => productId.id === id)
    
    if (!product){
            return res.status(404).
                send('Producto no encontrado  <a href="/">Pagina Principal</a>');
        } else {
            res.render('./products', { product })
        }

    })

//Preguntas frecuentes
app.get('/faq', (req, res) =>{ 
    res.render('./faq', { products })
    })   
//Pagina inexistente
app.use((req, res, next) => {
    res.status(404).render('404');
  });
//Variables de Servidor
const PORT = 3000
const server = app.listen(PORT, () => console.log('Servidor Node.js + Express en puerto 3000'))
server.on('error', (err) => console.log(err, `Error ${err}`))