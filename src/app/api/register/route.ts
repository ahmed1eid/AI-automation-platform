import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { z } from "zod";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = registerSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json({ error: "Invalid registration data." }, { status: 400 });
    }

    const { name, email, password } = parsedBody.data;

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Register API error:", error);
    if (error instanceof mongoose.Error || error instanceof Error) {
      const message = error.message || "";
      if (
        message.includes("MONGODB_URI") ||
        message.includes("ECONNREFUSED") ||
        message.includes("ServerSelectionError")
      ) {
        return NextResponse.json(
          { error: "Database is not configured or not running. Set MONGODB_URI and start MongoDB." },
          { status: 503 }
        );
      }
    }
    return NextResponse.json({ error: "Failed to register user." }, { status: 500 });
  }
}
