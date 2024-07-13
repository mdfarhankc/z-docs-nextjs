import { db } from "@/utils/db";
import React from "react";
import EditorBlock from "./_components/EditorBlock";

interface DocumentPageProps {
  params: {
    documentId: string;
  };
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const getDocument = await db.document.findUnique({
    where: {
      id: params.documentId,
    },
  });

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      {getDocument ? (
        <>
          <h1>{getDocument.title}</h1>
          <EditorBlock document={getDocument} />
        </>
      ) : (
        <h1 className="text-center text-4xl text-primary">
          No Document Found!
        </h1>
      )}
    </div>
  );
};

export default DocumentPage;
