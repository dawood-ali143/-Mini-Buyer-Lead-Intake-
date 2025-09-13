import { db } from './db';
import { buyers, buyerHistory } from './schema';
import { eq } from 'drizzle-orm';
import { buyerSchema } from './buyerValidator';

export default async function ViewBuyerPage({ params }: { params: { id: string } }) {
  const buyer = await db.select().from(buyers).where(eq(buyers.id, params.id)).limit(1);
  const history = await db
    .select()
    .from(buyerHistory)
    .where(eq(buyerHistory.buyerId, params.id))
    .orderBy(buyerHistory.changedAt)
    .limit(5);

  return (
    <div>
      <h1>Edit Buyer</h1>
      <form method="POST" action={`/api/buyers/${params.id}`}>
        <input name="fullName" defaultValue={buyer[0].fullName} />
        <input type="hidden" name="updatedAt" value={buyer[0].updatedAt.toISOString()} />
        {/* Add other fields here */}
        <button type="submit">Save</button>
      </form>

      <h2>History</h2>
      <ul>
        {history.map(h => (
          <li key={h.id}>
            {new Date(h.changedAt).toLocaleString()} – {JSON.stringify(h.diff)}
          </li>
        ))}
      </ul>
    </div>
  );
}
