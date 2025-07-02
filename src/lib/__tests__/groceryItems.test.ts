import { searchGroceryItems } from '../groceryItems';

describe('groceryItems', () => {
  describe('searchGroceryItems', () => {
    it('finds Milk when searching for mil', () => {
      const results = searchGroceryItems('mil', 'en');
      expect(results).toHaveLength(1);
      expect(results[0].en).toBe('Milk');
    });

    it('finds multiple items when searching for bread', () => {
      const results = searchGroceryItems('bread', 'en');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(item => item.en === 'Bread')).toBe(true);
    });

    it('returns empty array for empty query', () => {
      const results = searchGroceryItems('', 'en');
      expect(results).toHaveLength(0);
    });

    it('finds items in Czech', () => {
      const results = searchGroceryItems('mléko', 'cs');
      expect(results).toHaveLength(1);
      expect(results[0].cs).toBe('Mléko');
    });
  });
}); 