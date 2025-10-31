"use client";
import { Form } from "@/components/ui/form";
import { ERROR_MESSAGES } from "@/lib/constants/error.constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputElement from "@/components/custom/form-elements/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client/react";
import { CREATE_TODO, GET_TODOS } from "@/graphql/queries";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
}

interface GetTodosResponse {
  todos: Todo[];
}

interface CreateTodoResponse {
  createTodo: Todo;
}

const formSchema = z.object({
  title: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
});

type FormType = z.infer<typeof formSchema>;

const TodoForm = () => {
  const [createTodo] = useMutation<CreateTodoResponse>(CREATE_TODO, {
    update: (cache, { data: mutationData }) => {
      if (mutationData?.createTodo) {
        const existing = cache.readQuery<GetTodosResponse>({
          query: GET_TODOS,
        });
        if (existing) {
          cache.writeQuery({
            query: GET_TODOS,
            data: {
              todos: [mutationData.createTodo, ...existing.todos],
            },
          });
        }
      }
    },
  });

  const form = useForm<FormType>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data: FormType) => {
    createTodo({ variables: { title: data.title, completed: false } });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-3"
      >
        <InputElement form={form} name="title" placeholder="Todo name" />
        <Button type="submit" className="min-w-20 rounded-xl">
          Add
        </Button>
      </form>
    </Form>
  );
};

export default TodoForm;
