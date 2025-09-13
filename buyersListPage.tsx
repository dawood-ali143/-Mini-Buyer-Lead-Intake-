import { db } from './db';
import { buyers } from './schema';
import { eq, and, ilike } from 'drizzle-orm';
import Link from 'next/link';

export default async function BuyersListPage({ searchParams }: { searchParams: any }) {
  const page = parseInt(searchParams.page || '1');
  const limit = 10;
  const offset = (page - 1) * limit;

  const filters = [];
  if (searchParams.city) filters.push(eq(buyers.city, searchParams.city));
  if (searchParams.status) filters.push(eq(buyers.status, searchParams.status));
  if (searchParams.propertyType) filters.push(eq(buyers.propertyType, searchParams.propertyType));
  if (searchParams.timeline) filters.push(eq(buyers.timeline, searchParams.timeline));
  if (searchParams.q) {
    filters.push(ilike(buyers.fullName, `%${searchParams.q}%`));
  }

  const results = await db
    .select()
    .from(buyers)
    .where(and(...filters))
    .orderBy(buyers.updatedAt)
    .limit(limit)
    .offset(offset);

  return (
    <div>
      <h1>Buyer Leads</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Phone</th><th>City</th><th>Type</th><th>Budget</th><th>Status</th><th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {results.map(buyer => (
            <tr key={buyer.id}>
              <td><Link href={`/buyers/${buyer.id}`}>{buyer.fullName}</Link></td>
              <td>{buyer.phone}</td>
              <td>{buyer.city}</td>
              <td>{buyer.propertyType}</td>
              <td>{buyer.budgetMin}–{buyer.budgetMax}</td>
              <td>{buyer.status}</td>
              <td>{new Date(buyer.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
