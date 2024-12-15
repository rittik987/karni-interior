import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();

const jwt_key = process.env.JWT_KEY;

const prisma = new PrismaClient();

if (!jwt_key) {
  throw new Error("JWT_KEY is not defined in the environment variables.");
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if both email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { status: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Retrieve the user based on email
    const user = await prisma.admin.findUnique({ where: { email } });

    // If no user is found or password is incorrect
    if (!user) {
      return NextResponse.json(
        { status: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password stored in the database
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return NextResponse.json(
        { status: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwt_key as string,
      { expiresIn: "3h" }
    );

    // Set the token as an HTTP-only cookie
    const res = NextResponse.json(
      { status: true, message: "Login successful", token },
      { status: 200 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 3600,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
    });

    return res;

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
