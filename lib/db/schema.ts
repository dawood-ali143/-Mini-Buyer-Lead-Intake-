import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const buyers = pgTable('buyers', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 80 }),
  email: varchar('email', { length: 255 }).nullable(),
  phone: varchar('phone', { length: 15 }),
  city: varchar('city', { enum: ['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other'] }),
  propertyType: varchar('property_type', { enum: ['Apartment', 'Villa', 'Plot', 'Office', 'Retail'] }),
  bhk: varchar('bhk', { enum: ['1', '2', '3', '4', 'Studio'] }).nullable(),
  purpose: varchar('purpose', { enum: ['Buy', 'Rent'] }),
  budgetMin: integer('budget_min').nullable(),
  budgetMax: integer('budget_max').nullable(),
  timeline: varchar('timeline', { enum: ['0-3m', '3-6m', '>6m', 'Exploring'] }),
  source: varchar('source', { enum: ['Website', 'Referral', 'Walk-in', 'Call', 'Other'] }),
  status: varchar('status', { enum: ['New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped'] }).default('New'),
  notes: text('notes').nullable(),
  tags: text('tags').array().nullable(),
  ownerId: uuid('owner_id'),
  updatedAt: timestamp('updated_at').defaultNow()
});
