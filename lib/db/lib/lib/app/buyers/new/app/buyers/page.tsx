import { getBuyers } from '@/lib/db/queries';

export default async function BuyersPage({ searchParams }) {
  const buyers = await getBuyers(searchParams); // SSR with filters, pagination

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Phone</th><th>City</th><th>Type</th><th>Budget</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        {buyers.map(b => (
          <tr key={b.id}>
            <td>{b.fullName}</td>
            <td>{b.phone}</td>
            <td>{b.city}</td>
            <td>{b.propertyType}</td>
            <td>{b.budgetMin}–{b.budgetMax}</td>
            <td>{b.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
