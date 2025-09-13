import Papa from 'papaparse';
import { buyerSchema } from './buyerValidator';
import { db } from './db';
import { buyers } from './schema';

export async function importCsv(file: File) {
  const text = await file.text();
  const parsed = Papa.parse(text, { header: true });
  const errors = [];
  const validRows = [];

  parsed.data.forEach((row: any, i: number) => {
    const result = buyerSchema.safeParse(row);
    if (!result.success) {
      errors.push({ row: i + 1, message: result.error.message });
    } else {
      validRows.push(result.data);
    }
  });

  if (errors.length) return { errors };

  await db.transaction(async (tx) => {
    for (const row of validRows) {
      await tx.insert(buyers).values(row);
    }
  });

  return { success: true };
}
