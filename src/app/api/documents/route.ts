import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    const newDocument = await db.document.create({
      data: {
        userId: userId,
        title: "Untitled Document",
        description: "",
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
