import React, { useState, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { AppContext } from "../../contexts/app_context";
import "./index.css";

const FilterRecipes = () => {
  const { mealsArray, setMealsArray, setSearchQueries } =
    useContext(AppContext);

  const [formState, setFormState] = useState({
    filterIngredient: "",
    filterCategory: "",
    filterArea: "",
  });

  const handleFilterIngredient = (option) => {
    setFormState({
      ...formState,
      filterIngredient: option,
    });
  };

  const handleFilterCategory = (option) => {
    setFormState({
      ...formState,
      filterCategory: option,
    });
  };

  const handleFilterArea = (option) => {
    setFormState({
      ...formState,
      filterArea: option,
    });
  };

  const filterIngredients = [
    { label: "Ackee", value: "Ackee" },
    { label: "Allspice", value: "Allspice" },
    { label: "Almond Extract", value: "Almond Extract" },
    { label: "Almond Milk", value: "Almond Milk" },
    { label: "Almonds", value: "Almonds" },
    { label: "Ancho Chillies", value: "Ancho Chillies" },
    { label: "Anchovy Fillet", value: "Anchovy Fillet" },
    { label: "Apple Cider Vinegar", value: "Apple Cider Vinegar" },
    { label: "Apples", value: "Apples" },
    { label: "Apricot", value: "Apricot" },
    { label: "Apricot Jam", value: "Apricot Jam" },
    { label: "Asparagus", value: "Asparagus" },
    { label: "Aubergine", value: "Aubergine" },
    { label: "Avocado", value: "Avocado" },
    { label: "Baby Aubergine", value: "Baby Aubergine" },
    { label: "Baby Plum Tomatoes", value: "Baby Plum Tomatoes" },
    { label: "Baby Squid", value: "Baby Squid" },
    { label: "Bacon", value: "Bacon" },
    { label: "Baguette", value: "Baguette" },
    { label: "Baked Beans", value: "Baked Beans" },
    { label: "Baking Powder", value: "Baking Powder" },
    { label: "Balsamic Vinegar", value: "Balsamic Vinegar" },
    { label: "Banana", value: "Banana" },
    { label: "Barbeque Sauce", value: "Barbeque Sauce" },
    { label: "Basil", value: "Basil" },
    { label: "Basil Leaves", value: "Basil Leaves" },
    { label: "Basmati Rice", value: "Basmati Rice" },
    { label: "Bay Leaf", value: "Bay Leaf" },
    { label: "Bay Leaves", value: "Bay Leaves" },
    { label: "Bean", value: "Bean" },
    { label: "Bean", value: "Bean" },
    { label: "Bean Sprouts", value: "Bean Sprouts" },
    { label: "Beef", value: "Beef" },
    { label: "Beef Brisket", value: "Beef Brisket" },
    { label: "Beef Fillet", value: "Beef Fillet" },
    { label: "Beef Gravy", value: "Beef Gravy" },
    { label: "Beef Kidney", value: "Beef Kidney" },
    { label: "Beef Shin", value: "Beef Shin" },
    { label: "Beef Stock", value: "Beef Stock" },
    { label: "Beef Stock Concentrate", value: "Beef Stock Concentrate" },
    { label: "Beetroot", value: "Beetroot" },
    { label: "Bicarbonate Of Soda", value: "Bicarbonate Of Soda" },
    { label: "Biryani Masala", value: "Biryani Masala" },
    { label: "Black Beans", value: "Black Beans" },
    { label: "Black Olives", value: "Black Olives" },
    { label: "Black Pepper", value: "Black Pepper" },
    { label: "Black Pudding", value: "Black Pudding" },
    { label: "Black Treacle", value: "Black Treacle" },
    { label: "Blackberries", value: "Blackberries" },
    { label: "Blue Food Colouring", value: "Blue Food Colouring" },
    { label: "Blueberries", value: "Blueberries" },
    { label: "Boiling Water", value: "Boiling Water" },
    { label: "Borlotti Beans", value: "Borlotti Beans" },
    { label: "Bouquet Garni", value: "Bouquet Garni" },
    { label: "Bowtie Pasta", value: "Bowtie Pasta" },
    { label: "Braeburn Apples", value: "Braeburn Apples" },
    { label: "Bramley Apples", value: "Bramley Apples" },
    { label: "Brandy", value: "Brandy" },
    { label: "Bread", value: "Bread" },
    { label: "Bread Rolls", value: "Bread Rolls" },
    { label: "Breadcrumbs", value: "Breadcrumbs" },
    { label: "Brie", value: "Brie" },
    { label: "Broad Beans", value: "Broad Beans" },
    { label: "Broccoli", value: "Broccoli" },
    { label: "Brown Lentils", value: "Brown Lentils" },
    { label: "Brown Rice", value: "Brown Rice" },
    { label: "Brown Sugar", value: "Brown Sugar" },
    { label: "Brussels Sprouts", value: "Brussels Sprouts" },
    { label: "Buckwheat", value: "Buckwheat" },
    { label: "Bulgur Wheat", value: "Bulgur Wheat" },
    { label: "Bun", value: "Bun" },
    { label: "Buns", value: "Buns" },
    { label: "Butter", value: "Butter" },
    { label: "Butter Beans", value: "Butter Beans" },
    { label: "Butternut Squash", value: "Butternut Squash" },
    { label: "Cabbage", value: "Cabbage" },
    { label: "Cacao", value: "Cacao" },
    { label: "Cajun", value: "Cajun" },
    { label: "Candied Peel", value: "Candied Peel" },
    { label: "Canned Tomatoes", value: "Canned Tomatoes" },
    { label: "Cannellini Beans", value: "Cannellini Beans" },
    { label: "Canola Oil", value: "Canola Oil" },
    { label: "Capers", value: "Capers" },
    { label: "Caramel", value: "Caramel" },
    { label: "Caramel Sauce", value: "Caramel Sauce" },
    { label: "Caraway Seed", value: "Caraway Seed" },
    { label: "Cardamom", value: "Cardamom" },
    { label: "Carrots", value: "Carrots" },
    { label: "Cashew Nuts", value: "Cashew Nuts" },
    { label: "Cashews", value: "Cashews" },
    { label: "Caster Sugar", value: "Caster Sugar" },
    { label: "Cayenne Pepper", value: "Cayenne Pepper" },
    { label: "Celeriac", value: "Celeriac" },
    { label: "Celery", value: "Celery" },
    { label: "Celery Salt", value: "Celery Salt" },
    { label: "Cereal", value: "Cereal" },
    { label: "Challots", value: "Challots" },
    { label: "Charlotte Potatoes", value: "Charlotte Potatoes" },
    { label: "Cheddar Cheese", value: "Cheddar Cheese" },
    { label: "Cheese", value: "Cheese" },
    { label: "Cheese Curds", value: "Cheese Curds" },
    { label: "Cheese Slices", value: "Cheese Slices" },
    { label: "Cherry", value: "Cherry" },
    { label: "Cherry Tomatoes", value: "Cherry Tomatoes" },
    { label: "Chestnut Mushroom", value: "Chestnut Mushroom" },
    { label: "Chestnuts", value: "Chestnuts" },
    { label: "Chicken", value: "Chicken" },
    { label: "Chicken Breast", value: "Chicken Breast" },
    { label: "Chicken Breasts", value: "Chicken Breasts" },
    { label: "Chicken Legs", value: "Chicken Legs" },
    { label: "Chicken Stock", value: "Chicken Stock" },
    { label: "Chicken Stock Concentrate", value: "Chicken Stock Concentrate" },
    { label: "Chicken Stock Cube", value: "Chicken Stock Cube" },
    { label: "Chicken Thighs", value: "Chicken Thighs" },
    { label: "Chickpeas", value: "Chickpeas" },
    { label: "Chili Powder", value: "Chili Powder" },
    { label: "Chilled Butter", value: "Chilled Butter" },
    { label: "Chilli", value: "Chilli" },
    { label: "Chilli Powder", value: "Chilli Powder" },
    { label: "Chinese Broccoli", value: "Chinese Broccoli" },
    { label: "Chives", value: "Chives" },
    { label: "Chocolate Chips", value: "Chocolate Chips" },
    { label: "Chopped Onion", value: "Chopped Onion" },
    { label: "Chopped Parsley", value: "Chopped Parsley" },
    { label: "Chopped Tomatoes", value: "Chopped Tomatoes" },
    { label: "Chorizo", value: "Chorizo" },
    { label: "Christmas Pudding", value: "Christmas Pudding" },
    { label: "Ciabatta", value: "Ciabatta" },
    { label: "Cider", value: "Cider" },
    { label: "Cilantro", value: "Cilantro" },
    { label: "Cinnamon", value: "Cinnamon" },
    { label: "Cinnamon Stick", value: "Cinnamon Stick" },
    { label: "Clams", value: "Clams" },
    { label: "Clotted Cream", value: "Clotted Cream" },
    { label: "Cloves", value: "Cloves" },
    { label: "Coco Sugar", value: "Coco Sugar" },
    { label: "Cocoa", value: "Cocoa" },
    { label: "Coconut Cream", value: "Coconut Cream" },
    { label: "Coconut Milk", value: "Coconut Milk" },
    { label: "Cod", value: "Cod" },
    { label: "Colby Jack Cheese", value: "Colby Jack Cheese" },
    { label: "Cold Water", value: "Cold Water" },
    { label: "Condensed Milk", value: "Condensed Milk" },
    { label: "Confectionery", value: "Confectionery" },
    { label: "Cooking wine", value: "Cooking wine" },
    { label: "Coriander", value: "Coriander" },
    { label: "Coriander Leaves", value: "Coriander Leaves" },
    { label: "Coriander Seeds", value: "Coriander Seeds" },
    { label: "Corn Flour", value: "Corn Flour" },
    { label: "Corn Tortillas", value: "Corn Tortillas" },
    { label: "Cornstarch", value: "Cornstarch" },
    { label: "Courgettes", value: "Courgettes" },
    { label: "Couscous", value: "Couscous" },
    { label: "Cream", value: "Cream" },
    { label: "Cream Cheese", value: "Cream Cheese" },
    { label: "Creamed Corn", value: "Creamed Corn" },
    { label: "Creme Fraiche", value: "Creme Fraiche" },
    { label: "Crusty Bread", value: "Crusty Bread" },
    { label: "Cubed Feta Cheese", value: "Cubed Feta Cheese" },
    { label: "Cucumber", value: "Cucumber" },
    { label: "Cumin", value: "Cumin" },
    { label: "Cumin Seeds", value: "Cumin Seeds" },
    { label: "Curd", value: "Curd" },
    { label: "Currants", value: "Currants" },
    { label: "Curry Powder", value: "Curry Powder" },
    { label: "Custard", value: "Custard" },
    { label: "Custard Powder", value: "Custard Powder" },
    { label: "Dark Brown Soft Sugar", value: "Dark Brown Soft Sugar" },
    { label: "Dark Brown Sugar", value: "Dark Brown Sugar" },
    { label: "Dark Chocolate", value: "Dark Chocolate" },
    { label: "Dark Chocolate Chips", value: "Dark Chocolate Chips" },
    { label: "Dark Rum", value: "Dark Rum" },
    { label: "Dark Soft Brown Sugar", value: "Dark Soft Brown Sugar" },
    { label: "Dark Soy Sauce", value: "Dark Soy Sauce" },
    { label: "Demerara Sugar", value: "Demerara Sugar" },
    { label: "Desiccated Coconut", value: "Desiccated Coconut" },
    { label: "Diced Tomatoes", value: "Diced Tomatoes" },
    { label: "Digestive Biscuits", value: "Digestive Biscuits" },
    { label: "Dijon Mustard", value: "Dijon Mustard" },
    { label: "Dill", value: "Dill" },
    { label: "Dill Pickles", value: "Dill Pickles" },
    { label: "Doner Meat", value: "Doner Meat" },
    { label: "Doubanjiang", value: "Doubanjiang" },
    { label: "Double Cream", value: "Double Cream" },
    { label: "Dressing", value: "Dressing" },
    { label: "Dried Apricots", value: "Dried Apricots" },
    { label: "Dried Fruit", value: "Dried Fruit" },
    { label: "Dried Oregano", value: "Dried Oregano" },
    { label: "Drink", value: "Drink" },
    { label: "Drink", value: "Drink" },
    { label: "Drink", value: "Drink" },
    { label: "Dry White Wine", value: "Dry White Wine" },
    { label: "Duck", value: "Duck" },
    { label: "Duck Fat", value: "Duck Fat" },
    { label: "Duck Legs", value: "Duck Legs" },
    { label: "Duck Sauce", value: "Duck Sauce" },
    { label: "Egg", value: "Egg" },
    { label: "Egg Plants", value: "Egg Plants" },
    { label: "Egg Rolls", value: "Egg Rolls" },
    { label: "Egg White", value: "Egg White" },
    { label: "Egg Yolks", value: "Egg Yolks" },
    { label: "Eggs", value: "Eggs" },
    { label: "Enchilada Sauce", value: "Enchilada Sauce" },
    { label: "English Muffins", value: "English Muffins" },
    { label: "English Mustard", value: "English Mustard" },
    { label: "Extra Virgin Olive Oil", value: "Extra Virgin Olive Oil" },
    { label: "Fajita Seasoning", value: "Fajita Seasoning" },
    { label: "Farfalle", value: "Farfalle" },
    { label: "Fat", value: "Fat" },
    { label: "Fennel", value: "Fennel" },
    { label: "Fennel Bulb", value: "Fennel Bulb" },
    { label: "Fennel Seeds", value: "Fennel Seeds" },
    { label: "Fenugreek", value: "Fenugreek" },
    { label: "Fermented Black Beans", value: "Fermented Black Beans" },
    { label: "Feta", value: "Feta" },
    { label: "Fettuccine", value: "Fettuccine" },
    { label: "Fideo", value: "Fideo" },
    { label: "Figs", value: "Figs" },
    { label: "Filo or phyllo", value: "Filo or phyllo" },
    { label: "Filo Pastry", value: "Filo Pastry" },
    { label: "Fish", value: "Fish" },
    { label: "Fish Sauce", value: "Fish Sauce" },
    { label: "Fish Stock", value: "Fish Stock" },
    { label: "Flaked Almonds", value: "Flaked Almonds" },
    { label: "Flax Eggs", value: "Flax Eggs" },
    { label: "Flour", value: "Flour" },
    { label: "Flour Tortilla", value: "Flour Tortilla" },
    { label: "Floury Potatoes", value: "Floury Potatoes" },
    { label: "Free-range Egg, Beaten", value: "Free-range Egg, Beaten" },
    { label: "Free-range Eggs, Beaten", value: "Free-range Eggs, Beaten" },
    { label: "French Lentils", value: "French Lentils" },
    { label: "Fresh Basil", value: "Fresh Basil" },
    { label: "Fresh Thyme", value: "Fresh Thyme" },
    { label: "Freshly Chopped Parsley", value: "Freshly Chopped Parsley" },
    { label: "Fries", value: "Fries" },
    { label: "Fromage Frais", value: "Fromage Frais" },
    { label: "Frozen Peas", value: "Frozen Peas" },
    { label: "Fruit", value: "Fruit" },
    { label: "Fruit Mix", value: "Fruit Mix" },
    { label: "Full Fat Yogurt", value: "Full Fat Yogurt" },
    { label: "Garam Masala", value: "Garam Masala" },
    { label: "Garlic", value: "Garlic" },
    { label: "Garlic Clove", value: "Garlic Clove" },
    { label: "Garlic Powder", value: "Garlic Powder" },
    { label: "Garlic Sauce", value: "Garlic Sauce" },
    { label: "Gelatine Leafs", value: "Gelatine Leafs" },
    { label: "Ghee", value: "Ghee" },
    { label: "Gherkin Relish", value: "Gherkin Relish" },
    { label: "Ginger", value: "Ginger" },
    { label: "Ginger Cordial", value: "Ginger Cordial" },
    { label: "Ginger Garlic Paste", value: "Ginger Garlic Paste" },
    { label: "Ginger Paste", value: "Ginger Paste" },
    { label: "Glace Cherry", value: "Glace Cherry" },
    { label: "Goat Meat", value: "Goat Meat" },
    { label: "Goats Cheese", value: "Goats Cheese" },
    { label: "Gochujang", value: "Gochujang" },
    { label: "Golden Syrup", value: "Golden Syrup" },
    { label: "Goose Fat", value: "Goose Fat" },
    { label: "Gouda Cheese", value: "Gouda Cheese" },
    { label: "Grain", value: "Grain" },
    { label: "Grain", value: "Grain" },
    { label: "Grand Marnier", value: "Grand Marnier" },
    { label: "Granulated Sugar", value: "Granulated Sugar" },
    { label: "Grape Tomatoes", value: "Grape Tomatoes" },
    { label: "Greek Yogurt", value: "Greek Yogurt" },
    { label: "Green Beans", value: "Green Beans" },
    { label: "Green Chilli", value: "Green Chilli" },
    { label: "Green Olives", value: "Green Olives" },
    { label: "Green Pepper", value: "Green Pepper" },
    { label: "Green Red Lentils", value: "Green Red Lentils" },
    { label: "Green Salsa", value: "Green Salsa" },
    { label: "Ground Almonds", value: "Ground Almonds" },
    { label: "Ground Beef", value: "Ground Beef" },
    { label: "Ground Cumin", value: "Ground Cumin" },
    { label: "Ground Ginger", value: "Ground Ginger" },
    { label: "Ground Pork", value: "Ground Pork" },
    { label: "Gruyère", value: "Gruyère" },
    { label: "Haddock", value: "Haddock" },
    { label: "Ham", value: "Ham" },
    { label: "Hard Taco Shells", value: "Hard Taco Shells" },
    { label: "Haricot Beans", value: "Haricot Beans" },
    { label: "Harissa Spice", value: "Harissa Spice" },
    { label: "Hazlenuts", value: "Hazlenuts" },
    { label: "Heavy Cream", value: "Heavy Cream" },
    { label: "Herring", value: "Herring" },
    { label: "Honey", value: "Honey" },
    { label: "Horseradish", value: "Horseradish" },
    { label: "Hot Beef Stock", value: "Hot Beef Stock" },
    { label: "Hotsauce", value: "Hotsauce" },
    { label: "Ice Cream", value: "Ice Cream" },
    { label: "Iceberg Lettuce", value: "Iceberg Lettuce" },
    { label: "Icing Sugar", value: "Icing Sugar" },
    { label: "Italian Fennel Sausages", value: "Italian Fennel Sausages" },
    { label: "Italian Seasoning", value: "Italian Seasoning" },
    { label: "Jalapeno", value: "Jalapeno" },
    { label: "Jam", value: "Jam" },
    { label: "Jasmine Rice", value: "Jasmine Rice" },
    { label: "Jerk", value: "Jerk" },
    { label: "Jerusalem Artichokes", value: "Jerusalem Artichokes" },
    { label: "Juice", value: "Juice" },
    { label: "Kale", value: "Kale" },
    { label: "Khus Khus", value: "Khus Khus" },
    { label: "Kidney Beans", value: "Kidney Beans" },
    { label: "Kielbasa", value: "Kielbasa" },
    { label: "King Prawns", value: "King Prawns" },
    { label: "Kosher Salt", value: "Kosher Salt" },
    { label: "Lamb", value: "Lamb" },
    { label: "Lamb Kidney", value: "Lamb Kidney" },
    { label: "Lamb Leg", value: "Lamb Leg" },
    { label: "Lamb Loin Chops", value: "Lamb Loin Chops" },
    { label: "Lamb Mince", value: "Lamb Mince" },
    { label: "Lamb Shoulder", value: "Lamb Shoulder" },
    { label: "Lard", value: "Lard" },
    { label: "Lasagne Sheets", value: "Lasagne Sheets" },
    { label: "Lean Minced Beef", value: "Lean Minced Beef" },
    { label: "Leek", value: "Leek" },
    { label: "Lemon", value: "Lemon" },
    { label: "Lemon Juice", value: "Lemon Juice" },
    { label: "Lemon Zest", value: "Lemon Zest" },
    { label: "Lemons", value: "Lemons" },
    { label: "Lentils", value: "Lentils" },
    { label: "Lettuce", value: "Lettuce" },
    { label: "Light Brown Soft Sugar", value: "Light Brown Soft Sugar" },
    { label: "Light Rum", value: "Light Rum" },
    { label: "Lime", value: "Lime" },
    { label: "Linguine Pasta", value: "Linguine Pasta" },
    { label: "Liqueur", value: "Liqueur" },
    { label: "Liquid", value: "Liquid" },
    { label: "Little Gem Lettuce", value: "Little Gem Lettuce" },
    { label: "Macaroni", value: "Macaroni" },
    { label: "Mackerel", value: "Mackerel" },
    { label: "Madras Paste", value: "Madras Paste" },
    { label: "Malt Vinegar", value: "Malt Vinegar" },
    { label: "Maple Syrup", value: "Maple Syrup" },
    { label: "Marjoram", value: "Marjoram" },
    { label: "Mars Bar", value: "Mars Bar" },
    { label: "Marzipan", value: "Marzipan" },
    { label: "Mascarpone", value: "Mascarpone" },
    { label: "Massaman Curry Paste", value: "Massaman Curry Paste" },
    { label: "Mayonnaise", value: "Mayonnaise" },
    { label: "Meat", value: "Meat" },
    { label: "Medjool Dates", value: "Medjool Dates" },
    { label: "Meringue Nests", value: "Meringue Nests" },
    { label: "Milk", value: "Milk" },
    { label: "Milk Chocolate", value: "Milk Chocolate" },
    { label: "Minced Beef", value: "Minced Beef" },
    { label: "Minced Garlic", value: "Minced Garlic" },
    { label: "Minced Pork", value: "Minced Pork" },
    { label: "Mincemeat", value: "Mincemeat" },
    { label: "Miniature Marshmallows", value: "Miniature Marshmallows" },
    { label: "Mint", value: "Mint" },
    { label: "Mirin", value: "Mirin" },
    { label: "Mixed Grain", value: "Mixed Grain" },
    { label: "Mixed Peel", value: "Mixed Peel" },
    { label: "Mixed Spice", value: "Mixed Spice" },
    { label: "Monkfish", value: "Monkfish" },
    { label: "Monterey Jack Cheese", value: "Monterey Jack Cheese" },
    { label: "Mozzarella", value: "Mozzarella" },
    { label: "Mozzarella Balls", value: "Mozzarella Balls" },
    { label: "Muffins", value: "Muffins" },
    { label: "Mulukhiyah", value: "Mulukhiyah" },
    { label: "Muscovado Sugar", value: "Muscovado Sugar" },
    { label: "Mushrooms", value: "Mushrooms" },
    { label: "Mussels", value: "Mussels" },
    { label: "Mustard", value: "Mustard" },
    { label: "Mustard Powder", value: "Mustard Powder" },
    { label: "Mustard Seeds", value: "Mustard Seeds" },
    { label: "Naan Bread", value: "Naan Bread" },
    { label: "Noodles", value: "Noodles" },
    { label: "Nutmeg", value: "Nutmeg" },
    { label: "Oatmeal", value: "Oatmeal" },
    { label: "Oats", value: "Oats" },
    { label: "Oil", value: "Oil" },
    { label: "Olive Oil", value: "Olive Oil" },
    { label: "Onion", value: "Onion" },
    { label: "Onion Salt", value: "Onion Salt" },
    { label: "Onions", value: "Onions" },
    { label: "Orange", value: "Orange" },
    { label: "Orange Blossom Water", value: "Orange Blossom Water" },
    { label: "Orange Zest", value: "Orange Zest" },
    { label: "Oregano", value: "Oregano" },
    { label: "Oxtail", value: "Oxtail" },
    { label: "Oyster Sauce", value: "Oyster Sauce" },
    { label: "Oysters", value: "Oysters" },
    { label: "Paccheri Pasta", value: "Paccheri Pasta" },
    { label: "Paella Rice", value: "Paella Rice" },
    { label: "Paneer", value: "Paneer" },
    { label: "Pappardelle Pasta", value: "Pappardelle Pasta" },
    { label: "Paprika", value: "Paprika" },
    { label: "Parma Ham", value: "Parma Ham" },
    { label: "Parmesan", value: "Parmesan" },
    { label: "Parmesan Cheese", value: "Parmesan Cheese" },
    { label: "Parmigiano-reggiano", value: "Parmigiano-reggiano" },
    { label: "Parsley", value: "Parsley" },
    { label: "Passata", value: "Passata" },
    { label: "Pastry", value: "Pastry" },
    { label: "Peaches", value: "Peaches" },
    { label: "Peanut Brittle", value: "Peanut Brittle" },
    { label: "Peanut Butter", value: "Peanut Butter" },
    { label: "Peanut Cookies", value: "Peanut Cookies" },
    { label: "Peanut Oil", value: "Peanut Oil" },
    { label: "Peanuts", value: "Peanuts" },
    { label: "Pears", value: "Pears" },
    { label: "Peas", value: "Peas" },
    { label: "Pecan Nuts", value: "Pecan Nuts" },
    { label: "Pecorino", value: "Pecorino" },
    { label: "Penne Rigate", value: "Penne Rigate" },
    { label: "Pepper", value: "Pepper" },
    { label: "Persian Cucumber", value: "Persian Cucumber" },
    { label: "Pickle Juice", value: "Pickle Juice" },
    { label: "Pilchards", value: "Pilchards" },
    { label: "Pine Nuts", value: "Pine Nuts" },
    { label: "Pink Food Colouring", value: "Pink Food Colouring" },
    { label: "Pinto Beans", value: "Pinto Beans" },
    { label: "Pita Bread", value: "Pita Bread" },
    { label: "Pitted Black Olives", value: "Pitted Black Olives" },
    { label: "Plain Chocolate", value: "Plain Chocolate" },
    { label: "Plain Flour", value: "Plain Flour" },
    { label: "Plum Tomatoes", value: "Plum Tomatoes" },
    { label: "Polish Sausage", value: "Polish Sausage" },
    { label: "Pork", value: "Pork" },
    { label: "Pork Chops", value: "Pork Chops" },
    { label: "Potato Starch", value: "Potato Starch" },
    { label: "Potatoe Buns", value: "Potatoe Buns" },
    { label: "Potatoes", value: "Potatoes" },
    { label: "Powdered Sugar", value: "Powdered Sugar" },
    { label: "Prawns", value: "Prawns" },
    { label: "Preserve", value: "Preserve" },
    { label: "Pretzels", value: "Pretzels" },
    { label: "Prosciutto", value: "Prosciutto" },
    { label: "Puff Pastry", value: "Puff Pastry" },
    { label: "Pumpkin", value: "Pumpkin" },
    { label: "Quinoa", value: "Quinoa" },
    { label: "Raisins", value: "Raisins" },
    { label: "Rapeseed Oil", value: "Rapeseed Oil" },
    { label: "Ras el hanout", value: "Ras el hanout" },
    { label: "Raspberries", value: "Raspberries" },
    { label: "Raspberry Jam", value: "Raspberry Jam" },
    { label: "Raw King Prawns", value: "Raw King Prawns" },
    { label: "Red Chile Flakes", value: "Red Chile Flakes" },
    { label: "Red Chilli", value: "Red Chilli" },
    { label: "Red Chilli Powder", value: "Red Chilli Powder" },
    { label: "Red Food Colouring", value: "Red Food Colouring" },
    { label: "Red Onions", value: "Red Onions" },
    { label: "Red Pepper", value: "Red Pepper" },
    { label: "Red Pepper Flakes", value: "Red Pepper Flakes" },
    { label: "Red Snapper", value: "Red Snapper" },
    { label: "Red Wine", value: "Red Wine" },
    { label: "Red Wine Jelly", value: "Red Wine Jelly" },
    { label: "Red Wine Vinegar", value: "Red Wine Vinegar" },
    { label: "Redcurrants", value: "Redcurrants" },
    { label: "Refried Beans", value: "Refried Beans" },
    { label: "Rhubarb", value: "Rhubarb" },
    { label: "Rice", value: "Rice" },
    { label: "Rice Krispies", value: "Rice Krispies" },
    { label: "Rice Noodles", value: "Rice Noodles" },
    { label: "Rice Stick Noodles", value: "Rice Stick Noodles" },
    { label: "Rice Vermicelli", value: "Rice Vermicelli" },
    { label: "Rice Vinegar", value: "Rice Vinegar" },
    { label: "Rice wine", value: "Rice wine" },
    { label: "Ricotta", value: "Ricotta" },
    { label: "Rigatoni", value: "Rigatoni" },
    { label: "Roasted Vegetables", value: "Roasted Vegetables" },
    { label: "Rocket", value: "Rocket" },
    { label: "Rolled Oats", value: "Rolled Oats" },
    { label: "Root Vegetable", value: "Root Vegetable" },
    { label: "Rose water", value: "Rose water" },
    { label: "Rosemary", value: "Rosemary" },
    { label: "Rum", value: "Rum" },
    { label: "Saffron", value: "Saffron" },
    { label: "Sage", value: "Sage" },
    { label: "Sake", value: "Sake" },
    { label: "Salmon", value: "Salmon" },
    { label: "Salsa", value: "Salsa" },
    { label: "Salt", value: "Salt" },
    { label: "Salt Cod", value: "Salt Cod" },
    { label: "Salted Butter", value: "Salted Butter" },
    { label: "Sardines", value: "Sardines" },
    { label: "Sauce", value: "Sauce" },
    { label: "Sauerkraut", value: "Sauerkraut" },
    { label: "Sausages", value: "Sausages" },
    { label: "Scallions", value: "Scallions" },
    { label: "Scotch Bonnet", value: "Scotch Bonnet" },
    { label: "Sea Salt", value: "Sea Salt" },
    { label: "Seafood", value: "Seafood" },
    { label: "Seasoning", value: "Seasoning" },
    { label: "Sedge", value: "Sedge" },
    { label: "Self-raising Flour", value: "Self-raising Flour" },
    { label: "Semi-skimmed Milk", value: "Semi-skimmed Milk" },
    { label: "Sesame Seed", value: "Sesame Seed" },
    { label: "Sesame Seed Burger Buns", value: "Sesame Seed Burger Buns" },
    { label: "Sesame Seed Oil", value: "Sesame Seed Oil" },
    { label: "Shallots", value: "Shallots" },
    { label: "Sherry", value: "Sherry" },
    { label: "Shiitake Mushrooms", value: "Shiitake Mushrooms" },
    { label: "Shortcrust Pastry", value: "Shortcrust Pastry" },
    { label: "Shortening", value: "Shortening" },
    { label: "Shredded Mexican Cheese", value: "Shredded Mexican Cheese" },
    {
      label: "Shredded Monterey Jack Cheese",
      value: "Shredded Monterey Jack Cheese",
    },
    { label: "Sichuan Pepper", value: "Sichuan Pepper" },
    { label: "Side", value: "Side" },
    { label: "Single Cream", value: "Single Cream" },
    { label: "Small Potatoes", value: "Small Potatoes" },
    { label: "Smoked Haddock", value: "Smoked Haddock" },
    { label: "Smoked Paprika", value: "Smoked Paprika" },
    { label: "Smoked Salmon", value: "Smoked Salmon" },
    { label: "Smoky Paprika", value: "Smoky Paprika" },
    { label: "Sour Cream", value: "Sour Cream" },
    { label: "Soy Sauce", value: "Soy Sauce" },
    { label: "Soya Milk", value: "Soya Milk" },
    { label: "Spaghetti", value: "Spaghetti" },
    { label: "Spice", value: "Spice" },
    { label: "Spinach", value: "Spinach" },
    { label: "Spirit", value: "Spirit" },
    { label: "Spring Onions", value: "Spring Onions" },
    { label: "Squash", value: "Squash" },
    { label: "Squid", value: "Squid" },
    { label: "Sriracha", value: "Sriracha" },
    { label: "Star Anise", value: "Star Anise" },
    { label: "Starch", value: "Starch" },
    { label: "Stilton Cheese", value: "Stilton Cheese" },
    { label: "Stir-fry Vegetables", value: "Stir-fry Vegetables" },
    { label: "Stock", value: "Stock" },
    { label: "Stout", value: "Stout" },
    { label: "Strawberries", value: "Strawberries" },
    { label: "Suet", value: "Suet" },
    { label: "Sugar", value: "Sugar" },
    { label: "Sugar Snap Peas", value: "Sugar Snap Peas" },
    { label: "Sultanas", value: "Sultanas" },
    { label: "Sun-Dried Tomatoes", value: "Sun-Dried Tomatoes" },
    { label: "Sunflower Oil", value: "Sunflower Oil" },
    { label: "Sushi Rice", value: "Sushi Rice" },
    { label: "Swede", value: "Swede" },
    { label: "Sweet Potatoes", value: "Sweet Potatoes" },
    { label: "Sweetcorn", value: "Sweetcorn" },
    { label: "Tabasco Sauce", value: "Tabasco Sauce" },
    { label: "Tagliatelle", value: "Tagliatelle" },
    { label: "Tahini", value: "Tahini" },
    { label: "Tamarind Ball", value: "Tamarind Ball" },
    { label: "Tamarind Paste", value: "Tamarind Paste" },
    { label: "Tarragon Leaves", value: "Tarragon Leaves" },
    { label: "Thai Fish Sauce", value: "Thai Fish Sauce" },
    { label: "Thai Green Curry Paste", value: "Thai Green Curry Paste" },
    { label: "Thai Red Curry Paste", value: "Thai Red Curry Paste" },
    { label: "Thyme", value: "Thyme" },
    { label: "Tiger Prawns", value: "Tiger Prawns" },
    { label: "Tinned Tomatos", value: "Tinned Tomatos" },
    { label: "Toffee Popcorn", value: "Toffee Popcorn" },
    { label: "Tofu", value: "Tofu" },
    { label: "Tomato", value: "Tomato" },
    { label: "Tomato Ketchup", value: "Tomato Ketchup" },
    { label: "Tomato Puree", value: "Tomato Puree" },
    { label: "Tomato Sauce", value: "Tomato Sauce" },
    { label: "Tomatoes", value: "Tomatoes" },
    { label: "Toor Dal", value: "Toor Dal" },
    { label: "Tortillas", value: "Tortillas" },
    { label: "Treacle", value: "Treacle" },
    { label: "Tripe", value: "Tripe" },
    { label: "Truffle Oil", value: "Truffle Oil" },
    { label: "Tuna", value: "Tuna" },
    { label: "Turkey Mince", value: "Turkey Mince" },
    { label: "Turmeric", value: "Turmeric" },
    { label: "Turmeric Powder", value: "Turmeric Powder" },
    { label: "Turnips", value: "Turnips" },
    { label: "Udon Noodles", value: "Udon Noodles" },
    { label: "Unsalted Butter", value: "Unsalted Butter" },
    { label: "Vanilla", value: "Vanilla" },
    { label: "Vanilla Extract", value: "Vanilla Extract" },
    { label: "Veal", value: "Veal" },
    { label: "Vegan Butter", value: "Vegan Butter" },
    { label: "Vegetable", value: "Vegetable" },
    { label: "Vegetable Oil", value: "Vegetable Oil" },
    { label: "Vegetable Stock", value: "Vegetable Stock" },
    { label: "Vegetable Stock Cube", value: "Vegetable Stock Cube" },
    { label: "Vermicelli Pasta", value: "Vermicelli Pasta" },
    { label: "Vinaigrette Dressing", value: "Vinaigrette Dressing" },
    { label: "Vine Leaves", value: "Vine Leaves" },
    { label: "Vine Tomatoes", value: "Vine Tomatoes" },
    { label: "Vinegar", value: "Vinegar" },
    { label: "Walnuts", value: "Walnuts" },
    { label: "Warm Water", value: "Warm Water" },
    { label: "Water", value: "Water" },
    { label: "Water Chestnut", value: "Water Chestnut" },
    { label: "White Chocolate", value: "White Chocolate" },
    { label: "White Chocolate Chips", value: "White Chocolate Chips" },
    { label: "White Fish", value: "White Fish" },
    { label: "White Fish Fillets", value: "White Fish Fillets" },
    { label: "White Flour", value: "White Flour" },
    { label: "White Vinegar", value: "White Vinegar" },
    { label: "White Wine", value: "White Wine" },
    { label: "White Wine Vinegar", value: "White Wine Vinegar" },
    { label: "Whole Milk", value: "Whole Milk" },
    { label: "Whole Wheat", value: "Whole Wheat" },
    { label: "Wholegrain Bread", value: "Wholegrain Bread" },
    { label: "Wild Mushrooms", value: "Wild Mushrooms" },
    { label: "Wine", value: "Wine" },
    { label: "Wonton Skin", value: "Wonton Skin" },
    { label: "Wood Ear Mushrooms", value: "Wood Ear Mushrooms" },
    { label: "Worcestershire Sauce", value: "Worcestershire Sauce" },
    { label: "Yeast", value: "Yeast" },
    { label: "Yellow Food Colouring", value: "Yellow Food Colouring" },
    { label: "Yellow Onion", value: "Yellow Onion" },
    { label: "Yellow Pepper", value: "Yellow Pepper" },
    { label: "Yogurt", value: "Yogurt" },
    { label: "Yukon Gold Potatoes", value: "Yukon Gold Potatoes" },
    { label: "Zucchini", value: "Zucchini" },
  ];

  const filterCategories = [
    { label: "Beef", value: "Beef" },
    { label: "Breakfast", value: "Breakfast" },
    { label: "Chicken", value: "Chicken" },
    { label: "Dessert", value: "Dessert" },
    { label: "Goat", value: "Goat" },
    { label: "Lamb", value: "Lamb" },
    { label: "Miscellaneous", value: "Miscellaneous" },
    { label: "Pasta", value: "Pasta" },
    { label: "Pork", value: "Pork" },
    { label: "Seafood", value: "Seafood" },
    { label: "Side", value: "Side" },
    { label: "Starter", value: "Starter" },
    { label: "Vegan", value: "Vegan" },
    { label: "Vegitarian", value: "Vegitarian" },
  ];

  const filterAreas = [
    { label: "American", value: "American" },
    { label: "Canadian", value: "Canadian" },
    { label: "Chinese", value: "Chinese" },
    { label: "Croatian", value: "Croatian" },
    { label: "Dutch", value: "Dutch" },
    { label: "Egyptian", value: "Egyptian" },
    { label: "French", value: "French" },
    { label: "Greek", value: "Greek" },
    { label: "Indian", value: "Indian" },
    { label: "Irish", value: "Irish" },
    { label: "Italian", value: "Italian" },
    { label: "Jamaican", value: "Jamaican" },
    { label: "Japanese", value: "Japanese" },
    { label: "Kenyan", value: "Kenyan" },
    { label: "Malaysian", value: "Malaysian" },
    { label: "Mexican", value: "Mexican" },
    { label: "Moroccan", value: "Moroccan" },
    { label: "Polish", value: "Polish" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Russian", value: "Russian" },
    { label: "Spanish", value: "Spanish" },
    { label: "Thai", value: "Thai" },
    { label: "Tunisian", value: "Tunisian" },
    { label: "Turkish", value: "Turkish" },
    { label: "Unknown", value: "Unknown" },
    { label: "Vietnamese", value: "Vietnamese" },
  ];


  const baseURL = "http://localhost:8000/api/recipes";

  const handleClearIngredient = () => {
    setFormState({
      ...formState,
      filterIngredient: "",
    });
  };

  const handleClearCategory = () => {
    setFormState({
      ...formState,
      filterCategory: "",
    });
  };

  const handleClearArea = () => {
    setFormState({
      ...formState,
      filterArea: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      params: {
        i: formState.filterIngredient.value,
        c: formState.filterCategory.value,
        a: formState.filterArea.value,
      },
    };
    console.log("axios config from frontend: ", config);

    if (config.params.i || config.params.c || config.params.a) {
      const serverResponse = await axios.get(`${baseURL}/filter_recipes`, config);
      const meals = serverResponse.data.meals;

      setMealsArray(meals);

      if (mealsArray) {
        try {
          setMealsArray(meals);
          setSearchQueries([
            formState.filterIngredient.value,
            formState.filterCategory.value,
            formState.filterArea.value,
          ]);
        } catch (error) {
          console.error(error);
        }
      }
      console.log("meals array: ", mealsArray);
      console.log("axios config: ", config);
    }
  };

  return (
    <div className="filter-container flex-ctr-ctr">
      <form id="filter-recipes-form" autoComplete="off" onSubmit={handleSubmit}>
        <section className="filter" style={{ width: `200px` }}>
          <Select
            options={filterIngredients}
           
            isClearable
            placeholder="Skladnik"
            value={formState.filterIngredient}
            onChange={(option) => handleFilterIngredient(option)}
            components={{
              ClearIndicator: () => (
                <div onClick={handleClearIngredient}>Wyczysc</div>
              ),
            }}
          />
        </section>
        <section className="filter" style={{ width: `200px` }}>
          <Select
            options={filterCategories}
           
            isClearable
            placeholder="Kategoria"
            value={formState.filterCategory}
            onChange={(option) => handleFilterCategory(option)}
            components={{
              ClearIndicator: () => (
                <div onClick={handleClearCategory}>Wyczysc</div>
              ),
            }}
          />
        </section>
        <section className="filter" style={{ width: `200px` }}>
          <Select
            options={filterAreas}
            
            isClearable
            placeholder="Pochodzenie"
            value={formState.filterArea}
            onChange={(option) => handleFilterArea(option)}
            components={{
              ClearIndicator: () => <div onClick={handleClearArea}>Wyczysc</div>,
            }}
          />
        </section>
        <button type="submit" className="filter_button">Filtruj</button>
      </form>
    </div>
  );
};

export default FilterRecipes;