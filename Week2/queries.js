const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'food_recipes'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

    const query1 = `SELECT r.name 
                    FROM Recipes r
                    JOIN Ingredients i ON r.id = i.recipe_id
                    WHERE r.is_vegetarian = TRUE AND i.ingredient = 'Potatoes';`;

    connection.query(query1, (err, results) => {
        if (err) {
            console.error('Error executing query 1:', err);
            return;
        }
        console.log('Vegetarian recipes with potatoes:', results);
    });

    const query2 = `SELECT r.name 
                    FROM Recipes r
                    WHERE r.category = 'Cake' AND r.is_no_bake = TRUE;`;

    connection.query(query2, (err, results) => {
        if (err) {
            console.error('Error executing query 2:', err);
            return;
        }
        console.log('Cakes that do not need baking:', results);
    });

    const query3 = `SELECT r.name 
                    FROM Recipes r
                    WHERE r.is_vegan = TRUE OR r.cuisine = 'Japanese';`;

    connection.query(query3, (err, results) => {
        if (err) {
            console.error('Error executing query 3:', err);
            return;
        }
        console.log('Vegan and Japanese recipes:', results);
        connection.end();
    });
});