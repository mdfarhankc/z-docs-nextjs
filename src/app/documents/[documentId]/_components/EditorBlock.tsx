"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Editor from "./Editor";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import DrawerAI from "./DrawerAI";
import Link from "next/link";

const FormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface Props {
  document: {
    id: string;
    userId: string;
    title: string | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

const EditorBlock: React.FC<Props> = ({ document }) => {
  const { toast } = useToast();
  const router = useRouter();

  const EditorForm = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: document.title || "",
      description: document.description || "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      await axios.put(`/api/documents/${document?.id}`, values);
      toast({ title: "Document Successfully Updated" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error while updating document!",
      });
      console.error("error", error);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/documents/${document?.id}`);
      toast({
        title: "Document Delete Successfully",
      });
      router.push("/documents");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error while deleting document!",
      });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex justify-end gap-x-4 w-full h-full pt-4">
        <Button variant={"secondary"} asChild>
          <Link href={"/documents"}>Go Back</Link>
        </Button>
        <Button variant={"destructive"} onClick={onDelete}>
          Delete
        </Button>
        {/* <DrawerAI /> */}
      </div>
      <div>
        <Form {...EditorForm}>
          <form onSubmit={EditorForm.handleSubmit(onSubmit)}>
            <FormField
              control={EditorForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormControl>
                    <Input placeholder="Enter Title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={EditorForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-10 bg-green-600 hover:bg-green-800">
              Save Changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditorBlock;
