import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { promises as fs } from 'fs';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    if (!req.url) {
      return NextResponse.json({ error: 'Invalid request URL' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('id');

    if (!projectId || isNaN(parseInt(projectId))) {
      return NextResponse.json({ error: 'Invalid Project ID' }, { status: 400 });
    }

    const project = await prisma.portfolio.findUnique({
      where: { id: parseInt(projectId) },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const uploadDir = path.join(process.cwd(), 'public');

    const deleteFile = async (filePath: string) => {
      const fullPath = path.join(uploadDir, filePath);
      try {
        await fs.access(fullPath); // Ensure file exists
        await fs.unlink(fullPath);
      } catch (err) {
        console.warn(`File not found or could not be deleted: ${fullPath}`, err);
      }
    };

    if (project.thumbnail) {
      await deleteFile(project.thumbnail);
    }

    if (Array.isArray(project.images)) {
      for (const image of project.images) {
        await deleteFile(image);
      }
    }

    await prisma.portfolio.delete({
      where: { id: parseInt(projectId) },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    console.error('Delete Error:', error);
    return NextResponse.json(
      { error: ` Failed to delete project: ${error.message}` },
      { status: 500 }
    );
  }
}
