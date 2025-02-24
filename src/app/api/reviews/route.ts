import { NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/prisma';

export const dynamic = 'force-dynamic';


export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5, // Limit to the 5 most recent reviews
    });

    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error('Error fetching reviews:', error.message);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
