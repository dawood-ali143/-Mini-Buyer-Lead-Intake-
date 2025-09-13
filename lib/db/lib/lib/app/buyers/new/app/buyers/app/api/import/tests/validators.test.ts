import { buyerSchema } from '@/lib/validation/buyer';

test('budgetMax ≥ budgetMin', () => {
  expect(() =>
    buyerSchema.parse({ fullName: 'Ali', phone: '1234567890', city: 'Mohali', propertyType: 'Villa', bhk: '2', purpose: 'Buy', budgetMin: 5000000, budgetMax: 400000
