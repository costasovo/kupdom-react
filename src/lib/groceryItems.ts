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
  { id: 'fish', en: 'Fish', cs: 'Ryba', category: 'meat' },
  { id: 'sausage', en: 'Sausage', cs: 'Klobása', category: 'meat' },
  { id: 'ham', en: 'Ham', cs: 'Šunka', category: 'meat' },

  // Fruits
  { id: 'apples', en: 'Apples', cs: 'Jablka', category: 'fruits' },
  { id: 'bananas', en: 'Bananas', cs: 'Banány', category: 'fruits' },
  { id: 'oranges', en: 'Oranges', cs: 'Pomeranče', category: 'fruits' },
  { id: 'strawberries', en: 'Strawberries', cs: 'Jahody', category: 'fruits' },
  { id: 'grapes', en: 'Grapes', cs: 'Hroznové víno', category: 'fruits' },
  { id: 'lemons', en: 'Lemons', cs: 'Citrony', category: 'fruits' },

  // Vegetables
  { id: 'tomatoes', en: 'Tomatoes', cs: 'Rajčata', category: 'vegetables' },
  { id: 'onions', en: 'Onions', cs: 'Cibule', category: 'vegetables' },
  { id: 'potatoes', en: 'Potatoes', cs: 'Brambory', category: 'vegetables' },
  { id: 'carrots', en: 'Carrots', cs: 'Mrkev', category: 'vegetables' },
  { id: 'cucumber', en: 'Cucumber', cs: 'Okurka', category: 'vegetables' },
  { id: 'lettuce', en: 'Lettuce', cs: 'Salát', category: 'vegetables' },
  { id: 'bell-pepper', en: 'Bell Pepper', cs: 'Paprika', category: 'vegetables' },
  { id: 'mushrooms', en: 'Mushrooms', cs: 'Houby', category: 'vegetables' },

  // Pantry Staples
  { id: 'rice', en: 'Rice', cs: 'Rýže', category: 'pantry' },
  { id: 'pasta', en: 'Pasta', cs: 'Těstoviny', category: 'pantry' },
  { id: 'flour', en: 'Flour', cs: 'Mouka', category: 'pantry' },
  { id: 'sugar', en: 'Sugar', cs: 'Cukr', category: 'pantry' },
  { id: 'salt', en: 'Salt', cs: 'Sůl', category: 'pantry' },
  { id: 'oil', en: 'Oil', cs: 'Olej', category: 'pantry' },
  { id: 'vinegar', en: 'Vinegar', cs: 'Ocet', category: 'pantry' },
  { id: 'honey', en: 'Honey', cs: 'Med', category: 'pantry' },

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