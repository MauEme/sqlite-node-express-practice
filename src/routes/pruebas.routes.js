import { Router } from "express";
import { Book } from "../models/Book.js";

const router = Router();

router.get('/books', async(req, res)=> {
    const books = await Book.findAll();
    res.json(books);
})

router.post('/books', (req, res)=>{
    res.send(`Creando libro`);
});

router.put('/books/:id', (req, res)=>{
    const {id}= req.params;
    res.send(`Actualizando datos completos de libro con id: ${id}`);
});

router.delete('/books/:id', (req, res)=>{
    const {id}= req.params;
    res.send(`Borrando libro con id: ${id}`);
});

export default router;