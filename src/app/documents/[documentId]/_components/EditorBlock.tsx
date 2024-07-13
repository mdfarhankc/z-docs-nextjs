import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";

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
  const { handleSubmit, control } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: document.title || "",
      description: document.description || "",
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
  };

  return (
    <div>
      <h2>Editor Block</h2>
      <div>
        {/* <Form>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField control={control} name="title" render={({field}) => (
                <FormItem></FormItem>
            )} />
          </form>
        </Form> */}
      </div>
    </div>
  );
};

export default EditorBlock;
