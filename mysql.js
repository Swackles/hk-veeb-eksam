const config = require('config');
const mysql = require('mysql');
let connection = mysql.createConnection(config.get("database"));

connection.query(`
CREATE TABLE IF NOT EXISTS ${config.get("identity")}drink(
    id INT AUTO_INCREMENT PRIMARY KEY,
    drink VARCHAR(255) NOT NULL,
    fillpacksize INT NOT NULL DEFAULT 6,
    stock INT NOT NULL DEFAULT 0,
    unitprice FLOAT NOT NULL,
    sold INT NOT NULL DEFAULT 0
);`);

connection.query(`INSERT INTO ${config.get("identity")}drink (drink, unitprice) VALUES ('Coca Cola', 0.75);`);
connection.query(`INSERT INTO ${config.get("identity")}drink (drink, unitprice) VALUES ('Saaremaa Vesi', 0.75);`);
connection.query(`INSERT INTO ${config.get("identity")}drink (drink, unitprice) VALUES ('Fanta', 0.75);`);
connection.query(`INSERT INTO ${config.get("identity")}drink (drink, unitprice) VALUES ('Apelsiini Mahl', 1.00);`);

process.exit(0)