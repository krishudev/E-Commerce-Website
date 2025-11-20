// BrewHaven Roasters - Indian Café Menu
const products = [
    // Classic Hot Coffees & Espresso
    {
        id: 1,
        name: 'Caffè Americano',
        category: 'coffee',
        price: 179,
        description: 'Rich espresso diluted with hot water. Strong, smooth, and aromatic - perfect for espresso lovers who want a longer drink.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'
    },
    {
        id: 2,
        name: 'Cappuccino',
        category: 'coffee',
        price: 199,
        description: 'Classic Italian coffee with equal parts espresso, steamed milk, and velvety foam. Perfectly balanced and creamy.',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80'
    },
    {
        id: 3,
        name: 'Café Latte',
        category: 'coffee',
        price: 219,
        description: 'Smooth espresso with steamed milk and a light layer of foam. Mild, creamy, and comforting - a café favorite!',
        image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=800&q=80'
    },
    {
        id: 4,
        name: 'Hazelnut Latte',
        category: 'coffee',
        price: 249,
        description: 'Café latte infused with aromatic hazelnut syrup. Sweet, nutty, and incredibly indulgent.',
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80'
    },
    {
        id: 5,
        name: 'Caramel Macchiato',
        category: 'coffee',
        price: 269,
        description: 'Espresso "marked" with vanilla syrup, steamed milk, and caramel drizzle. Sweet, creamy perfection!',
        image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&q=80'
    },
    {
        id: 6,
        name: 'Café Mocha',
        category: 'coffee',
        price: 279,
        description: 'Rich espresso with chocolate syrup, steamed milk, and whipped cream. A chocolate lover\'s dream coffee!',
        image: 'https://images.unsplash.com/photo-1607260550778-aa9d29444ce1?w=800&q=80'
    },
    {
        id: 7,
        name: 'Hot Chocolate',
        category: 'coffee',
        price: 239,
        description: 'Thick, creamy hot chocolate made with premium cocoa and steamed milk. Topped with whipped cream and chocolate shavings.',
        image: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=800&q=80'
    },

    // Traditional South Indian Filter Kaapi
    {
        id: 8,
        name: 'Classic Filter Coffee (Strong)',
        category: 'kaapi',
        price: 129,
        description: 'Rich South Indian filter coffee brewed the traditional way. Strong decoction mixed with frothy milk and sugar - pure nostalgia!',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80'
    },
    {
        id: 9,
        name: 'Meter Coffee (Tall glass)',
        category: 'kaapi',
        price: 149,
        description: 'Filter coffee poured from a height to create that perfect froth! Served in a tall glass, just like the roadside stalls.',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80'
    },
    {
        id: 10,
        name: 'Filter Coffee with Chicory',
        category: 'kaapi',
        price: 139,
        description: 'Traditional filter kaapi with roasted chicory for extra body and that authentic South Indian taste.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80'
    },
    {
        id: 11,
        name: 'Madras Degree Kaapi',
        category: 'kaapi',
        price: 159,
        description: 'Authentic Bangalore/Madras style filter coffee served at the perfect 70-degree angle. Frothy, strong, and aromatic!',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80'
    },

    // Cold Coffees & Frappes
    {
        id: 12,
        name: 'Cold Brew Black',
        category: 'cold',
        price: 229,
        description: 'Smooth, bold cold brew steeped for 12 hours. No bitterness, just pure coffee flavor - perfect for black coffee lovers!',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80'
    },
    {
        id: 13,
        name: 'Vanilla Cold Brew',
        category: 'cold',
        price: 269,
        description: 'Cold brew infused with sweet vanilla syrup and served over ice. Smooth, sweet, and refreshing!',
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&q=80'
    },
    {
        id: 14,
        name: 'Iced Americano',
        category: 'cold',
        price: 199,
        description: 'Bold espresso poured over ice and water. Simple, strong, and refreshing - the perfect summer pick-me-up!',
        image: 'https://images.unsplash.com/photo-1562580438-1e0c929d4e5d?w=800&q=80'
    },
    {
        id: 15,
        name: 'Iced Latte',
        category: 'cold',
        price: 229,
        description: 'Creamy iced latte with espresso and chilled milk over ice. Smooth, refreshing, and perfectly balanced.',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80'
    },
    {
        id: 16,
        name: 'Kaapi Frappé',
        category: 'cold',
        price: 279,
        description: 'South Indian filter coffee blended with ice, milk, and sugar. A frozen twist on the classic kaapi!',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80'
    },
    {
        id: 17,
        name: 'Chocolate Frappé',
        category: 'cold',
        price: 299,
        description: 'Rich chocolate blended with ice and topped with whipped cream and chocolate sauce. Pure indulgence!',
        image: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?w=800&q=80'
    },
    {
        id: 18,
        name: 'Hazelnut Crunch Frappé',
        category: 'cold',
        price: 319,
        description: 'Coffee frappé with hazelnut syrup, crushed cookies, and whipped cream. Crunchy, creamy, and absolutely delicious!',
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80'
    },

    // Indian Masala & Speciality
    {
        id: 19,
        name: 'Masala Chai',
        category: 'tea',
        price: 149,
        description: 'Aromatic Indian tea with fresh ginger, cardamom, and spices. Boiled with milk and sugar - the ultimate comfort drink!',
        image: 'https://images.unsplash.com/photo-1563822249366-3efbb5d79f85?w=800&q=80'
    },
    {
        id: 20,
        name: 'Cutting Chai (small glass)',
        category: 'tea',
        price: 69,
        description: 'Mumbai\'s famous "cutting chai" - half glass of strong masala chai. Perfect for a quick tea break with friends!',
        image: 'https://images.unsplash.com/photo-1597318167983-aaec5409daa9?w=800&q=80'
    },
    {
        id: 21,
        name: 'Adrak Chai',
        category: 'tea',
        price: 159,
        description: 'Ginger tea with crushed adrak boiled in milk. Spicy, warming, and perfect for cold days or sore throats!',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80'
    },
    {
        id: 22,
        name: 'Elaichi Chai',
        category: 'tea',
        price: 159,
        description: 'Fragrant cardamom tea with crushed elaichi pods. Aromatic, soothing, and subtly sweet.',
        image: 'https://images.unsplash.com/photo-1597318167983-aaec5409daa9?w=800&q=80'
    },
    {
        id: 23,
        name: 'Sulemani Chai (black lemon tea)',
        category: 'tea',
        price: 119,
        description: 'Traditional black tea with lemon, mint, and spices. No milk, light and refreshing - perfect after heavy meals!',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80'
    },
    {
        id: 24,
        name: 'Kashmiri Kahwa',
        category: 'tea',
        price: 229,
        description: 'Exotic Kashmiri green tea with saffron, cinnamon, cardamom, and crushed almonds. Aromatic and luxurious!',
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80'
    },
    {
        id: 25,
        name: 'Green Tea Latte',
        category: 'tea',
        price: 219,
        description: 'Premium Japanese matcha green tea whisked with steamed milk. Earthy, creamy, and packed with antioxidants!',
        image: 'https://images.unsplash.com/photo-1536013188805-0d2d99cd6d1b?w=800&q=80'
    },

    // Refreshers & Coolers
    {
        id: 26,
        name: 'Virgin Mojito',
        category: 'refresher',
        price: 229,
        description: 'Fresh mint leaves muddled with lime, sugar, and soda. Refreshing, tangy, and perfectly fizzy!',
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80'
    },
    {
        id: 27,
        name: 'Blue Lagoon',
        category: 'refresher',
        price: 219,
        description: 'Vibrant blue lemonade with a hint of mint. Instagram-worthy and incredibly refreshing!',
        image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&q=80'
    },
    {
        id: 28,
        name: 'Peach Ice Tea',
        category: 'refresher',
        price: 199,
        description: 'Chilled black tea infused with sweet peach syrup and lemon. Light, fruity, and refreshing!',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80'
    },
    {
        id: 29,
        name: 'Strawberry Cooler',
        category: 'refresher',
        price: 239,
        description: 'Fresh strawberry puree blended with ice and soda. Sweet, tangy, and perfectly cooling!',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80'
    },
    {
        id: 30,
        name: 'Mango Milkshake',
        category: 'refresher',
        price: 249,
        description: 'Thick, creamy milkshake made with real mango pulp. The taste of Indian summers in a glass!',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80'
    },

    // Food & Snacks
    {
        id: 31,
        name: 'Paneer Tikka Sandwich',
        category: 'food',
        price: 229,
        description: 'Grilled sandwich with tandoori paneer, onions, bell peppers, and mint chutney. Spicy, cheesy perfection!',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80'
    },
    {
        id: 32,
        name: 'Cheese Chilli Toast',
        category: 'food',
        price: 199,
        description: 'Crispy toast topped with spicy cheese-chilli mixture and grilled to perfection. A Mumbai café classic!',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80'
    },
    {
        id: 33,
        name: 'Veg Grilled Sandwich',
        category: 'food',
        price: 189,
        description: 'Classic grilled sandwich with cucumber, tomato, onion, potato, and green chutney. Crispy and satisfying!',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80'
    },
    {
        id: 34,
        name: 'Chicken Keema Puff',
        category: 'food',
        price: 149,
        description: 'Flaky puff pastry stuffed with spicy minced chicken keema. Warm, savory, and absolutely addictive!',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80'
    },
    {
        id: 35,
        name: 'Butter Croissant',
        category: 'food',
        price: 139,
        description: 'Freshly baked French croissant with layers of buttery, flaky pastry. Perfect with your morning coffee!',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80'
    },
    {
        id: 36,
        name: 'Chocolate Croissant',
        category: 'food',
        price: 169,
        description: 'Buttery croissant filled with rich Belgian chocolate. Warm, gooey, and irresistible!',
        image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=80'
    },
    {
        id: 37,
        name: 'Classic New York Cheesecake',
        category: 'food',
        price: 299,
        description: 'Creamy, dense cheesecake on a buttery graham cracker crust. Rich, smooth, and absolutely luxurious!',
        image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&q=80'
    },
    {
        id: 38,
        name: 'Red Velvet Pastry',
        category: 'food',
        price: 179,
        description: 'Moist red velvet cake layered with cream cheese frosting. Beautifully red and deliciously decadent!',
        image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80'
    },
    {
        id: 39,
        name: 'Chocolate Fudge Brownie',
        category: 'food',
        price: 199,
        description: 'Dense, fudgy chocolate brownie with chunks of chocolate. Served warm with a scoop of vanilla ice cream!',
        image: 'https://images.unsplash.com/photo-1607257882973-0435e8a78c85?w=800&q=80'
    }
];
