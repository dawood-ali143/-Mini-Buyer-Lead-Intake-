// drizzle/schema.ts
import { pgTable, uuid, varchar, text, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const buyers = pgTable('buyers', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 80 }),
  email: varchar('email', { length: 255 }).optional(),
  phone: varchar('phone', { length: 15 }),
  city: varchar('city', { enum: ['Chandigarh', 'Mohali', 'Zirakpur', 'Panchkula', 'Other'] }),
  propertyType: varchar('property_type', { enum: ['Apartment', 'Villa', 'Plot', 'Office', 'Retail'] }),
  bhk: varchar('bhk', { enum: ['1', '2', '3', '4', 'Studio'] }).optional(),
  purpose: varchar('purpose', { enum: ['Buy', 'Rent'] }),
  budgetMin: integer('budget_min').optional(),
  budgetMax: integer('budget_max').optional(),
  timeline: varchar('timeline', { enum: ['0-3m', '3-6m', '>6m', 'Exploring'] }),
  source: varchar('source', { enum: ['Website', 'Referral', 'Walk-in', 'Call', 'Other'] }),
  status: varchar('status', { enum: ['New', 'Qualified', 'Contacted', 'Visited', 'Negotiation', 'Converted', 'Dropped'] }).default('New'),
  notes: text('notes').optional(),
  tags: text('tags').array().optional(),
  ownerId: uuid('owner_id'),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const buyerHistory = pgTable('buyer_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  buyerId: uuid('buyer_id'),
  changedBy: uuid('changed_by'),
  changedAt: timestamp('changed_at').defaultNow(),
  diff: jsonb('diff')
});
