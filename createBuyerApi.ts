import { buyerSchema } from './buyerValidator';
import { db } from './db'; // your drizzle client
import { buyers, buyerHistory } from './schema';
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromSession } from './auth'; // your auth logic

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parse = buyerSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.flatten() }, { status: 400 });
  }

  const userId = await getUserIdFromSession(req);
  const data = { ...parse.data, ownerId: userId };

  const inserted = await db.insert(buyers).values(data).returning();
  await db.insert(buyerHistory).values({
    buyerId: inserted[0].id,
    changedBy: userId,
    diff: inserted[0],
  });

  return NextResponse.json({ success: true, buyer: inserted[0] });
}
