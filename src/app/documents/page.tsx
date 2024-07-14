import React, { Suspense } from "react";
import NewDocument from "./_components/NewDocument";
import RecentDocuments from "./_components/RecentDocuments";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/db";
import { Loader2 } from "lucide-react";

const DocumentsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const userDocuments = await db.document.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="min-h-screen">
      <div id="dashboard">
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <NewDocument />
        </Suspense>
        <RecentDocuments userDocuments={userDocuments} />
      </div>
    </div>
  );
};

export default DocumentsPage;
