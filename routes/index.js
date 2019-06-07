const express = require('express');
const router = express.Router();
const config = require('config');
const mysql = require('mysql');
let connection = mysql.createConnection(config.get("database"));

/* GET home page. */
router.get('/', (req, res, next) => {
  getDrinks((drinks) => {
    user = {
      isManager: () => {
        return false
      }
    }
    console.log(user.isManager());
    res.render('index', { title: 'Joogi Automaat', drinks: drinks, user: user  });
  });
});

router.get('/manage', (req, res, next) => {
  getDrinks((drinks) => {
    user = {
      isManager: () => {
        return true
      }
    }
    res.render('index', { title: 'Haldus', drinks: drinks, user: user });
  });
})

router.get('/:drinkId/sell', (req, res, next) => {
  getDrink(req.params.drinkId, (drink => {
    if (drink[0].stock < 1) {
      res.status(404);
      res.send("Jook on otsas");
    } else {
      sellDrink(req.params.drinkId, drinkSell => {
        res.status(200);
        res.send();
      });
    }
  }));
});

router.get('/:drinkId/fill', (req, res, next) => {
  fillDrink(req.params.drinkId, (drink => {
    res.status(200);
    res.send()
  }));
});

function getDrinks(callback) {
  connection.query(`SELECT id, drink AS name, fillpacksize AS fillSize, stock, unitprice AS price, sold FROM ${config.get("identity")}drink`, (err, res, fields) => {
    if (err) throw err;
    else callback(res);
  });
}

function getDrink(id, callback) {
  connection.query(`SELECT id, drink AS name, fillpacksize AS fillSize, stock, unitprice AS price, sold FROM ${config.get("identity")}drink WHERE id = ${id} LIMIT 1`, (err, res, fields) => {
    if (err) throw err;
    else callback(res);
  });
}

function sellDrink(id, callback) {
  connection.query(`UPDATE ${config.get("identity")}drink SET stock = stock - 1, sold = sold + 1 WHERE id = ${id}`, (err, res, fields) => {
    if (err) throw err;
    else callback(res);
  });
}

function fillDrink(id, callback) {
  connection.query(`UPDATE ${config.get("identity")}drink set stock = stock + fillpacksize WHERE id = ${id}`, (err, res, fields) => {
    if (err) throw err;
    else callback(res);
  })
}
module.exports = router;
