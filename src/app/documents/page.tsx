import React from "react";
import NewDocument from "./_components/NewDocument";
import RecentDocuments from "./_components/RecentDocuments";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/db";

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
        <NewDocument />
        <RecentDocuments userDocuments={userDocuments} />
      </div>
    </div>
  );
};

export default DocumentsPage;
