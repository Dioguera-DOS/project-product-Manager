import fs from 'fs';
//const fs = require('fs')
export class ProductoManager {
    constructor(filePath) {
        //empt array
        this.path = filePath
        this.products = []
    }

    getProductById(id) {        

        //return event object id
    
        let read = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        let indice = read.findIndex(product =>  product.id === id)
        if(indice === -1){
            console.log(`Product id ${id} not found`)
            return
        }

        return this.products[indice]

        }

    addProduct(title, description, price, thumbnail, code, stock) {
        
        let id = 1
        //id incremental
        if(this.products.length > 0){
            id = this.products[this.products.length -1].id + 1
        }

        let i = this.products.findIndex(product => product.code === code)
        if(i !== -1){
            console.log(`Código de producto: ${code}  ya registrado`)
            return
        }

        let newProduct = {
            id, title,
            description,price,
            thumbnail, code,
            stock
        }
        this.products.push(newProduct)
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 5))        
    
        
    }
    //return products
    getProducts() {
        //return this.products
         if(fs.existsSync(this.path)){            
            return JSON.parse(fs.readFileSync(this.path, "utf-8"))
        }else{
            return []

       }
    }

    // updateProduct(id, objeto){
    //     let productos= this.getProducts()
    //     let indice=productos.findIndex(p=>p.id===id)
    //     if(indice===-1){
    //         console.log(`El producto con id ${id} no existe en BD`)
    //         return 
    //     }

    //     // validar que dentro del objeto no llegue nada raro

    //     productos[indice]={
    //         ...productos[indice],
    //         ...objeto,
    //         id
    //     }

    //     fs.writeFileSync(this.path, JSON.stringify(productos, null, 5))

    // }


    deleteProduct(id) {
        let read = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        let indice = read.findIndex(product =>  product.id === id)

        if(indice === -1){
            console.log(`Código de producto: ${id}  no existe`)
            return
        }

        read.splice(indice,1);

        setTimeout(() => {
            fs.writeFileSync(this.path, JSON.stringify(read, null, 5))
        }, 5000)       


    }
}

let prod = new ProductoManager("./src/archivo.json")
// prod.addProduct("producto prueba 1", "Este es un producto prueba", 200, 'Sin imagen', "abc123", 25)
// prod.addProduct("producto prueba 2", "Este es un producto prueba", 20, 'Sin imagen', "45453", 15)
// prod.addProduct("producto prueba 3", "Este es un producto prueba", 100, 'Sin imagen', "999", 90)
// prod.addProduct("producto prueba 4", "Este es un producto prueba", 99, 'Sin imagen', "666", 30)
// prod.addProduct("producto prueba 5", "Este es un producto prueba", 50, 'Sin imagen', "BC15", 5)
// prod.addProduct("producto prueba 7", "Este es un producto prueba", 69, 'Sin imagen', "5826", 5)
// prod.addProduct("producto prueba 8", "Este es un producto prueba", 80, 'Sin imagen', "swee", 5)
// prod.addProduct("producto prueba 9", "Este es un producto prueba", 225, 'Sin imagen', "365", 5)
// prod.addProduct("producto prueba 10", "Este es un producto prueba", 200, 'Sin imagen', "852", 5)
// prod.addProduct("producto prueba 11", "Este es un producto prueba", 150, 'Sin imagen', "9874", 5)
console.log(prod.getProducts())




