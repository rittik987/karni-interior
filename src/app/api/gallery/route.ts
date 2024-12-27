// app/api/gallery/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  try {
    // Fetch all projects and select only the `images` field
    const projects = await prisma.portfolio.findMany({
      select: {
        images: true, // Only fetch images from each project
      },
    });

    // Extract images from each project into a single array
    const allImages = projects.flatMap((project) => project.images);

    return NextResponse.json(allImages); // Return all images as a response
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
