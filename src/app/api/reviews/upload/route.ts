import { prisma } from '../../../../../src/lib/prisma';

export const dynamic = 'force-dynamic';


type ReviewRequestBody = {
  name: string;
  email: string;
  content: string;
  rating: number;
};

export async function POST(request: Request): Promise<Response> {
  try {
    const body: ReviewRequestBody = await request.json();

    const { name, email, content, rating } = body;

    // Input Validation
    if (!name || !email || !content || rating == null) {
      return new Response(
        JSON.stringify({ error: 'All fields are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({ error: 'Rating must be a number between 1 and 5.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new review in the database
    const newReview = await prisma.review.create({
      data: {
        name,
        email,
        content,
        rating: Math.round(rating), // Ensure it's an integer
      },
    });

    return new Response(
      JSON.stringify({ message: 'Review uploaded successfully!', review: newReview }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error creating review:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to upload review.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
