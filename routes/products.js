const Express = require('express');
const Verif = require('../verifyToken.js');
const DB = require('../db.js');

const router = Express.Router();

//Display all products for managing : GET /products : SELECT * FROM PRODUCTS
router.get('/', (req, res, next) => {
    DB.all('SELECT * FROM PRODUCTS', (err, data) => {
        if (err) {
            return next(err);
        }
        return res.json(data);
    });
});

//Display all products of one category : GET /products/:category : SELECT * FROM PRODUCTS WHERE CATEGORY = ?
router.get('/:category', (req, res, next) => {
    DB.all('SELECT * FROM PRODUCTS WHERE CATEGORY = ?', [req.params.category], (err, data) => {
        if(err) {
            return next(err);
        }
        return res.json(data);
    })
});

//Add a new product : POST /products : INSERT INTO PRODUCTS (TITLE, IMAGE, DESCRIPTION, UTILISATION) VALUE (?, ?, ?, ?)
router.post('/', Verif.verifyToken, (req, res, next) => {
   console.log(req.body);
   DB.run('INSERT INTO PRODUCTS (TITLE, IMAGE, CATEGORY, DESCR1, DESCR2, DESCR3, DESCR4, DESCR5, UP) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.title, req.body.image, req.body.category, req.body.descr1, req.body.descr2, req.body.descr3, req.body.descr4, req.body.descr5, req.body.up], (err) => {
      if(err) {
          return next(err);
      }
       res.status(201);
       return res.end();
   });
});

//Change a product : PATCH /products/:title : UPDATE PRODUCTS SET IMAGE = ?, DESCRIPTION = ?, UTILISATION = ? WHERE TITLE = ?
router.patch('/:title', (req, res, next) => {
   DB.run('UPDATE PRODUCTS SET IMAGE = ?, CATEGORY= ?, DESCR1 = ?, DESCR2 = ?, DESCR3 = ?, DESCR4 = ?, DESCR5 = ?, UP = ? WHERE TITLE = ?', [req.body.image, req.body.category, req.body.descr1, req.body.descr2, req.body.descr3, req.body.descr4, req.body.descr5, req.body.sale, req.body.up, req.params.title], (err) => {
      if(err){
          return next(err);
      }
      return res.end("updated");
   });
});

//Delete a product : DELETE /products/:title : DELETE FROM PRODUCTS WHERE TITLE = ?
router.delete('/:id', Verif.verifyToken, (req, res, next) => {
   DB.run('DELETE FROM PRODUCTS WHERE ID = ?', [req.params.id], (err) => {
      if(err) {
          return next(err);
      }
      return res.end("deleted");
   });
});

//Get the titles of product descriptions : GET /category/:id : SELECT * FROM CATEGORY WHERE ID = ?
router.get('/category/:id', (req, res, next) => {
    if (req.params.id > 0) {
        DB.all('SELECT * FROM CATEGORY WHERE ID = ?', [req.params.id], (err, data) => {
            if (err) {
                return next(err);
            }
            return res.json(data);
        });
    } else {
        DB.all('SELECT * FROM CATEGORY', (err, data) => {
            if(err) {
                return next(err);
            }
            return res.json(data);
        });
    }
});

router.patch('/category/:id', (req, res, next) => {
   DB.run('UPDATE CATEGORY SET ARG1 = ?, ARG2 = ?, ARG3 = ?, ARG4 = ?, ARG5 = ? WHERE ID = ?', [req.body.arg1, req.body.arg2, req.body.arg3, req.body.arg4, req.body.arg5, req.params.id], (err) => {
      if(err) {
          return next(err);
      }
      return res.end("updated");
   });
});

router.patch('/category/compare/:id', (req, res, next) => {
   DB.run('UPDATE CATEGORY SET COMPA = ? WHERE ID = ?', [req.body.file, req.params.id], (err) => {
      if(err){
          return next(err);
      }
      return res.end("updated");
   });
});

module.exports.router = router;
