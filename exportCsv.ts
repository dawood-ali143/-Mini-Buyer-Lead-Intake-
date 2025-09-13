import { buyers } from './schema';
import { db } from './db';
import { parse } from 'json2csv';

export async function exportCsv(filters: any) {
  const query = db.select().from(buyers);

  // Apply filters (simplified)
  if (filters.city) query.where(buyers.city.eq(filters.city));
  if (filters.status) query.where(buyers.status.eq(filters.status));
  if (filters.propertyType) query.where(buyers.propertyType.eq(filters.propertyType));

  const data = await query;

  const fields = [
    'fullName', 'email', 'phone', 'city', 'propertyType', 'bhk',
    'purpose', 'budgetMin', 'budgetMax', 'timeline', 'source',
    'notes', 'tags', 'status'
  ];

  const csv = parse(data, { fields });
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="buyers.csv"',
    },
  });
}
