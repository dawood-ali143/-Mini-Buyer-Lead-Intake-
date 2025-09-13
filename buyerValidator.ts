import { z } from 'zod';

export const buyerSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\d{10,15}$/),
  city: z.enum(['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other']),
  propertyType: z.enum(['Apartment', 'Villa', 'Plot', 'Office', 'Retail']),
  bhk: z.string().optional().refine((val, ctx) => {
    const type = ctx.parent.propertyType;
    if (['Apartment', 'Villa'].includes(type)) return !!val;
    return true;
  }, { message: 'BHK required for Apartment/Villa' }),
  purpose: z.enum(['Buy', 'Rent']),
  budgetMin: z.number().int().optional(),
  budgetMax: z.number().int().optional().refine((val, ctx) => {
    const min = ctx.parent.budgetMin;
    return !val || !min || val >= min;
  }, { message: 'budgetMax must be ≥ budgetMin' }),
  timeline: z.enum(['0-3m', '3-6m', '>6m', 'Exploring']),
  source: z.enum(['Website', 'Referral', 'Walk-in', 'Call', 'Other']),
  status: z.enum(['New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped']).default('New'),
  notes: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
});
