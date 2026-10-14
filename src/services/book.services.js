import { Book } from "../models/Book.js";

export const findBooks= async(req, res)=> {
    const books = await Book.findAll();
    res.json(books);
};

export const findBook= async(req, res)=> {
    const {id}= req.params;
    const book= await Book.findByPk(id);

    if(!book){
        return res.status(404).json({message: `El libro con id ${id} no existe.` });
    }

    res.json(book);
};

export const createBook= async(req, res)=>{
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

    if (!title || !author) {
        return res.status(400).send({message: "Titulo y autor son campos requeridos"});
    }

    res.json(newBook);
};

export const updateBook= async(req, res)=>{
    const {id}= req.params;
    

    // Encontrar el libro
    const book= await Book.findByPk(id);

    if(!book){
        return res.status(404).json({message: 'Libro a editar no encontrado'});
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
};

export const deleteBook= async(req, res)=>{
    const {id}= req.params;
    const book = await Book.findByPk(id);

    await book.destroy();

    /* if(!id){
        return res.status(404).json({message: 'Libro a eliminar no encontrado'});
    } */

    res.send(`Borrando libro con id: ${id}`);
};

