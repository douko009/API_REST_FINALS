const express = require('express');
const res = require('express/lib/response');
const uuid = require('uuid');
const router = express.Router();
const bookList = require('../../Books.js');

//get data
router.get('/', (req, res) => res.json(bookList));

//get single data
router.get('/:id', (req,res) => {
    const found = bookList.some(book=>book.id === parseInt(req.params.id));

    if (found){
    res.json(bookList.filter(book => book.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No Data Found on ID number ${req.params.id}`})
    }
})

//create data
router.post('/', (req, res) => {
    //res.send(req.body);
    const newBook = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        date: req.body.date,
        bookN: req.body.bookN,
        rating: req.body.rating,
        status: 'active'
    }

    if (!newBook.name || !newBook.email) {
        return res.status(400).json({msg:'Please enter a unique user'})
    }

    bookList.push(newBook);
    //res.json(bookList);
    res.redirect('/');
});

// update data
router.put('/:id', (req, res) => {
    const found = bookList.some(book => book.id === parseInt(req.params.id));
  
    if (found) {
        const upBook = req.body;
        bookList.forEach(book =>{
            if(book.id === parseInt(req.params.id)){
                book.name = upBook.name ? upBook.name: book.name;
                book.email = upBook.email ? upBook.email: book.email;
                book.gender = upBook.gender ? upBook.gender: book.gender;
                book.date = upBook.date ? upBook.date: book.date;
                book.bookN = upBook.bookN ? upBook.bookN: book.bookN;
                book.rating = upBook.rating ? upBook.rating: book.rating;

                res.json({msg: 'Profile Updated!', book});
            }
        })

    } else {
      res.status(400).json({ msg: `This ID cannot be found ${req.params.id}` });
    }
  });

//remove data
router.delete('/:id', (req,res) => {
    const found = bookList.some(book=>book.id === parseInt(req.params.id));

    if (found){
    res.json({msg:'Profile Deleted', bookList: bookList.filter(book => book.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({msg: `No Data Found on ID number ${req.params.id}`})
    }
})

module.exports = router;