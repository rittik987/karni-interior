import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { promises as fs } from 'fs';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    // Parse the request URL to extract the project ID
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('id');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Fetch the project from the database
    const project = await prisma.portfolio.findUnique({
      where: { id: parseInt(projectId) },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Delete associated files (thumbnail and images)
    const uploadDir = path.join(process.cwd(), 'public');
    const deleteFile = async (filePath: string) => {
      const fullPath = path.join(uploadDir, filePath);
      try {
        await fs.unlink(fullPath);
      } catch (err) {
        console.error(`Error deleting file: ${fullPath}`, err);
      }
    };

    // Delete the thumbnail
    if (project.thumbnail) {
      await deleteFile(project.thumbnail);
    }

    // Delete all images
    if (Array.isArray(project.images) && project.images.length > 0) {
      for (const image of project.images) {
        await deleteFile(image);
      }
    }

    // Delete the project record from the database
    await prisma.portfolio.delete({
      where: { id: parseInt(projectId) },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    console.error('Delete Error:', error);
    return NextResponse.json(
      { error: `Failed to delete project: ${error.message}` },
      { status: 500 }
    );
  }
}
