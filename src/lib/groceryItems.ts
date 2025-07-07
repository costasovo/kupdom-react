export interface GroceryItem {
  id: string;
  en: string;
  cs: string;
  category: string;
}

export const groceryItems: GroceryItem[] = [
  // Dairy & Eggs
  { id: 'milk', en: 'Milk', cs: 'Mléko', category: 'dairy' },
  { id: 'cheese', en: 'Cheese', cs: 'Sýr', category: 'dairy' },
  { id: 'yogurt', en: 'Yogurt', cs: 'Jogurt', category: 'dairy' },
  { id: 'butter', en: 'Butter', cs: 'Máslo', category: 'dairy' },
  { id: 'eggs', en: 'Eggs', cs: 'Vejce', category: 'dairy' },
  { id: 'cream', en: 'Cream', cs: 'Smetana', category: 'dairy' },

  // Bread & Bakery
  { id: 'bread', en: 'Bread', cs: 'Chléb', category: 'bakery' },
  { id: 'rolls', en: 'Rolls', cs: 'Rohlíky', category: 'bakery' },
  { id: 'croissant', en: 'Croissant', cs: 'Croissant', category: 'bakery' },
  { id: 'cake', en: 'Cake', cs: 'Dort', category: 'bakery' },

  // Meat & Fish
  { id: 'chicken', en: 'Chicken', cs: 'Kuře', category: 'meat' },
  { id: 'beef', en: 'Beef', cs: 'Hovězí', category: 'meat' },
  { id: 'pork', en: 'Pork', cs: 'Vepřové', category: 'meat' },
  { id: 'burger-meat', en: 'Burger Meat', cs: 'Mleté maso na hamburgery', category: 'meat' },
  { id: 'fish', en: 'Fish', cs: 'Ryba', category: 'meat' },
  { id: 'sausage', en: 'Sausage', cs: 'Klobása', category: 'meat' },
  { id: 'ham', en: 'Ham', cs: 'Šunka', category: 'meat' },

  // Fruits (expanded)
  { id: 'apples', en: 'Apples', cs: 'Jablka', category: 'fruits' },
  { id: 'bananas', en: 'Bananas', cs: 'Banány', category: 'fruits' },
  { id: 'oranges', en: 'Oranges', cs: 'Pomeranče', category: 'fruits' },
  { id: 'strawberries', en: 'Strawberries', cs: 'Jahody', category: 'fruits' },
  { id: 'grapes', en: 'Grapes', cs: 'Hroznové víno', category: 'fruits' },
  { id: 'lemons', en: 'Lemons', cs: 'Citrony', category: 'fruits' },
  { id: 'pears', en: 'Pears', cs: 'Hrušky', category: 'fruits' },
  { id: 'peaches', en: 'Peaches', cs: 'Broskve', category: 'fruits' },
  { id: 'plums', en: 'Plums', cs: 'Švestky', category: 'fruits' },
  { id: 'cherries', en: 'Cherries', cs: 'Třešně', category: 'fruits' },
  { id: 'apricots', en: 'Apricots', cs: 'Meruňky', category: 'fruits' },
  { id: 'kiwi', en: 'Kiwi', cs: 'Kiwi', category: 'fruits' },
  { id: 'pineapple', en: 'Pineapple', cs: 'Ananas', category: 'fruits' },
  { id: 'mango', en: 'Mango', cs: 'Mango', category: 'fruits' },
  { id: 'watermelon', en: 'Watermelon', cs: 'Meloun', category: 'fruits' },
  { id: 'melon', en: 'Melon', cs: 'Meloun cukrový', category: 'fruits' },
  { id: 'blueberries', en: 'Blueberries', cs: 'Borůvky', category: 'fruits' },
  { id: 'raspberries', en: 'Raspberries', cs: 'Maliny', category: 'fruits' },
  { id: 'blackberries', en: 'Blackberries', cs: 'Ostružiny', category: 'fruits' },
  { id: 'currants', en: 'Currants', cs: 'Rybíz', category: 'fruits' },
  { id: 'gooseberries', en: 'Gooseberries', cs: 'Angrešt', category: 'fruits' },
  { id: 'pomegranate', en: 'Pomegranate', cs: 'Granátové jablko', category: 'fruits' },
  { id: 'figs', en: 'Figs', cs: 'Fíky', category: 'fruits' },
  { id: 'dates', en: 'Dates', cs: 'Datle', category: 'fruits' },
  { id: 'coconut', en: 'Coconut', cs: 'Kokos', category: 'fruits' },
  { id: 'lime', en: 'Lime', cs: 'Limetka', category: 'fruits' },
  { id: 'avocado', en: 'Avocado', cs: 'Avokádo', category: 'fruits' },
  { id: 'passion-fruit', en: 'Passion Fruit', cs: 'Mučenka', category: 'fruits' },
  { id: 'persimmon', en: 'Persimmon', cs: 'Tomel', category: 'fruits' },
  { id: 'grapefruit', en: 'Grapefruit', cs: 'Grapefruit', category: 'fruits' },
  { id: 'mandarins', en: 'Mandarins', cs: 'Mandarinky', category: 'fruits' },
  { id: 'nectarines', en: 'Nectarines', cs: 'Nektarinky', category: 'fruits' },
  { id: 'cranberries', en: 'Cranberries', cs: 'Brusinky', category: 'fruits' },
  { id: 'starfruit', en: 'Starfruit', cs: 'Karambola', category: 'fruits' },
  { id: 'papaya', en: 'Papaya', cs: 'Papája', category: 'fruits' },
  { id: 'lychee', en: 'Lychee', cs: 'Liči', category: 'fruits' },
  { id: 'tangerines', en: 'Tangerines', cs: 'Tangerinky', category: 'fruits' },
  { id: 'quince', en: 'Quince', cs: 'Kdoule', category: 'fruits' },
  { id: 'jackfruit', en: 'Jackfruit', cs: 'Jackfruit', category: 'fruits' },
  { id: 'dragonfruit', en: 'Dragonfruit', cs: 'Dračí ovoce', category: 'fruits' },
  { id: 'elderberries', en: 'Elderberries', cs: 'Bezinky', category: 'fruits' },

  // Vegetables (expanded)
  { id: 'tomatoes', en: 'Tomatoes', cs: 'Rajčata', category: 'vegetables' },
  { id: 'onions', en: 'Onions', cs: 'Cibule', category: 'vegetables' },
  { id: 'potatoes', en: 'Potatoes', cs: 'Brambory', category: 'vegetables' },
  { id: 'carrots', en: 'Carrots', cs: 'Mrkev', category: 'vegetables' },
  { id: 'cucumber', en: 'Cucumber', cs: 'Okurka', category: 'vegetables' },
  { id: 'lettuce', en: 'Lettuce', cs: 'Salát', category: 'vegetables' },
  { id: 'bell-pepper', en: 'Bell Pepper', cs: 'Paprika', category: 'vegetables' },
  { id: 'mushrooms', en: 'Mushrooms', cs: 'Houby', category: 'vegetables' },
  { id: 'garlic', en: 'Garlic', cs: 'Česnek', category: 'vegetables' },
  { id: 'broccoli', en: 'Broccoli', cs: 'Brokolice', category: 'vegetables' },
  { id: 'cauliflower', en: 'Cauliflower', cs: 'Květák', category: 'vegetables' },
  { id: 'spinach', en: 'Spinach', cs: 'Špenát', category: 'vegetables' },
  { id: 'zucchini', en: 'Zucchini', cs: 'Cuketa', category: 'vegetables' },
  { id: 'eggplant', en: 'Eggplant', cs: 'Lilek', category: 'vegetables' },
  { id: 'pumpkin', en: 'Pumpkin', cs: 'Dýně', category: 'vegetables' },
  { id: 'sweet-potato', en: 'Sweet Potato', cs: 'Batát', category: 'vegetables' },
  { id: 'leek', en: 'Leek', cs: 'Pórek', category: 'vegetables' },
  { id: 'radish', en: 'Radish', cs: 'Ředkvička', category: 'vegetables' },
  { id: 'celery', en: 'Celery', cs: 'Celer', category: 'vegetables' },
  { id: 'parsley', en: 'Parsley', cs: 'Petržel', category: 'vegetables' },
  { id: 'beetroot', en: 'Beetroot', cs: 'Červená řepa', category: 'vegetables' },
  { id: 'asparagus', en: 'Asparagus', cs: 'Chřest', category: 'vegetables' },
  { id: 'cabbage', en: 'Cabbage', cs: 'Zelí', category: 'vegetables' },
  { id: 'red-cabbage', en: 'Red Cabbage', cs: 'Červené zelí', category: 'vegetables' },
  { id: 'savoy-cabbage', en: 'Savoy Cabbage', cs: 'Kapusta', category: 'vegetables' },
  { id: 'brussels-sprouts', en: 'Brussels Sprouts', cs: 'Růžičková kapusta', category: 'vegetables' },
  { id: 'kale', en: 'Kale', cs: 'Kadeřávek', category: 'vegetables' },
  { id: 'turnip', en: 'Turnip', cs: 'Tuřín', category: 'vegetables' },
  { id: 'swede', en: 'Swede', cs: 'Brukev', category: 'vegetables' },
  { id: 'artichoke', en: 'Artichoke', cs: 'Artyčok', category: 'vegetables' },
  { id: 'fennel', en: 'Fennel', cs: 'Fenykl', category: 'vegetables' },
  { id: 'okra', en: 'Okra', cs: 'Okra', category: 'vegetables' },
  { id: 'peas', en: 'Peas', cs: 'Hrášek', category: 'vegetables' },
  { id: 'green-beans', en: 'Green Beans', cs: 'Zelené fazolky', category: 'vegetables' },
  { id: 'corn-on-cob', en: 'Corn on the Cob', cs: 'Kukuřice na klasu', category: 'vegetables' },
  { id: 'spring-onion', en: 'Spring Onion', cs: 'Jarní cibulka', category: 'vegetables' },
  { id: 'shallots', en: 'Shallots', cs: 'Šalotka', category: 'vegetables' },
  { id: 'chili-pepper', en: 'Chili Pepper', cs: 'Chilli paprička', category: 'vegetables' },
  { id: 'horseradish', en: 'Horseradish', cs: 'Křen', category: 'vegetables' },
  { id: 'dill', en: 'Dill', cs: 'Kopr', category: 'vegetables' },
  { id: 'basil', en: 'Basil', cs: 'Bazalka', category: 'vegetables' },
  { id: 'mint', en: 'Mint', cs: 'Máta', category: 'vegetables' },
  { id: 'rosemary', en: 'Rosemary', cs: 'Rozmarýn', category: 'vegetables' },
  { id: 'thyme', en: 'Thyme', cs: 'Tymián', category: 'vegetables' },
  { id: 'sage', en: 'Sage', cs: 'Šalvěj', category: 'vegetables' },
  { id: 'oregano', en: 'Oregano', cs: 'Oregano', category: 'vegetables' },
  { id: 'coriander', en: 'Coriander', cs: 'Koriandr', category: 'vegetables' },
  { id: 'chives', en: 'Chives', cs: 'Pažitka', category: 'vegetables' },

  // Pantry Staples (expanded)
  { id: 'rice', en: 'Rice', cs: 'Rýže', category: 'pantry' },
  { id: 'pasta', en: 'Pasta', cs: 'Těstoviny', category: 'pantry' },
  { id: 'flour', en: 'Flour', cs: 'Mouka', category: 'pantry' },
  { id: 'sugar', en: 'Sugar', cs: 'Cukr', category: 'pantry' },
  { id: 'salt', en: 'Salt', cs: 'Sůl', category: 'pantry' },
  { id: 'oil', en: 'Oil', cs: 'Olej', category: 'pantry' },
  { id: 'vinegar', en: 'Vinegar', cs: 'Ocet', category: 'pantry' },
  { id: 'honey', en: 'Honey', cs: 'Med', category: 'pantry' },
  { id: 'breadcrumbs', en: 'Breadcrumbs', cs: 'Strouhanka', category: 'pantry' },
  { id: 'baking-powder', en: 'Baking Powder', cs: 'Prášek do pečiva', category: 'pantry' },
  { id: 'baking-soda', en: 'Baking Soda', cs: 'Jedlá soda', category: 'pantry' },
  { id: 'yeast', en: 'Yeast', cs: 'Droždí', category: 'pantry' },
  { id: 'cornstarch', en: 'Cornstarch', cs: 'Kukuřičný škrob', category: 'pantry' },
  { id: 'semolina', en: 'Semolina', cs: 'Krupice', category: 'pantry' },
  { id: 'oats', en: 'Oats', cs: 'Ovesné vločky', category: 'pantry' },
  { id: 'muesli', en: 'Muesli', cs: 'Müsli', category: 'pantry' },
  { id: 'couscous', en: 'Couscous', cs: 'Kuskus', category: 'pantry' },
  { id: 'bulgur', en: 'Bulgur', cs: 'Bulgur', category: 'pantry' },
  { id: 'quinoa', en: 'Quinoa', cs: 'Quinoa', category: 'pantry' },
  { id: 'lentils', en: 'Lentils', cs: 'Čočka', category: 'pantry' },
  { id: 'beans-dry', en: 'Beans (dry)', cs: 'Fazole (suché)', category: 'pantry' },
  { id: 'chickpeas', en: 'Chickpeas', cs: 'Cizrna', category: 'pantry' },
  { id: 'barley', en: 'Barley', cs: 'Ječmen', category: 'pantry' },
  { id: 'millet', en: 'Millet', cs: 'Jáhly', category: 'pantry' },
  { id: 'polenta', en: 'Polenta', cs: 'Polenta', category: 'pantry' },
  { id: 'spaghetti', en: 'Spaghetti', cs: 'Špagety', category: 'pantry' },
  { id: 'macaroni', en: 'Macaroni', cs: 'Kolínka', category: 'pantry' },
  { id: 'fusilli', en: 'Fusilli', cs: 'Vřetena', category: 'pantry' },
  { id: 'penne', en: 'Penne', cs: 'Penne', category: 'pantry' },
  { id: 'lasagna', en: 'Lasagna', cs: 'Lasagne', category: 'pantry' },
  { id: 'noodles', en: 'Noodles', cs: 'Nudle', category: 'pantry' },
  { id: 'rice-noodles', en: 'Rice Noodles', cs: 'Rýžové nudle', category: 'pantry' },
  { id: 'udon', en: 'Udon', cs: 'Udon', category: 'pantry' },
  { id: 'soba', en: 'Soba', cs: 'Soba', category: 'pantry' },
  { id: 'vermicelli', en: 'Vermicelli', cs: 'Vermicelli', category: 'pantry' },
  { id: 'crackers', en: 'Crackers', cs: 'Krekry', category: 'pantry' },
  { id: 'rice-cakes', en: 'Rice Cakes', cs: 'Rýžové chlebíčky', category: 'pantry' },
  { id: 'tortilla-chips', en: 'Tortilla Chips', cs: 'Tortilla chipsy', category: 'pantry' },
  { id: 'pretzel-sticks', en: 'Pretzel Sticks', cs: 'Tyčinky', category: 'pantry' },
  { id: 'popcorn-kernels', en: 'Popcorn Kernels', cs: 'Kukuřice na popcorn', category: 'pantry' },
  { id: 'granola', en: 'Granola', cs: 'Granola', category: 'pantry' },
  { id: 'jam', en: 'Jam', cs: 'Džem', category: 'pantry' },
  { id: 'peanut-butter', en: 'Peanut Butter', cs: 'Arašídové máslo', category: 'pantry' },
  { id: 'hazelnut-spread', en: 'Hazelnut Spread', cs: 'Lískooříškový krém', category: 'pantry' },
  { id: 'maple-syrup', en: 'Maple Syrup', cs: 'Javorový sirup', category: 'pantry' },
  { id: 'molasses', en: 'Molasses', cs: 'Melasa', category: 'pantry' },
  { id: 'cocoa-powder', en: 'Cocoa Powder', cs: 'Kakaový prášek', category: 'pantry' },
  { id: 'instant-coffee', en: 'Instant Coffee', cs: 'Instantní káva', category: 'pantry' },
  { id: 'tea-bags', en: 'Tea Bags', cs: 'Čajové sáčky', category: 'pantry' },
  { id: 'herbal-tea', en: 'Herbal Tea', cs: 'Bylinný čaj', category: 'pantry' },
  { id: 'black-tea', en: 'Black Tea', cs: 'Černý čaj', category: 'pantry' },
  { id: 'green-tea', en: 'Green Tea', cs: 'Zelený čaj', category: 'pantry' },
  { id: 'fruit-tea', en: 'Fruit Tea', cs: 'Ovocný čaj', category: 'pantry' },
  { id: 'mint-tea', en: 'Mint Tea', cs: 'Mátový čaj', category: 'pantry' },

  // Canned & Packaged
  { id: 'tomato-sauce', en: 'Tomato Sauce', cs: 'Rajčatová omáčka', category: 'canned' },
  { id: 'beans', en: 'Beans', cs: 'Fazole', category: 'canned' },
  { id: 'tuna', en: 'Tuna', cs: 'Tuňák', category: 'canned' },
  { id: 'corn', en: 'Corn', cs: 'Kukuřice', category: 'canned' },
  { id: 'soup', en: 'Soup', cs: 'Polévka', category: 'canned' },

  // Beverages
  { id: 'water', en: 'Water', cs: 'Voda', category: 'beverages' },
  { id: 'juice', en: 'Juice', cs: 'Džus', category: 'beverages' },
  { id: 'soda', en: 'Soda', cs: 'Limonáda', category: 'beverages' },
  { id: 'beer', en: 'Beer', cs: 'Pivo', category: 'beverages' },
  { id: 'wine', en: 'Wine', cs: 'Víno', category: 'beverages' },
  { id: 'red-wine', en: 'Red Wine', cs: 'Červené víno', category: 'beverages' },
  { id: 'white-wine', en: 'White Wine', cs: 'Bílé víno', category: 'beverages' },
  { id: 'sparkling-wine', en: 'Sparkling Wine', cs: 'Šumivé víno', category: 'beverages' },
  { id: 'coffee', en: 'Coffee', cs: 'Káva', category: 'beverages' },
  { id: 'tea', en: 'Tea', cs: 'Čaj', category: 'beverages' },

  // Snacks
  { id: 'chips', en: 'Chips', cs: 'Brambůrky', category: 'snacks' },
  { id: 'chocolate', en: 'Chocolate', cs: 'Čokoláda', category: 'snacks' },
  { id: 'cookies', en: 'Cookies', cs: 'Sušenky', category: 'snacks' },
  { id: 'nuts', en: 'Nuts', cs: 'Ořechy', category: 'snacks' },
  { id: 'popcorn', en: 'Popcorn', cs: 'Popcorn', category: 'snacks' },

  // Frozen Foods
  { id: 'ice-cream', en: 'Ice Cream', cs: 'Zmrzlina', category: 'frozen' },
  { id: 'frozen-pizza', en: 'Frozen Pizza', cs: 'Mražená pizza', category: 'frozen' },
  { id: 'frozen-vegetables', en: 'Frozen Vegetables', cs: 'Mražená zelenina', category: 'frozen' },

  // Condiments & Sauces
  { id: 'ketchup', en: 'Ketchup', cs: 'Kečup', category: 'condiments' },
  { id: 'mayonnaise', en: 'Mayonnaise', cs: 'Majonéza', category: 'condiments' },
  { id: 'mustard', en: 'Mustard', cs: 'Hořčice', category: 'condiments' },
  { id: 'soy-sauce', en: 'Soy Sauce', cs: 'Sójová omáčka', category: 'condiments' },

  // Household & Cleaning
  { id: 'toilet-paper', en: 'Toilet Paper', cs: 'Toaletní papír', category: 'household' },
  { id: 'paper-towels', en: 'Paper Towels', cs: 'Papírové utěrky', category: 'household' },
  { id: 'paper-handkerchiefs', en: 'Paper Handkerchiefs', cs: 'Papírové kapesníky', category: 'household' },
  { id: 'dish-soap', en: 'Dish Soap', cs: 'Mýdlo na nádobí', category: 'household' },
  { id: 'laundry-detergent', en: 'Laundry Detergent', cs: 'Prací prášek', category: 'household' },
  { id: 'trash-bags', en: 'Trash Bags', cs: 'Odpadkové pytle', category: 'household' },

  // Personal Care
  { id: 'shampoo', en: 'Shampoo', cs: 'Šampon', category: 'personal' },
  { id: 'toothpaste', en: 'Toothpaste', cs: 'Zubní pasta', category: 'personal' },
  { id: 'soap', en: 'Soap', cs: 'Mýdlo', category: 'personal' },
  { id: 'deodorant', en: 'Deodorant', cs: 'Deodorant', category: 'personal' },
  { id: 'toothbrush', en: 'Toothbrush', cs: 'Zubní kartáček', category: 'personal' },

  // Baby & Kids
  { id: 'diapers', en: 'Diapers', cs: 'Plenky', category: 'baby' },
  { id: 'baby-food', en: 'Baby Food', cs: 'Dětská výživa', category: 'baby' },
  { id: 'baby-wipes', en: 'Baby Wipes', cs: 'Dětské ubrousky', category: 'baby' },

  // Pet Supplies
  { id: 'dog-food', en: 'Dog Food', cs: 'Psí krmivo', category: 'pet' },
  { id: 'cat-food', en: 'Cat Food', cs: 'Kočičí krmivo', category: 'pet' },
  { id: 'cat-litter', en: 'Cat Litter', cs: 'Kočičí stelivo', category: 'pet' },

  // Health & Medicine
  { id: 'vitamins', en: 'Vitamins', cs: 'Vitamíny', category: 'health' },
  { id: 'pain-reliever', en: 'Pain Reliever', cs: 'Lék proti bolesti', category: 'health' },
  { id: 'band-aids', en: 'Band-Aids', cs: 'Náplasti', category: 'health' },
  { id: 'tissues', en: 'Tissues', cs: 'Kapesníky', category: 'health' },

  // Miscellaneous
  { id: 'batteries', en: 'Batteries', cs: 'Baterie', category: 'misc' },
  { id: 'light-bulbs', en: 'Light Bulbs', cs: 'Žárovky', category: 'misc' },
  { id: 'matches', en: 'Matches', cs: 'Zápalky', category: 'misc' },
  { id: 'candles', en: 'Candles', cs: 'Svíčky', category: 'misc' }
];

