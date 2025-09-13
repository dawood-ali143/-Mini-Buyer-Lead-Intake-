import { buyerSchema } from '@/lib/validation/buyer';
import { parse } from 'csv-parse/sync';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const text = await file.text();
  const rows = parse(text, { columns: true });

  const errors = [];
  const valid = [];

  for (let i = 0; i < rows.length; i++) {
    try {
      valid.push(buyerSchema.parse(rows[i]));
    } catch (e) {
      errors.push({ row: i + 1, message: e.message });
    }
  }

  if (errors.length) return Response.json({ errors }, { status: 400 });

  // Insert valid rows in transaction
}
