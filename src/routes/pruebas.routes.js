import { Router } from "express";
import { Book } from "../models/Book.js";

const router = Router();

router.get('/books', async(req, res)=> {
    const books = await Book.findAll();
    res.json(books);
})

router.get('/books/:id', async(req, res)=> {
    const {id}= req.params;
    const book= await Book.findByPk(id);

    res.json(book);
});

router.post('/books', async(req, res)=>{
    const {title, author, rating, pageCount, summary, imageUrl, available}= req.body;

    const newBook= await Book.create({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available
    });
    res.json(newBook);
});

router.put('/books/:id', async(req, res)=>{
    const {id}= req.params;
    

    // Encontrar el libro
    const book= await Book.findByPk(id);

    if(!book){
        return res.status(404).json({message: 'Libro no encontrado'});
    }

    

    // Actualizar libro

    /* await book.update({ // Forma larga
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available
    }); */

    await book.update(req.body); // Forma corta, solo se actualiza lo que mandemos en el body

    await book.save();

    res.json(book);
});

router.delete('/books/:id', async(req, res)=>{
    const {id}= req.params;
    const book = await Book.findByPk(id);

    await book.destroy();

    res.send(`Borrando libro con id: ${id}`);
});

export default router;