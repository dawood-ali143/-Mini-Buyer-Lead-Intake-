import { z } from 'zod';

export const buyerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\d{10,15}$/),
  city: z.enum(['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other']),
  propertyType: z.enum(['Apartment', 'Villa', 'Plot', 'Office', 'Retail']),
  bhk: z.string().optional().refine((val, ctx) => {
    const type = ctx.parent.propertyType;
    return !['Apartment', 'Villa'].includes(type) || !!val;
  }, { message: 'BHK required for Apartment/Villa' }),
  purpose: z.enum(['Buy', 'Rent']),
  budgetMin: z.number().int().optional(),
  budgetMax: z.number().int().optional().refine((val, ctx) => {
    return !val || !ctx.parent.budgetMin || val >= ctx.parent.budgetMin;
  }, { message: 'budgetMax must be ≥ budgetMin' }),
  timeline: z.enum(['0-3m', '3-6m', '>6m', 'Exploring']),
  source: z.enum(['Website', 'Referral', 'Walk-in', 'Call', 'Other']),
  notes: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped']).optional()
});
