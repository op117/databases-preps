CREATE TABLE Recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE Ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_name VARCHAR(255) NOT NULL
);

CREATE TABLE Steps (
    step_id INT AUTO_INCREMENT PRIMARY KEY,
    step_description TEXT NOT NULL
);

CREATE TABLE Recipe_Category (
    recipe_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);

CREATE TABLE Recipe_Ingredient (
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity VARCHAR(255),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(ingredient_id) ON DELETE CASCADE
);

CREATE TABLE Recipe_Step (
    recipe_id INT NOT NULL,
    step_id INT NOT NULL,
    step_order INT NOT NULL,
    PRIMARY KEY (recipe_id, step_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (step_id) REFERENCES Steps(step_id) ON DELETE CASCADE
);

CREATE INDEX idx_recipe_category ON Recipe_Category(category_id);
CREATE INDEX idx_recipe_ingredient ON Recipe_Ingredient(ingredient_id);
CREATE INDEX idx_recipe_step ON Recipe_Step(step_id);

CREATE TABLE Recipes_Partitioned (
    recipe_id INT PRIMARY KEY,
    recipe_name VARCHAR(255),
    description TEXT
)
PARTITION BY LIST (category_id) (
    PARTITION bakery VALUES IN (1, 2),
    PARTITION main_course VALUES IN (3, 4),
    PARTITION beverages VALUES IN (5) 
);