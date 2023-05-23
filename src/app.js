import express from 'express'
import { ProductManager } from "./ProductManager.js"


const app = express()

const productManager = new ProductManager("./products.json") 

app.listen( 8080, () => { console.log('Server Up') } )

app.get('/', (request, response) => {
    response.send('Bienvenidos a la tienda de Productos')
})

app.get('/products', async (request, response) => {
    const limit = request.query.limit
    let products = await productManager.getProducts()

    if(!limit){
        response.send(products)
    } else {
        let arrayLimited = []
        for(let i = 0; i < limit; i++){
            newArray.push(products[i])
        }
        response.send(arrayLimited)
    }
})

app.get('/products/:pId', async (request, response) => {
    const pId = request.params.pId
    const products = await productManager.getProducts()

    response.send(products.find(el => el.id == pId))
})