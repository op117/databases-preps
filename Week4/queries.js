const { MongoClient } = require("mongodb");
require("dotenv").config();

async function main() {
    const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("food_recipes");

        const vegetarianWithPotatoes = await db.collection("Recipes").find({
            is_vegetarian: true,
            "ingredients.ingredient_name": "Potatoes"
        }).toArray();
        console.log("Vegetarian recipes with potatoes:", vegetarianWithPotatoes);

        const noBakeCakes = await db.collection("Recipes").find({
            "categories.category_name": "Cake",
            is_no_bake: true
        }).toArray();
        console.log("Cakes that do not need baking:", noBakeCakes);

        const veganOrJapanese = await db.collection("Recipes").find({
            $or: [{ is_vegan: true }, { cuisine: "Japanese" }]
        }).toArray();
        console.log("Vegan and Japanese recipes:", veganOrJapanese);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();