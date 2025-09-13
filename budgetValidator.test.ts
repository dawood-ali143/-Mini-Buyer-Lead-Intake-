import { buyerSchema } from './buyerValidator';

describe('Budget validation', () => {
  it('should fail if budgetMax < budgetMin', () => {
    expect(() =>
      buyerSchema.parse({
        fullName: 'Test',
        phone: '1234567890',
        city: 'Mohali',
        propertyType: 'Plot',
        purpose: 'Buy',
        budgetMin: 5000000,
        budgetMax: 3000000,
        timeline: '0-3m',
        source: 'Call',
        status: 'New',
      })
    ).toThrow();
  });
});
