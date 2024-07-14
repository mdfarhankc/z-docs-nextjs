import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { Document } from "@prisma/client";
import { BookText } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  userDocuments: Document[];
}

const RecentDocuments = async ({ userDocuments }: Props) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="w-10/12 mx-auto my-4 p-5">
      <h1 className="font-semibold text-sm mb-4">Recent Document</h1>
      <div className="flex gap-8 flex-wrap">
        {userDocuments.length > 0 ? (
          userDocuments.map((document) => (
            <div key={document.id}>
              <Link href={`/documents/${document.id}`}>
                <Card className="w-[150px] h-[200px] hover:border hover:border-primary/80 hover:cursor-pointer">
                  <CardContent className="flex justify-center items-center h-full w-full">
                    <BookText size={60} />
                  </CardContent>
                </Card>
              </Link>
              <p className="text-sm mt-2">{document.title}</p>
            </div>
          ))
        ) : (
          <p className="text-sm">
            Once you start writing your recent document will go here...
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentDocuments;
