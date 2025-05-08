document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const menuData = [
        // Breakfast
        { id: 1, name: "Grand Slam", description: "Two eggs any style with Portuguese sausage, bacon & ham, served with rice.", price: "15.50", category: "Breakfast", subcategory: "All Day Breakfast", image: "asset/images/breakfast/grandslam.png" },
        { id: 2, name: "Steak & Eggs", description: "Top Sirloin Steak and two eggs any style, served with rice or toast.", price: "20.00", category: "Breakfast", subcategory: "All Day Breakfast", image: "asset/images/breakfast/steakegg.png" },
        { id: 3, name: "Eggs Benedict", description: "Poached eggs & your choice of ham or bacon, over english muffins, topped with hollandaise sauce.", price: "11.00", category: "Breakfast", subcategory: "All Day Breakfast", image: "asset/images/breakfast/eggsbenedict.png" },
        { id: 4, name: "Tuna Steak & Eggs", description: "Grilled tuna steak & two eggs any style, served with rice or toast", price: "9.25", category: "Breakfast", subcategory: "All Day Breakfast", image: "asset/images/breakfast/tunasteakeggs.png" },
        { id: 5, name: "Beef Tapa", description: "", price: "10.00", category: "Breakfast", subcategory: "All Day Breakfast", image: "asset/images/breakfast/beeftapa.png" },

        // Eggs and More
        { id: 6, name: "Ham & Eggs", description: "", price: "8.75", category: "Breakfast", subcategory: "Eggs and More", image: "asset/images/breakfast/hamandegg.png" },
        { id: 7, name: "Link Sausage & Eggs", description: "", price: "9.00", category: "Breakfast", subcategory: "Eggs and More", image: " " },
        { id: 8, name: "Portuguese Sausage & Eggs", description: "", price: "8.50", category: "Breakfast", subcategory: "Eggs and More", image: "asset/images/breakfast/portuegg.png" },
        { id: 9, name: "Pork & Eggs", description: "", price: "9.25", category: "Breakfast", subcategory: "Eggs and More", image: " " },
        { id: 10, name: "Bacon & Eggs", description: "", price: "9.50", category: "Breakfast", subcategory: "Eggs and More", image: " " },
        { id: 11, name: "Spam & Eggs", description: "", price: "9.00", category: "Breakfast", subcategory: "Eggs and More", image: "asset/images/breakfast/spamegg.png" },
        { id: 12, name: "Tuna Omelette", description: "", price: "9.75", category: "Breakfast", subcategory: "Eggs and More", image: "asset/images/breakfast/tunaome.png" },
        { id: 13, name: "Veggie Omelette", description: "", price: "8.00", category: "Breakfast", subcategory: "Eggs and More", image: " " },
        { id: 14, name: "Ham & Cheese Omelette", description: "", price: "9.25", category: "Breakfast", subcategory: "Eggs and More", image: "asset/images/breakfast/hamcheeseome.png" },
        { id: 15, name: "Cheese Omelette", description: "", price: "7.75", category: "Breakfast", subcategory: "Eggs and More", image: "  " },

        // Japanese Ramen
        { id: 16, name: "Japanese Ramen (Plain)", description: "Choice of: Shoyu / Spicy Miso / Miso / Shio", price: "9.50", category: "Breakfast", subcategory: "Japanese Ramen", image: " " },
        { id: 17, name: "Japanese Ramen (Beef)", description: "Choice of: Shoyu / Spicy Miso / Miso / Shio", price: "12.50", category: "Breakfast", subcategory: "Japanese Ramen", image: "asset/images/breakfast/ramenbeefmiso.png" },
        { id: 18, name: "Japanese Ramen (Pork)", description: "Choice of: Shoyu / Spicy Miso / Miso / Shio", price: "11.50", category: "Breakfast", subcategory: "Japanese Ramen", image: " " },
        { id: 19, name: "Japanese Ramen (Ham)", description: "Choice of: Shoyu / Spicy Miso / Miso / Shio", price: "11.25", category: "Breakfast", subcategory: "Japanese Ramen", image: " " },
        { id: 20, name: "Japanese Ramen (Fish)", description: "Choice of: Shoyu / Spicy Miso / Miso / Shio", price: "10.75", category: "Breakfast", subcategory: "Japanese Ramen", image: " " },
        { id: 21, name: "Japanese Ramen (Chicken)", description: "Choice of: Shoyu / Spicy Miso / Miso / Shio", price: "10.50", category: "Breakfast", subcategory: "Japanese Ramen", image: " " },

        // Pancakes and Waffles
        { id: 22, name: "Plain Pancake", description: "", price: "9.00", category: "Breakfast", subcategory: "Pancakes & Waffles", image: "asset/images/breakfast/plainpancake.png" },
        { id: 22, name: "Banana Foster Pancake", description: "Pancake with caramelized banana syrup with a hint of rum and cinnamon.", price: "9.00", category: "Breakfast", subcategory: "Pancakes & Waffles", image: "asset/images/breakfast/bananafoster.png" },
        { id: 23, name: "Island Style Pancake", description: "Pancake with drizzle of fruit/island syrup ", price: "8.50", category: "Breakfast", subcategory: "Pancakes & Waffles", image: " " },
        { id: 24, name: "Banana Macadamia Pancake", description: "Pancake with banana syrup and crunchy macadamia nuts.", price: "9.00", category: "Breakfast", subcategory: "Pancakes & Waffles", image: "asset/images/breakfast/macadamia.png" },
        { id: 25, name: "Blueberry Pancake", description: "Pancake with drizzle of blueberries syrup.", price: "9.00", category: "Breakfast", subcategory: "Pancakes & Waffles", image: "asset/images/breakfast/blueberry.png" },
        { id: 26, name: "Strawberry Pancake", description: "Pancake with drizzle of strawberries syrup. ", price: "9.00", category: "Breakfast", subcategory: "Pancakes & Waffles", image: " " },
        { id: 27, name: "Chocolate Pancake", description: "Pancake with drizzle of chocolate syrup.", price: "8.75", category: "Breakfast", subcategory: "Pancakes & Waffles", image: " " },
        { id: 28, name: "Ube Pancake", description: "Pancake with drizzle of ube syrup.", price: "8.75", category: "Breakfast", subcategory: "Pancakes & Waffles", image: "asset/images/breakfast/ubepancake.png" },
        { id: 29, name: "Plain Waffle", description: "", price: "8.25", category: "Breakfast", subcategory: "Pancakes & Waffles", image: " " },
        { id: 30, name: "Banana Foster Waffle", description: "", price: "10.25", category: "Breakfast", subcategory: "Pancakes & Waffles", image: " " },
        { id: 31, name: "Chocolate Waffle", description: "", price: "9.00", category: "Breakfast", subcategory: "Pancakes & Waffles", image: "asset/images/breakfast/chocowaffle.png" },
        { id: 32, name: "Ube Waffle", description: "", price: "9.25", category: "Breakfast", subcategory: "Pancakes & Waffles", image: " " },

        // Sides
        { id: 33, name: "Plain Rice", description: "", price: "2.25", category: "Breakfast", subcategory: "Sides", image: " " },
        { id: 34, name: "Fried Rice", description: "", price: "5.00", category: "Breakfast", subcategory: "Sides", image: "asset/images/breakfast/friedrice.png" },
        { id: 35, name: "Bagel", description: "", price: "4.75", category: "Breakfast", subcategory: "Sides", image: " " },
        { id: 36, name: "Toast", description: "", price: "3.00", category: "Breakfast", subcategory: "Sides", image: " " },
        { id: 37, name: "French Toast", description: "", price: "5.50", category: "Breakfast", subcategory: "Sides", image: " " },
        { id: 38, name: "Wheat Toast", description: "", price: "4.50", category: "Breakfast", subcategory: "Sides", image: " " },
        { id: 39, name: "Eggs", description: "", price: "3.75", category: "Breakfast", subcategory: "Sides", image: " " },
        { id: 40, name: "Sliced Bacon", description: "", price: "6.00", category: "Breakfast", subcategory: "Sides", image: " " },
        { id: 41, name: "Portuguese Sausage", description: "", price: "4.25", category: "Breakfast", subcategory: "Sides", image: " " },
        { id: 42, name: "Pork Link Sausage", description: "", price: "4.25", category: "Breakfast", subcategory: "Sides", image: " " },
        { id: 43, name: "English Muffin", description: "", price: "4.50", category: "Breakfast", subcategory: "Sides", image: " " },

        // Lunch Mains

        { id: 44, name: "A-One Bento", description: "Rice + Panko Fish + Teriyaki Beef + Chicken", price: "11.00", category: "Lunch", subcategory: "Mains", image: "asset/images/lunch/aonebento.png" },
        { id: 45, name: "Fried Chicken", description: "Chicken seasoned overnight and then breaded and deep-fried, served with rice.", price: "7.50", category: "Lunch", subcategory: "Mains", image: "asset/images/lunch/friedchicken.png" },
        { id: 46, name: "Garlic Fried Chicken", description: "Golden fried chicken infused with rich, savory garlic flavor, served with rice.", price: "8.00", category: "Lunch", subcategory: "Mains", image: " " },
        { id: 47, name: "Sweet & Sour Chicken", description: "Chicken in tempura batter deep-fried and covered in a sweer & sour fruit and vegetable sauce, served with rice.", price: "8.00", category: "Lunch", subcategory: "Mains", image: " " },
        { id: 48, name: "Sashimi", description: "Sushi grade yellow-fin tuna sliced thin and served with a soy dipping sauce, served with rice.", price: "8.00", category: "Lunch", subcategory: "Mains", image: "asset/images/lunch/sashimi.png" },
        { id: 49, name: "Garlic Fried Tuna", description: "Fresh tuna seared with garlic and crispy perfection, served with rice.", price: "9.50", category: "Lunch", subcategory: "Mains", image: "asset/images/lunch/garlicfriedtuna.png" },
        { id: 50, name: "Sweet & Sour Fish", description: "Fish fillets in tempura batter deep-fried and covered in a sweet & sour fruit and vegetable sauce, served with rice.", price: "8.25", category: "Lunch", subcategory: "Mains", image: "asset/images/lunch/sweetandsourfish.png" },

        // Sandwhiches
        { id: 5, name: "Tuna Sandwich", description: "", price: "8.25", category: "Lunch", subcategory: "Sandwiches", image: " " },
        { id: 6, name: "Club Sandwich", description: "", price: "9.50", category: "Lunch", subcategory: "Sandwiches", image: "asset/images/lunch/clubsandwich.png" },
        { id: 7, name: "Pastrami Sandwich", description: "", price: "9.50", category: "Lunch", subcategory: "Sandwiches", image: " " },
        { id: 8, name: "Ham & Cheese Sandwich", description: "", price: "8.00", category: "Lunch", subcategory: "Sandwiches", image: " " },
        { id: 9, name: "Turkey Sandwich", description: "", price: "8.00", category: "Lunch", subcategory: "Sandwiches", image: "  " },
        { id: 10, name: "Chicken Sandwich", description: "", price: "8.00", category: "Lunch", subcategory: "Sandwiches", image: " " },
        { id: 11, name: "Roast Beef Sandwich", description: "", price: "9.25", category: "Lunch", subcategory: "Sandwiches", image: "asset/images/lunch/roastbeefsand.png" },
        { id: 12, name: "Crab & Cheese Sandwich", description: "", price: "9.25", category: "Lunch", subcategory: "Sandwiches", image: "asset/images/lunch/crabandcheesesandwich.png" },
        { id: 13, name: "French Dip", description: "", price: "9.25", category: "Lunch", subcategory: "Sandwiches", image: "" },

        // Burgers
        { id: 5, name: "Cheeseburger", description: "Beef patty, melted cheese, lettuce, tomato, onion, pickles on a toasted bun.", price: "9.75", category: "Lunch", subcategory: "Burgers", image: "asset/images/lunch/cheeseburger.png" },
        { id: 6, name: "Hamburger", description: "Beef patty, lettuce, tomatoes, and pickles on a toasted bun.", price: "9.00", category: "Lunch", subcategory: "Burgers", image: "asset/images/lunch/hamburger.png" },
        { id: 7, name: "Burger Deluxe", description: "A deluxe masterpiece with double cheese, smoky bacon, fresh veggies, and our signature sauce on a toasted bun.", price: "10.75", category: "Lunch", subcategory: "Burgers", image: "asset/images/lunch/burgerdeluxe.png" },
        { id: 8, name: "Teriyaki Burger", description: "Juicy beef patty glazed with teriyaki sauce, and fresh lettuce on a toasted bun.", price: "9.25", category: "Lunch", subcategory: "Burgers", image: "asset/images/lunch/teriyakiburger.png" },

        // Salads
        { id: 5, name: "Caesar Salad", description: "Fresh lettuce, creamy Caesar dressing, crunchy croutons, and Parmesan cheese.", price: "7.50", category: "Lunch", subcategory: "Salad", image: "asset/images/lunch/caesarsalad.png" },
        { id: 6, name: "Potato Salad", description: "Potatoes, Eggs, Spices in a light mayonnaise dressing.", price: "3.75", category: "Lunch", subcategory: "Salad", image: "asset/images/lunch/potatosalad.png" },
        { id: 7, name: "Green Salad", description: "Lettuce, carrots, tomatoes and your choice of dressing", price: "3.75", category: "Lunch", subcategory: "Salad", image: " " },
        { id: 7, name: "Chef Salad", description: "", price: "6.25", category: "Lunch", subcategory: "Salad", image: " " },
        { id: 7, name: "Garden Salad", description: "", price: "4.00", category: "Lunch", subcategory: "Salad", image: " " },

         // Extras
        { id: 7, name: "Loco Moco", description: "Seasoned beef patties grilled and topped with a house gravy.", price: "13.00", category: "Lunch", subcategory: "Extras", image: " " },
        { id: 7, name: "Seafood Spaghetti", description: "Spaghetti noodles with seafood mix and wine butter sauce, served  with garlic bread.", price: "9.50", category: "Lunch", subcategory: "Extras", image: "asset/images/lunch/seafoodspag.png" },
        { id: 7, name: "Shrimp Saute", description: "Midly Seasoned and sauteed in garlic butter.", price: "13.50", category: "Lunch", subcategory: "Extras", image: "asset/images/lunch/shrimpsaute.png" },



        // Dinner
        // Appetizers
        { id: 14, name: "Fresh Tuna Sashimi", description: "Freshly-caught sushi-grade tuna delicately sliced and draped over garnish.", price: "8.75", category: "Dinner", subcategory: "Appetizers", image: "asset/images/dinner/freshtunasashimi.png" },
        { id: 14, name: "Fresh Tuna Poke", description: "Fresh Tuna cut into cubes and tossed in a sauce of sesame soy sauce marinade.", price: "6.75", category: "Dinner", subcategory: "Appetizers", image: "asset/images/dinner/tunapoke.png" },
        { id: 14, name: "Teriyaki Meat Balls ", description: "Meat balls glazed with our chef’s signature teriyaki sauce and skewer grilled.", price: "8.50", category: "Dinner", subcategory: "Appetizers", image: "asset/images/dinner/terimeatballs.png" },
        { id: 14, name: "Chicken Nuggets", description: "Sliced chicken breast seasoned then breaded/battered then deep fried/baked.", price: "6.25", category: "Dinner", subcategory: "Appetizers", image: "asset/images/dinner/chickennuggets.png" },
        { id: 14, name: "Classic Chicken Wings", description: "Juicy wings done in your choice of hot or mild sauce.", price: "7.25", category: "Dinner", subcategory: "Appetizers", image: "asset/images/dinner/chickenwings.png" },
        { id: 14, name: "Chicken Quesadilla", description: "Grilled chicken over melted cheese, a fresh blend of spices served between two large flour tortillas with our signature salsa spread", price: "9.00", category: "Dinner", subcategory: "Appetizers", image: "asset/images/dinner/chickenquesadilla.png" },
        { id: 14, name: "Cheese Quesadilla", description: "Melted cheese over flour tortillas served with a fresh blend of spices with our signature salsa spread.", price: "8.00", category: "Dinner", subcategory: "Appetizers", image: "asset/images/dinner/cheesequesadilla.png" },

        // Main-Entrees
        // Pork
        { id: 15, name: "Crispy Pork Belly", description: "Pork belly braised and then pan-fried to a crisp.", price: "9.75", category: "Dinner", subcategory: "Pork", image: "asset/images/dinner/crispybelly.png" },
        { id: 15, name: "Pork Chops", description: "Select cuts seared to lock in flavor then grilled to a perfect finish.", price: "9.50", category: "Dinner", subcategory: "Pork", image: "asset/images/dinner/porkchops.png" },
        { id: 15, name: "Pork sisig fried rice", description: "Sauteed minced pork with fried rice.", price: "9.25", category: "Dinner", subcategory: "Pork", image: "asset/images/dinner/porksisigrice.png" },
        { id: 15, name: "Baby Back Ribs", description: "Tender rack oven roasted to tender perfection.", price: "19.00", category: "Dinner", subcategory: "Pork", image: "" },
        { id: 15, name: "Sweet & Sour Pork", description: "Pork in tempura batter deep-fried and covered in a sweet & sour fruit and vegetable sauce.", price: "9.50", category: "Dinner", subcategory: "Pork", image: "" },
        { id: 15, name: "Crispy Pork Pata", description: "Deep-Fried Pork Knuckle with Crunchy Skin and Juicy Tender Meat.", price: "17.50", category: "Dinner", subcategory: "Pork", image: "asset/images/dinner/crispypata.png" },

        // Steak
        { id: 15, name: "Grilled Pepper Steak", description: "Flank steak marinated in house made pepper sauce.", price: "26.00", category: "Dinner", subcategory: "Steak", image: " " },
        { id: 15, name: "Steak & Shrimp", description: "6 oz. New York strip served with grilled tiger shrimp.", price: "22.00", category: "Dinner", subcategory: "Steak", image: "asset/images/dinner/steakshrimp.png" },
        { id: 15, name: "New York Steak", description: "10 oz. New York strip cooked the way you like it.", price: "26.00", category: "Dinner", subcategory: "Steak", image: " " },
        { id: 15, name: "Teriyaki Steak", description: "10 oz. New York strip in our signature teriyaki marinade.", price: "26.00", category: "Dinner", subcategory: "Steak", image: " " },
        { id: 15, name: "Rib Eye Steak", description: "10 oz. Beef Steak lightly seasoned and grilled to order.", price: "30.00", category: "Dinner", subcategory: "Steak", image: " " },
        { id: 15, name: "T-Bone Steak", description: "12 oz. Prime cut it T-Bone marinated and cooked the way you like it.", price: "30.00", category: "Dinner", subcategory: "Steak", image: " " },
        { id: 15, name: "BBQ Short Ribs", description: "Choice cuts grilled with a light BBQ sauce marinade.", price: "19.00", category: "Dinner", subcategory: "Steak", image: "" },

        // Chicken
        { id: 15, name: "Chicken Cutlet", description: "Chicken breast cutlet breaded then deep-fried.", price: "8.75", category: "Dinner", subcategory: "Chicken", image: "" },
        { id: 15, name: "Grilled Chicken Breast", description: "Seasoned chicken breast grilled to perfection.", price: "8.75", category: "Dinner", subcategory: "Chicken", image: "" },
        { id: 15, name: "Stir Fry Bihon Noodles", description: "Rice sticks noodles, meat and variety of sauteed vegetables.", price: "6.50", category: "Dinner", subcategory: "Chicken", image: "asset/images/dinner/bihon.png" },
        { id: 15, name: "Stir Fry Canton Noodles", description: "Flour noodle, meat and variety of sauteed vegetables.", price: "7.50", category: "Dinner", subcategory: "Chicken", image: "asset/images/dinner/canton.png" },

        // Fish
        { id: 15, name: "Grilled Fish", description: "Fresh Tuna Grilled with a Parsley lemon Marinade.", price: "8.25", category: "Dinner", subcategory: "Fish", image: "asset/images/dinner/grilledfish.png" },
        { id: 15, name: "Grilled Pepper Tuna", description: "Our fresh catch-of-the-day finely seasoned & grilled.", price: "8.25", category: "Dinner", subcategory: "Fish", image: "asset/images/dinner/grilledpeppertuna.png" },
        { id: 15, name: "Stuffed Tuna", description: "Fillet tuna stuffed with crab meat and cheese.", price: "14.50", category: "Dinner", subcategory: "Fish", image: "" },
        { id: 15, name: "Fish Katsu", description: "Fillet tuna stuffed with crab meat and cheese.", price: "14.50", category: "Dinner", subcategory: "Fish", image: "" },

        // Soup
        { id: 16, name: "Pork Ribs & Vegetables", description: "", price: "7.50", category: "Dinner", subcategory: "Soup", image: "asset/images/dinner/porkribssoup.png" },
        { id: 16, name: "Beef Meat & Vegetables", description: "", price: "8.50", category: "Dinner", subcategory: "Soup", image: "asset/images/dinner/beefmeatsoup.png" },
        { id: 16, name: "Fish Sinigang", description: "", price: "7.00", category: "Dinner", subcategory: "Soup", image: "" },
        { id: 16, name: "Pork Sinigang", description: "", price: "8.00", category: "Dinner", subcategory: "Soup", image: "hasset/images/dinner/porksinigang.png" },

        // Sides
        { id: 16, name: "French Fries", description: "", price: "5.00", category: "Dinner", subcategory: "Sides", image: "asset/images/dinner/fries.png" },
        { id: 16, name: "Potato Wedges", description: "", price: "3.25", category: "Dinner", subcategory: "Sides", image: "asset/images/dinner/potatowedges.png" },
        { id: 16, name: "Baked Potato", description: "", price: "3.25", category: "Dinner", subcategory: "Sides", image: " " },
        { id: 16, name: "Corn on the Cob", description: "", price: "5.00", category: "Dinner", subcategory: "Sides", image: " " },


        // Desserts
        { id: 16, name: "Mud Pie", description: "", price: "8.75", category: "Desserts", subcategory: "Ice Cream", image: " " },
        { id: 16, name: "Strawberry & Cream", description: "", price: "8.75", category: "Desserts", subcategory: "Ice Cream", image: " " },
        { id: 16, name: "Banana Split", description: "", price: "6.25", category: "Desserts", subcategory: "Ice Cream", image: " " },
        { id: 16, name: "1 Scoop Ice Cream", description: "", price: "3.25", category: "Desserts", subcategory: "Ice Cream", image: " " },
        { id: 16, name: "Banana Foster Ice Cream", description: "", price: "6.00", category: "Desserts", subcategory: "Ice Cream", image: " " },
        { id: 16, name: "Ice Cream Crepe", description: "", price: "6.50", category: "Desserts", subcategory: "Ice Cream", image: " " },


        // Drinks
        { id: 17, name: "Bottled Water", description: "", price: "2.00", category: "Drinks", subcategory: "Cold", image: " " },
        { id: 17, name: "Iced Coffee", description: "", price: "3.00", category: "Drinks", subcategory: "Cold", image: " " },
        { id: 17, name: "Hot Coffee", description: "", price: "3.00", category: "Drinks", subcategory: "Hot", image: " " },
        { id: 17, name: "Iced Tea", description: "", price: "2.50", category: "Drinks", subcategory: "Cold", image: " " },
        { id: 17, name: "Hot Tea", description: "", price: "2.25", category: "Drinks", subcategory: "Hot", image: " " },
        { id: 17, name: "Green Tea", description: "", price: "2.25", category: "Drinks", subcategory: "Hot", image: " " },
        { id: 17, name: "Juice", description: "", price: "3.00", category: "Drinks", subcategory: "Juices", image: " " },
        { id: 17, name: "Soda", description: "", price: "2.25", category: "Drinks", subcategory: "Cold", image: " " },
        { id: 17, name: "Wine Glass", description: "", price: "6.50", category: "Drinks", subcategory: "Cold", image: " " },
        { id: 17, name: "Bud Light/Budwerser", description: "", price: "4.50", category: "Drinks", subcategory: "Cold", image: " " },
    ];
    
    // --- DOM Element Selections ---
    const mainHeader = document.getElementById('main-header'); 
    const headerBrandNameSpan = mainHeader?.querySelector('.brand-name-span-initial');
    const headerBrandNameText = mainHeader?.querySelector('.brand-name-text-initial');
    const headerNavLinks = mainHeader?.querySelectorAll('#main-categories-nav a');
    const headerMobileMenuButtonElem = mainHeader?.querySelector('#mobile-menu-button'); // Renamed to avoid conflict

    const mainCategoriesNav = document.getElementById('main-categories-nav');
    const mobileMainCategoriesNav = document.getElementById('mobile-main-categories-nav');
    const mobileMenuButton = document.getElementById('mobile-menu-button'); // This is the label
    const hamburgerInput = document.getElementById('hamburger-input'); 
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    
    const currentCategoryTitle = document.getElementById('current-category-title');
    const subCategoriesSection = document.getElementById('sub-categories-section');
    const subCategoriesButtonsContainer = document.getElementById('sub-categories-buttons');
    const subCategoriesDropdown = document.getElementById('sub-categories-dropdown');
    
    const menuItemsGrid = document.getElementById('menu-items-grid');
    const noResultsDiv = document.getElementById('no-results');
    
    const searchBar = document.getElementById('search-bar');
    const searchIconContainer = document.getElementById('search-icon-container');
    const searchIcon = document.getElementById('search-icon');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    const goToTopButton = document.getElementById('go-to-top');
    const footerYear = document.getElementById('footer-year');

    // Item Detail Modal DOM Elements
    const itemModal = document.getElementById('item-modal');
    const modalContentBox = document.getElementById('modal-content-box');
    const modalItemName = document.getElementById('modal-item-name');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalItemImage = document.getElementById('modal-item-image');
    const modalItemDescription = document.getElementById('modal-item-description');
    const modalItemCategoryTag = document.getElementById('modal-item-category-tag');
    const modalItemSubcategoryTag = document.getElementById('modal-item-subcategory-tag');
    const modalItemPrice = document.getElementById('modal-item-price');

    // Promotional Modal DOM Elements
    const promoModal = document.getElementById('promo-modal');
    const promoModalContentBox = document.getElementById('promo-modal-content-box');
    const promoModalCloseButton = document.getElementById('promo-modal-close-button');
    const promoModalImage = document.getElementById('promo-modal-image');

    // "You May Like" (YML) DOM Elements
    const youMayLikeSection = document.getElementById('you-may-like-section');
    const youMayLikeGrid = document.getElementById('you-may-like-grid');
    const noSuggestionsP = document.getElementById('no-suggestions');
    const ymlArrowLeft = document.getElementById('yml-arrow-left');
    const ymlArrowRight = document.getElementById('yml-arrow-right');

    // --- State Variables ---
    let currentMainCategory = "Breakfast";
    let currentSubCategory = null; 
    let searchTerm = "";
    let searchTimeout;
    let promoModalTimeoutId = null;

    // --- Constants ---
    const mainCategories = [...new Set(menuData.map(item => item.category))];
    const NUM_YOU_MAY_LIKE_ITEMS = 4;
    const MOBILE_MENU_ANIMATION_DURATION = 300;
    const PROMO_MODAL_AUTOCLOSE_DURATION = 8000; 
    const PROMO_MODAL_IMAGE_SRC = 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%D%3D%3D&auto=format&fit=crop&w=774&q=80'; 
    const PROMO_MODAL_ALT_TEXT = "Special Gourmet Offer";


    // --- Utility Functions ---
    function updateFooterYear() {
        if (footerYear) {
            footerYear.textContent = new Date().getFullYear();
        }
    }

    // --- Modal Functions (Item Detail) ---
    function openItemModal(item) {
        if (!itemModal || !modalContentBox) return;
        if(modalItemName) modalItemName.textContent = item.name;
        if(modalItemImage) {
            modalItemImage.src = item.image || 'https://via.placeholder.com/600x400.png?text=No+Image';
            modalItemImage.alt = item.name;
        }
        if(modalItemDescription) modalItemDescription.textContent = item.description; // Description is set here for the modal
        if(modalItemCategoryTag) modalItemCategoryTag.textContent = item.category;
        if(modalItemSubcategoryTag) modalItemSubcategoryTag.textContent = item.subcategory;
        if(modalItemPrice) modalItemPrice.textContent = `$${item.price}`;

        itemModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden-body');
        void itemModal.offsetWidth; 
        itemModal.classList.remove('opacity-0');
        modalContentBox.classList.remove('scale-95');
    }

    function closeItemModal() {
        if (!itemModal || !modalContentBox) return;
        itemModal.classList.add('opacity-0');
        modalContentBox.classList.add('scale-95');
        
        setTimeout(() => { 
            itemModal.classList.add('hidden');
            if (promoModal?.classList.contains('hidden') && mobileMenu?.classList.contains('-translate-x-full')) { 
                document.body.classList.remove('overflow-hidden-body');
            }
        }, 300); 
    }

    // --- Promotional Modal Functions ---
    function openPromoModal() {
        if (!promoModal || !promoModalContentBox || !promoModalImage) return;
        promoModalImage.src = PROMO_MODAL_IMAGE_SRC;
        promoModalImage.alt = PROMO_MODAL_ALT_TEXT;
        promoModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden-body');
        void promoModal.offsetWidth;
        promoModal.classList.remove('opacity-0');
        promoModalContentBox.classList.remove('scale-95');
        
        sessionStorage.setItem('promoModalShownThisSession', 'true');
        clearTimeout(promoModalTimeoutId);
        promoModalTimeoutId = setTimeout(closePromoModal, PROMO_MODAL_AUTOCLOSE_DURATION);
    }

    function closePromoModal() {
        if (!promoModal || !promoModalContentBox) return;
        clearTimeout(promoModalTimeoutId);
        promoModal.classList.add('opacity-0');
        promoModalContentBox.classList.add('scale-95');
        setTimeout(() => {
            promoModal.classList.add('hidden');
            if (itemModal?.classList.contains('hidden') && mobileMenu?.classList.contains('-translate-x-full')) { 
                document.body.classList.remove('overflow-hidden-body');
            }
        }, 300); 
    }

    // --- Navigation and Menu Functions ---
    function setActiveMainCategoryLink(navElement, categoryName) {
        if (!navElement) return;
        const links = navElement.querySelectorAll('a');
        links.forEach(link => {
            link.classList.remove('text-orange-600', 'font-semibold', 'bg-orange-100', 'md:font-bold');
            link.classList.add('text-gray-700', 'hover:text-orange-500'); 
            if (navElement === mobileMainCategoriesNav) {
                link.classList.add('hover:bg-orange-50', 'py-3', 'px-4', 'block', 'rounded-md', 'transition-colors', 'duration-150');
            }
            if (link.textContent === categoryName) {
                link.classList.add('text-orange-600', 'font-semibold', 'md:font-bold');
                link.classList.remove('text-gray-700', 'hover:text-orange-500'); 
                if (navElement === mobileMainCategoriesNav) {
                    link.classList.add('bg-orange-100');
                }
            }
        });
    }
    
    function createCategoryLink(category, isMobile) {
        const link = document.createElement('a');
        link.href = "#sub-categories-section";
        link.textContent = category;
        if (!isMobile) {
            link.className = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
        }
        link.addEventListener('click', (e) => {
            // e.preventDefault(); // Allow native scroll
            currentMainCategory = category;
            const subcategoriesForMain = [...new Set(menuData
                .filter(item => item.category === currentMainCategory)
                .map(item => item.subcategory)
            )];
            currentSubCategory = subcategoriesForMain.length > 0 ? subcategoriesForMain[0] : null;
            searchTerm = "";
            if (searchBar) searchBar.value = "";
            updateCurrentCategoryTitle();
            populateSubCategories(); 
            filterAndRenderItems();
            setActiveMainCategoryLink(mainCategoriesNav, category);
            setActiveMainCategoryLink(mobileMainCategoriesNav, category);
            
            if (isMobile) {
                closeMobileMenu();
                setTimeout(() => {
                    const targetElement = document.getElementById('sub-categories-section');
                    targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, MOBILE_MENU_ANIMATION_DURATION + 50);
            }
        });
        return link;
    }

    function populateMainCategories() {
        if (mainCategoriesNav) mainCategoriesNav.innerHTML = '';
        if (mobileMainCategoriesNav) mobileMainCategoriesNav.innerHTML = '';

        mainCategories.forEach(category => {
            if (mainCategoriesNav) {
                const desktopLi = document.createElement('li');
                desktopLi.appendChild(createCategoryLink(category, false));
                mainCategoriesNav.appendChild(desktopLi);
            }
            if (mobileMainCategoriesNav) {
                const mobileLi = document.createElement('li');
                mobileLi.appendChild(createCategoryLink(category, true));
                mobileMainCategoriesNav.appendChild(mobileLi);
            }
        });
        setActiveMainCategoryLink(mainCategoriesNav, currentMainCategory);
        setActiveMainCategoryLink(mobileMainCategoriesNav, currentMainCategory);
     }

    function openMobileMenu() {
        if(!mobileMenu || !mobileMenuOverlay) return;
        mobileMenu.classList.remove('-translate-x-full'); 
        mobileMenu.classList.add('translate-x-0');    
        mobileMenuOverlay.classList.remove('hidden');
        void mobileMenuOverlay.offsetWidth;
        mobileMenuOverlay.classList.remove('opacity-0');
        if (hamburgerInput && !hamburgerInput.checked) hamburgerInput.checked = true;
        document.body.classList.add('overflow-hidden-body'); 
    }

    function closeMobileMenu() {
        if(!mobileMenu || !mobileMenuOverlay) return;
        mobileMenu.classList.add('-translate-x-full'); 
        mobileMenu.classList.remove('translate-x-0'); 
        mobileMenuOverlay.classList.add('opacity-0');
        setTimeout(() => mobileMenuOverlay.classList.add('hidden'), MOBILE_MENU_ANIMATION_DURATION); 
        if (hamburgerInput && hamburgerInput.checked) hamburgerInput.checked = false;
        
        if (itemModal?.classList.contains('hidden') && promoModal?.classList.contains('hidden')) { 
            document.body.classList.remove('overflow-hidden-body');
        }
     }

    function updateCurrentCategoryTitle() {
        if(currentCategoryTitle) currentCategoryTitle.textContent = currentMainCategory;
     }

    function populateSubCategories() {
        const subcategories = [...new Set(menuData
            .filter(item => item.category === currentMainCategory)
            .map(item => item.subcategory)
        )];

        if (subcategories.length === 0) {
            if (subCategoriesSection) subCategoriesSection.classList.add('hidden');
            currentSubCategory = null; 
            return;
        } 
        
        if (subCategoriesSection) subCategoriesSection.classList.remove('hidden');
        if (!currentSubCategory || !subcategories.includes(currentSubCategory)) {
            currentSubCategory = subcategories[0];
        }
        
        const baseButtonClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400";
        const activeButtonClasses = `${baseButtonClasses} bg-orange-500 text-white shadow-md hover:bg-orange-600`;
        const inactiveButtonClasses = `${baseButtonClasses} bg-white text-gray-700 hover:bg-gray-200 border border-gray-300`;

        if(subCategoriesButtonsContainer) {
            subCategoriesButtonsContainer.innerHTML = ""; 
            subcategories.forEach(sub => {
                const button = document.createElement('button');
                button.textContent = sub;
                button.className = (currentSubCategory === sub) ? activeButtonClasses : inactiveButtonClasses;
                
                button.addEventListener('click', () => {
                    currentSubCategory = sub;
                    filterAndRenderItems();
                    subCategoriesButtonsContainer.querySelectorAll('button').forEach(btn => {
                        btn.className = (btn.textContent === currentSubCategory) ? activeButtonClasses : inactiveButtonClasses;
                    });
                    if(subCategoriesDropdown) subCategoriesDropdown.value = sub;
                });
                subCategoriesButtonsContainer.appendChild(button);
            });
        }

        if(subCategoriesDropdown) {
            subCategoriesDropdown.innerHTML = ""; 
            subcategories.forEach(sub => {
                const option = document.createElement('option');
                option.value = sub;
                option.textContent = sub;
                if (currentSubCategory === sub) {
                    option.selected = true;
                }
                subCategoriesDropdown.appendChild(option);
            });
        }
    }
    
    function renderMenuItems(itemsToRender) {
        if(!menuItemsGrid) return;
        menuItemsGrid.innerHTML = ""; // Clear previous items

        if (itemsToRender.length === 0) {
            if(noResultsDiv) noResultsDiv.classList.remove('hidden');
            menuItemsGrid.classList.add('hidden');
            updateYouMayLikeSection([]); 
            return;
        }

        if(noResultsDiv) noResultsDiv.classList.add('hidden');
        menuItemsGrid.classList.remove('hidden');

        const fragment = document.createDocumentFragment();
        itemsToRender.forEach(item => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300 ease-in-out group hover:scale-[1.03]";
            
            card.innerHTML = `
                <div class="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img src="${item.image || 'https://via.placeholder.com/600x400.png?text=No+Image'}" alt="${item.name}" class="w-full h-full object-cover" loading="lazy">
                </div>
                <div class="p-4 sm:p-5 flex flex-col flex-grow">
                    <h3 class="card-title text-lg md:text-xl font-semibold mb-2 flex-grow">${item.name}</h3> 
                   
                    <div class="flex justify-between items-center mt-auto pt-3 md:pt-4"> 
                        <p class="card-price text-base md:text-lg font-bold text-orange-600">$${item.price}</p>
                        <button class="cta item-details-button text-sm">
                            <span class="hover-underline-animation">Details</span>
                            <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal-${item.id}" class="fill-current text-gray-700 group-hover:text-orange-600 transition-colors">
                                <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            const ctaButton = card.querySelector('.item-details-button');
            ctaButton?.addEventListener('click', (e) => {
                e.preventDefault();
                openItemModal(item);
            });
            fragment.appendChild(card);
        });
        menuItemsGrid.appendChild(fragment);
    }

    // --- "You May Also Like" (YML) Section Functions ---
    function checkYmlArrowVisibility() {
        if (!youMayLikeGrid || !ymlArrowLeft || !ymlArrowRight) return;
        const scrollLeft = Math.round(youMayLikeGrid.scrollLeft);
        const scrollWidth = youMayLikeGrid.scrollWidth;
        const clientWidth = youMayLikeGrid.clientWidth;
        
        ymlArrowLeft.disabled = scrollLeft <= 0;
        ymlArrowRight.disabled = scrollLeft >= scrollWidth - clientWidth -1; 

        if (scrollWidth <= clientWidth) {
            ymlArrowLeft.classList.add('opacity-0', 'pointer-events-none');
            ymlArrowRight.classList.add('opacity-0', 'pointer-events-none');
        } else {
            ymlArrowLeft.classList.remove('pointer-events-none');
            ymlArrowRight.classList.remove('pointer-events-none');
        }
    }

    function renderYouMayLikeItems(items) {
        if(!youMayLikeGrid || !noSuggestionsP || !youMayLikeSection) return;
        youMayLikeGrid.innerHTML = ""; 
        if (!items || items.length === 0) {
            youMayLikeGrid.classList.add('hidden');
            noSuggestionsP.classList.remove('hidden');
            return;
        }
        youMayLikeGrid.classList.remove('hidden');
        noSuggestionsP.classList.add('hidden');

        const fragment = document.createDocumentFragment();
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = "yml-card w-[220px] sm:w-[240px] md:w-[260px] group"; 
            card.innerHTML = `
                <div class="yml-card-image-wrapper">
                    <img src="${item.image || 'https://via.placeholder.com/300x200.png?text=No+Image'}" alt="${item.name}" loading="lazy" class="transition-transform duration-300 group-hover:scale-105">
                </div>
                <div class="yml-card-content">
                    <h3 class="yml-card-title">${item.name}</h3>
                    <p class="yml-card-subcategory">${item.subcategory}</p>
                    <div class="yml-card-footer">
                        <p class="yml-card-price">$${item.price}</p>
                        <button class="yml-card-button yml-view-button">View <i class="fas fa-arrow-right text-xs ml-1 opacity-75 group-hover:translate-x-0.5 transition-transform"></i></button>
                    </div>
                </div>
            `;
            const viewButton = card.querySelector('.yml-view-button');
            viewButton?.addEventListener('click', (e) => {
                e.preventDefault();
                openItemModal(item);
            });
            fragment.appendChild(card);
        });
        youMayLikeGrid.appendChild(fragment);
        setTimeout(checkYmlArrowVisibility, 50);
    }

    function updateYouMayLikeSection(excludeItems = []) {
        const excludeItemIds = new Set(excludeItems.map(i => i.id));
        let potentialSuggestions = [];
        if (currentSubCategory) {
            potentialSuggestions.push(...menuData.filter(item =>
                item.category === currentMainCategory &&
                item.subcategory === currentSubCategory &&
                !excludeItemIds.has(item.id)
            ));
        }
        if (potentialSuggestions.length < NUM_YOU_MAY_LIKE_ITEMS) {
            const mainCategoryItems = menuData.filter(item =>
                item.category === currentMainCategory &&
                !excludeItemIds.has(item.id) && 
                !potentialSuggestions.some(ps => ps.id === item.id)
            );
            potentialSuggestions.push(...mainCategoryItems);
        }
        if (potentialSuggestions.length < NUM_YOU_MAY_LIKE_ITEMS) {
            const anyOtherItems = menuData.filter(item => 
                !excludeItemIds.has(item.id) &&
                !potentialSuggestions.some(ps => ps.id === item.id)
            );
            potentialSuggestions.push(...anyOtherItems);
        }

        const uniqueSuggestions = Array.from(new Map(potentialSuggestions.map(item => [item.id, item])).values());
        const shuffled = uniqueSuggestions.sort(() => 0.5 - Math.random());
        renderYouMayLikeItems(shuffled.slice(0, NUM_YOU_MAY_LIKE_ITEMS));
    }
    
    // --- Filtering and Rendering Logic ---
    function filterAndRenderItems() {
        const subcategoriesForMain = [...new Set(menuData
            .filter(item => item.category === currentMainCategory)
            .map(item => item.subcategory)
        )];
        if (!currentSubCategory && subcategoriesForMain.length > 0) {
            currentSubCategory = subcategoriesForMain[0];
            if (subCategoriesDropdown) subCategoriesDropdown.value = currentSubCategory;
            if (subCategoriesButtonsContainer) {
                const base = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400";
                const active = `${base} bg-orange-500 text-white shadow-md hover:bg-orange-600`;
                const inactive = `${base} bg-white text-gray-700 hover:bg-gray-200 border border-gray-300`;
                subCategoriesButtonsContainer.querySelectorAll('button').forEach(btn => {
                    btn.className = (btn.textContent === currentSubCategory) ? active : inactive;
                });
            }
        }

        let filteredItems = menuData.filter(item => item.category === currentMainCategory);
        if (currentSubCategory) {
            filteredItems = filteredItems.filter(item => item.subcategory === currentSubCategory);
        }

        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase().trim();
            if (lowerSearchTerm) { 
                filteredItems = filteredItems.filter(item =>
                    item.name.toLowerCase().includes(lowerSearchTerm) ||
                    // item.description.toLowerCase().includes(lowerSearchTerm) || // Description search not needed if not displayed on card
                    item.subcategory.toLowerCase().includes(lowerSearchTerm) 
                );
            }
        }
        renderMenuItems(filteredItems);
        updateYouMayLikeSection(filteredItems); 
    }

    // --- Event Listeners Setup ---
    // Header Scroll Effect
    if (mainHeader) {
        const scrollThreshold = 20; 

        const handleHeaderScroll = () => {
            const isScrolled = window.scrollY > scrollThreshold;
            mainHeader.classList.toggle('bg-white', isScrolled);
            mainHeader.classList.toggle('shadow-md', isScrolled);

            // Simplified color logic: assume initial colors are set in CSS for transparent state
            // And different (or same) colors are set for .bg-white state via CSS if needed
            // For JS control:
            const brandSpanColor = isScrolled ? 'text-orange-600' : 'text-orange-600'; // Or different if needed
            const brandTextColor = isScrolled ? 'text-gray-700' : 'text-gray-700';
            const navLinkColor = isScrolled ? 'text-gray-600' : 'text-gray-700'; // Darker for transparent
            const mobileIconColor = isScrolled ? 'text-gray-700' : 'text-gray-700'; // Darker for transparent

            headerBrandNameSpan?.classList.remove('text-orange-600', 'text-gray-100'); // Clear previous
            headerBrandNameSpan?.classList.add(brandSpanColor);

            headerBrandNameText?.classList.remove('text-gray-700', 'text-gray-300');
            headerBrandNameText?.classList.add(brandTextColor);

            headerNavLinks?.forEach(link => {
                link.classList.remove('text-gray-200', 'hover:text-white', 'text-gray-600', 'text-gray-700', 'hover:text-orange-500');
                link.classList.add(navLinkColor, 'hover:text-orange-500');
                 // Re-apply active class styling if it got removed
                if (link.textContent === currentMainCategory && !link.classList.contains('text-orange-600')) {
                    link.classList.add('text-orange-600', 'font-semibold', 'md:font-bold');
                    link.classList.remove(navLinkColor, 'hover:text-orange-500');
                }
            });
            
            headerMobileMenuButtonElem?.classList.remove('text-gray-200', 'text-gray-700');
            headerMobileMenuButtonElem?.classList.add(mobileIconColor);
        };
        
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        handleHeaderScroll(); 
    }

    modalCloseButton?.addEventListener('click', closeItemModal);
    itemModal?.addEventListener('click', (e) => { if (e.target === itemModal) closeItemModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && itemModal && !itemModal.classList.contains('hidden')) closeItemModal(); });

    promoModalCloseButton?.addEventListener('click', closePromoModal);
    promoModal?.addEventListener('click', (e) => { if (e.target === promoModal) closePromoModal(); });

    hamburgerInput?.addEventListener('change', () => {
        if (hamburgerInput.checked) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });
    mobileMenuOverlay?.addEventListener('click', closeMobileMenu);

    subCategoriesDropdown?.addEventListener('change', (e) => {
        currentSubCategory = e.target.value;
        filterAndRenderItems();
        if(subCategoriesButtonsContainer) {
            const base = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400";
            const active = `${base} bg-orange-500 text-white shadow-md hover:bg-orange-600`;
            const inactive = `${base} bg-white text-gray-700 hover:bg-gray-200 border border-gray-300`;
            subCategoriesButtonsContainer.querySelectorAll('button').forEach(btn => {
                 btn.className = (btn.textContent === e.target.value) ? active : inactive;
            });
        }
    });

    if(searchBar) {
        searchBar.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTerm = searchBar.value;
            const currentSearchVal = searchBar.value;

            if(searchIcon && loadingSpinner){
                searchIcon.classList.toggle('hidden', currentSearchVal.length > 0);
                loadingSpinner.classList.toggle('hidden', currentSearchVal.length === 0);
            }

            if (currentSearchVal.length === 0) {
                filterAndRenderItems(); 
                return;
            }
            
            searchTimeout = setTimeout(() => {
                if (searchBar.value === currentSearchVal) {
                    filterAndRenderItems();
                }
                if(searchIcon && loadingSpinner){
                     searchIcon.classList.toggle('hidden', searchBar.value.length > 0);
                     loadingSpinner.classList.toggle('hidden', searchBar.value.length === 0);
                }
            }, 300);
         });
        searchBar.addEventListener('search', () => { 
            if(searchBar.value === "") {
                searchTerm = "";
                if(searchIcon) searchIcon.classList.remove('hidden');
                if(loadingSpinner) loadingSpinner.classList.add('hidden');
                filterAndRenderItems();
            }
        });
    }
    searchIconContainer?.addEventListener('click', () => searchBar?.focus() );

    if(goToTopButton) {
        window.addEventListener('scroll', () => {
            const shouldBeVisible = window.pageYOffset > 300;
            goToTopButton.style.opacity = shouldBeVisible ? '1' : '0';
            goToTopButton.style.visibility = shouldBeVisible ? 'visible' : 'hidden';
            goToTopButton.style.pointerEvents = shouldBeVisible ? 'auto' : 'none';
        }, { passive: true });
        goToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    

    if (youMayLikeGrid) {
        youMayLikeGrid.addEventListener('scroll', checkYmlArrowVisibility, { passive: true });
        window.addEventListener('resize', checkYmlArrowVisibility);

        const scrollYml = (direction) => {
            const card = youMayLikeGrid.querySelector('.yml-card');
            if (!card) return;
            const scrollAmount = card.offsetWidth * 2 + (parseFloat(getComputedStyle(card).marginRight) || 0) * 2;
            youMayLikeGrid.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        };
        ymlArrowLeft?.addEventListener('click', () => scrollYml(-1));
        ymlArrowRight?.addEventListener('click', () => scrollYml(1));

        let isDown = false, startX, scrollLeftStart;
        const startDrag = (e) => { isDown = true; youMayLikeGrid.classList.add('grabbing'); startX = (e.pageX || e.touches[0].pageX) - youMayLikeGrid.offsetLeft; scrollLeftStart = youMayLikeGrid.scrollLeft; youMayLikeGrid.style.scrollBehavior = 'auto'; youMayLikeGrid.style.cursor = 'grabbing'; };
        const stopDrag = () => { if (!isDown) return; isDown = false; youMayLikeGrid.classList.remove('grabbing'); youMayLikeGrid.style.scrollBehavior = 'smooth'; youMayLikeGrid.style.cursor = 'grab'; checkYmlArrowVisibility(); };
        const doDrag = (e) => { if (!isDown) return; e.preventDefault(); const x = (e.pageX || e.touches[0].pageX) - youMayLikeGrid.offsetLeft; const walk = (x - startX) * 1.2; youMayLikeGrid.scrollLeft = scrollLeftStart - walk; };
        
        youMayLikeGrid.addEventListener('mousedown', startDrag);
        youMayLikeGrid.addEventListener('mouseleave', stopDrag);
        youMayLikeGrid.addEventListener('mouseup', stopDrag);
        youMayLikeGrid.addEventListener('mousemove', doDrag);
        
        youMayLikeGrid.addEventListener('touchstart', startDrag, { passive: true }); 
        youMayLikeGrid.addEventListener('touchend', stopDrag);
        youMayLikeGrid.addEventListener('touchcancel', stopDrag);
        youMayLikeGrid.addEventListener('touchmove', doDrag, { passive: false }); 
    }

    // --- Initial Page Setup ---
    updateFooterYear();
    populateMainCategories(); 
    updateCurrentCategoryTitle(); 
    
    const initialSubcategories = [...new Set(menuData.filter(item => item.category === currentMainCategory).map(item => item.subcategory))];
    currentSubCategory = initialSubcategories.length > 0 ? initialSubcategories[0] : null;
    
    populateSubCategories();
    filterAndRenderItems(); 
    
    setTimeout(checkYmlArrowVisibility, 100);

    if (sessionStorage.getItem('promoModalShownThisSession') !== 'true') {
        setTimeout(openPromoModal, 2000); 
    }
});
