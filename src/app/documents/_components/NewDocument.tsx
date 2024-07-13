"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const templates = [
  {
    id: 1,
    title: "Blank Document",
    description: "",
    footer: "Blank Document",
  },
  {
    id: 2,
    title: "Wizardly Template",
    description: `
        [Exposition]
        
        [Rising Action]
        
        [Climax]
        
        [Falling Action]
        
        [Denouement]`,
    footer: "Wizardly Template",
  },
  {
    id: 3,
    title: "Resume Template",
    description: `
        [Name]
        
        [Job History]
        
        [Projects]
        
        [Education]
        
        [Skills]`,
    footer: "Resume Template",
  },
];

const NewDocument = () => {
  const router = useRouter();
  const { toast } = useToast();

  const createNewDoc = async (
    title: string = "Untitled Document",
    description: string = ""
  ) => {
    try {
      const response = await axios.post("/api/documents", {
        title,
        description,
      });

      toast({
        title: "Document Successfully Created!",
      });
      router.push(`/documents/${response.data.id}`);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 flex flex-col md:flex-row justify-center flex-wrap p-5">
      <div className="flex flex-col space-y-4 w-10/12 mx-auto">
        <h3 className="font-semibold text-sm mb-4">Start a new document</h3>
        <div className="flex space-x-4 flex-wrap">
          {templates.map((template) => (
            <div key={template.id}>
              <button
                onClick={() =>
                  createNewDoc(template.title, template.description)
                }
              >
                <Card className="w-[150px] h-[200px] hover:border hover:border-primary/80 hover:cursor-pointer">
                  <CardContent className="flex justify-center items-center h-full w-full">
                    <Plus size={80} />
                  </CardContent>
                </Card>
              </button>
              <p className="text-sm mt-2 ml-2">{template.footer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewDocument;
