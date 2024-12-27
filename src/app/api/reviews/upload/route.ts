import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON request
    const body = await req.json();
    const { name, content, rating } = body;

    // Validate input
    if (!name || !content || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Create a new review in the database
    const review = await prisma.review.create({
      data: {
        name,
        content,
        rating,
      },
    });

    return NextResponse.json({ message: 'Review uploaded successfully', review });
  } catch (error: any) {
    console.error('Error uploading review:', error);
    return NextResponse.json({ error: 'Failed to upload review' }, { status: 500 });
  }
}
