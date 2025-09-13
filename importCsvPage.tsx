'use client';
import { useState } from 'react';
import Papa from 'papaparse';
import { buyerSchema } from './buyerValidator';

export default function ImportCsvPage() {
  const [errors, setErrors] = useState<{ row: number; message: string }[]>([]);
  const [successCount, setSuccessCount] = useState(0);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const parsed = Papa.parse(text, { header: true });
    const validRows = [];
    const errorRows = [];

    parsed.data.forEach((row: any, i: number) => {
      const result = buyerSchema.safeParse(row);
      if (!result.success) {
        errorRows.push({ row: i + 1, message: result.error.message });
      } else {
        validRows.push(result.data);
      }
    });

    setErrors(errorRows);

    if (validRows.length > 0) {
      const res = await fetch('/api/buyers/import', {
        method: 'POST',
        body: JSON.stringify(validRows),
      });
      if (res.ok) setSuccessCount(validRows.length);
    }
  };

  return (
    <div>
      <h1>Import Buyers from CSV</h1>
      <input type="file" accept=".csv" onChange={handleFile} />
      {successCount > 0 && <p>{successCount} rows imported successfully.</p>}
      {errors.length > 0 && (
        <table>
          <thead><tr><th>Row</th><th>Error</th></tr></thead>
          <tbody>
            {errors.map((err, i) => (
              <tr key={i}><td>{err.row}</td><td>{err.message}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
