import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface RequestBodyType {
  title?: string;
  description?: string;
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    const { title, description }: RequestBodyType = await req.json();

    const newDocument = await db.document.create({
      data: {
        userId: userId,
        title: title || "Untitled Document",
        description: description || "",
      },
    });

    revalidatePath("/documents");
    return NextResponse.json(newDocument, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return new NextResponse("New Document - Internal Server Error", {
      status: 500,
    });
  }
}
