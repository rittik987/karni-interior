export const dynamic = 'force-dynamic';


import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../src/lib/prisma';



export async function GET(req: NextRequest) {
  try {
    // Use searchParams directly from req.nextUrl
    const id = req.nextUrl.searchParams.get('id'); // Retrieve the ID from query parameters

    if (id) {
      // Fetch a specific project by ID with all fields
      const project = await prisma.portfolio.findUnique({
        where: { id: Number(id) }, // Ensure ID is cast to a number
      });

      if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }

      return NextResponse.json(project); // Return the project details
    }

    // Fetch all projects with selected fields, including the `images` array
    const projects = await prisma.portfolio.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        images: true, // Include the images array
        createdAt: true,
      },
    });

    return NextResponse.json(projects); // Return the list of projects
  } catch (error) {
    console.error('Error fetching project(s):', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
