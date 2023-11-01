
import express from 'express';
import {ProductoManager} from './productManager.js'

let productos = new ProductoManager("./archivo.json")
const usuarios = productos.getProducts()

const PORT = 3000;
const app = express();
app.use(express.urlencoded({extends:true}))

app.get('/',  (req, res) => {    
    res.send('<h1 style="color:red">Wolcome to products page!!!</h1>');
 })

 app.get('/productos', async (req, res) => {
   let resultado = usuarios   
   if(req.query.limit === '') {      
      res.send(usuarios)
   } else {
      let result = await resultado.slice(0, req.query.limit)
      res.send(result);
   }})
   
 app.get('/productos/:pid', async (req, res) => {
   let pid = req.params.pid
   let productList = await usuarios.find(u => u.id == pid);   
   if(!productList) return res.send({error: "Usuario não encontrado!"})
    res.send({productList})
})
app.listen(PORT, () => console.log('Server on-line, port 8080!!'))



