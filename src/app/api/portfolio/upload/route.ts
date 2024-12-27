import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { promises as fs } from 'fs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse FormData
    const data = await req.formData();
    const title = data.get('title') as string;
    const description = data.get('description') as string;
    const thumbnail = data.get('thumbnail') as File;
    const images = data.getAll('images') as File[]; // Get all uploaded files for "images"

    if (!title || !description || !thumbnail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Define upload directories
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Save the thumbnail
    const thumbnailPath = path.join(uploadDir, thumbnail.name);
    const thumbnailBuffer = await thumbnail.arrayBuffer();
    await fs.writeFile(thumbnailPath, Buffer.from(thumbnailBuffer));

    // Save multiple images
    const imagePaths: string[] = [];
    for (const image of images) {
      const imagePath = path.join(uploadDir, image.name);
      const imageBuffer = await image.arrayBuffer();
      await fs.writeFile(imagePath, Buffer.from(imageBuffer));
      imagePaths.push(`/uploads/${image.name}`);
    }

    // Save project details to the database
    const project = await prisma.portfolio.create({
      data: {
        title,
        description,
        thumbnail: `/uploads/${thumbnail.name}`,
        images: imagePaths, // Save all image paths as an array
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error('Upload Error:', error); // Log the detailed error here
    return NextResponse.json({ error: `Failed to upload project: ${error.message}` }, { status: 500 });
  }
}
