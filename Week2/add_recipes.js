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

    const insertRecipes = `INSERT INTO Recipes (name, category, is_vegetarian, is_vegan, is_no_bake, cuisine) VALUES 
        ('No-Bake Cheesecake', 'Cake', TRUE, FALSE, TRUE, NULL),
        ('Roasted Brussels Sprouts', NULL, FALSE, TRUE, FALSE, NULL),
        ('Mac & Cheese', NULL, TRUE, FALSE, FALSE, NULL),
        ('Tamagoyaki Japanese Omelette', 'Japanese', TRUE, FALSE, FALSE, 'Japanese');`;

    const insertIngredients = `INSERT INTO Ingredients (recipe_id, ingredient) VALUES 
        (1, 'Condensed Milk'),
        (1, 'Cream Cheese'),
        (1, 'Lemon Juice'),
        (1, 'Pie Crust'),
        (1, 'Cherry Jam'),
        (2, 'Brussels Sprouts'),
        (2, 'Lemon juice'),
        (2, 'Sesame seeds'),
        (2, 'Pepper'),
        (2, 'Salt'),
        (2, 'Olive oil'),
        (3, 'Macaroni'),
        (3, 'Butter'),
        (3, 'Flour'),
        (3, 'Salt'),
        (3, 'Pepper'),
        (3, 'Milk'),
        (3, 'Shredded Cheddar cheese'),
        (4, 'Eggs'),
        (4, 'Soy Sauce'),
        (4, 'Sugar'),
        (4, 'Salt'),
        (4, 'Olive Oil');`;

    connection.query(insertRecipes, (err, results) => {
        if (err) {
            console.error('Error inserting recipes:', err);
            return;
        }
        console.log('Recipes inserted:', results);

        connection.query(insertIngredients, (err, results) => {
            if (err) {
                console.error('Error inserting ingredients:', err);
                return;
            }
            console.log('Ingredients inserted:', results);
            connection.end();
        });
    });
});