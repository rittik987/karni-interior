export const dynamic = 'force-dynamic';


import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { promises as fs } from 'fs';

const prisma = new PrismaClient();

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    // Use req.nextUrl to extract query parameters in a Next.js-compatible way
    const url = new URL(req.url);
    const projectId = url.searchParams.get('id');

    if (!projectId || isNaN(Number(projectId))) {
      return NextResponse.json({ error: 'Invalid Project ID' }, { status: 400 });
    }

    // Fetch the project from the database
    const project = await prisma.portfolio.findUnique({
      where: { id: Number(projectId) },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Directory where files are stored
    const uploadDir = path.join(process.cwd(), 'public');

    // Function to delete a file
    const deleteFile = async (filePath: string): Promise<void> => {
      const fullPath = path.join(uploadDir, filePath);
      try {
        await fs.access(fullPath); // Ensure file exists
        await fs.unlink(fullPath); // Delete the file
      } catch (err) {
        console.warn(`Failed to delete file: ${fullPath}`, err);
      }
    };

    // Delete the thumbnail file if it exists
    if (project.thumbnail) {
      await deleteFile(project.thumbnail);
    }

    // Delete all image files if they exist
    if (Array.isArray(project.images)) {
      for (const image of project.images) {
        await deleteFile(image);
      }
    }

    // Delete the project record from the database
    await prisma.portfolio.delete({
      where: { id: Number(projectId) },
    });

    // Return a success response
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    console.error('Error while deleting project:', error);
    return NextResponse.json(
      { error: `Failed to delete project: ${error.message}` },
      { status: 500 }
    );
  }
}