export const categories = {
  dairy: { en: 'Dairy & Eggs', cs: 'Mléčné výrobky & Vejce' },
  bakery: { en: 'Bread & Bakery', cs: 'Pekařské výrobky' },
  meat: { en: 'Meat & Fish', cs: 'Maso & Ryby' },
  fruits: { en: 'Fruits', cs: 'Ovoce' },
  vegetables: { en: 'Vegetables', cs: 'Zelenina' },
  pantry: { en: 'Pantry Staples', cs: 'Základní potraviny' },
  canned: { en: 'Canned & Packaged', cs: 'Konzervy & Balené' },
  beverages: { en: 'Beverages', cs: 'Nápoje' },
  snacks: { en: 'Snacks', cs: 'Svačiny' },
  frozen: { en: 'Frozen Foods', cs: 'Mražené potraviny' },
  condiments: { en: 'Condiments & Sauces', cs: 'Koření & Omáčky' },
  household: { en: 'Household & Cleaning', cs: 'Domácnost & Úklid' },
  personal: { en: 'Personal Care', cs: 'Osobní hygiena' },
  baby: { en: 'Baby & Kids', cs: 'Miminka & Děti' },
  pet: { en: 'Pet Supplies', cs: 'Potřeby pro zvířata' },
  health: { en: 'Health & Medicine', cs: 'Zdraví & Léky' },
  misc: { en: 'Miscellaneous', cs: 'Ostatní' }
};

export function searchGroceryItems(query: string, locale: string = 'en'): GroceryItem[] {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase();
  const langKey = locale === 'cs' ? 'cs' : 'en';
  
  return groceryItems.filter(item => 
    item[langKey].toLowerCase().includes(searchTerm) ||
    item.en.toLowerCase().includes(searchTerm) ||
    item.cs.toLowerCase().includes(searchTerm)
  ).slice(0, 10); // Limit to 10 suggestions
}

export function getItemsByCategory(category: string): GroceryItem[] {
  return groceryItems.filter(item => item.category === category);
} 