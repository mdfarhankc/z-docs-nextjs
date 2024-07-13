import React from "react";
import NewDocument from "./_components/NewDocument";
import RecentDocuments from "./_components/RecentDocuments";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DocumentsPage = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen">
      <div id="dashboard">
        <NewDocument />
        <RecentDocuments />
      </div>
    </div>
  );
};

export default DocumentsPage;
