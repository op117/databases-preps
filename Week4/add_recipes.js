const { MongoClient } = require("mongodb");
require("dotenv").config();

async function main() {
    const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("food_recipes");

        const recipes = [
            {
                recipe_name: "No-Bake Cheesecake",
                description: "A simple and delicious no-bake cheesecake.",
                categories: [{ category_id: 1, category_name: "Cake" }],
                is_vegetarian: true,
                is_vegan: false,
                is_no_bake: true,
                cuisine: null,
                ingredients: [
                    { ingredient_id: 1, ingredient_name: "Condensed Milk", quantity: "1 can" },
                    { ingredient_id: 2, ingredient_name: "Cream Cheese", quantity: "200g" },
                    { ingredient_id: 3, ingredient_name: "Lemon Juice", quantity: "2 tbsp" },
                    { ingredient_id: 4, ingredient_name: "Pie Crust", quantity: "1" },
                    { ingredient_id: 5, ingredient_name: "Cherry Jam", quantity: "100g" }
                ],
                steps: [
                    { step_id: 1, step_order: 1, step_description: "Mix ingredients together." },
                    { step_id: 2, step_order: 2, step_description: "Pour into crust." },
                    { step_id: 3, step_order: 3, step_description: "Refrigerate until set." }
                ]
            }
        ];

        await db.collection("Recipes").insertMany(recipes);
        console.log("Recipes added!");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();