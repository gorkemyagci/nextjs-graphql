"use client";
import { GET_TODOS, UPDATE_TODO, DELETE_TODO } from "@/graphql/queries";
import { useQuery, useMutation } from "@apollo/client/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface GetTodosResponse {
  todos: Todo[];
}

interface UpdateTodoResponse {
  updateTodo: Todo;
}

interface DeleteTodoResponse {
  deleteTodo: Todo;
}

const TodosList = () => {
  const { loading, error, data, refetch } = useQuery<GetTodosResponse>(GET_TODOS, {
    notifyOnNetworkStatusChange: false,
  });
  
  const [updateTodo] = useMutation<UpdateTodoResponse>(UPDATE_TODO, {
    update: (cache, { data: mutationData }) => {
      if (mutationData?.updateTodo) {
        const existingData = cache.readQuery<GetTodosResponse>({ query: GET_TODOS });
        if (existingData) {
          cache.writeQuery({
            query: GET_TODOS,
            data: {
              todos: existingData.todos.map((todo) =>
                todo.id === mutationData.updateTodo.id
                  ? mutationData.updateTodo
                  : todo
              ),
            },
          });
        }
      }
    },
  });

  const [deleteTodo] = useMutation<DeleteTodoResponse>(DELETE_TODO, {
    update: (cache, { data: mutationData }) => {
      if (mutationData?.deleteTodo) {
        const existingData = cache.readQuery<GetTodosResponse>({ query: GET_TODOS });
        if (existingData) {
          cache.writeQuery({
            query: GET_TODOS,
            data: {
              todos: existingData.todos.filter((todo) => todo.id !== mutationData.deleteTodo.id),
            },
          });
        }
      }
    },
  });

  const handleToggleComplete = (todo: Todo) => {
    updateTodo({
      variables: {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      },
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo({ variables: { id } });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-destructive">Error loading todos: {error.message}</p>
      </div>
    );
  }

  if (!data || data.todos.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">No todos yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {data.todos.map((todo: Todo) => (
        <Card key={todo.id} className="transition-all hover:shadow-md">
          <CardContent className="flex items-center gap-3 p-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => handleToggleComplete(todo)}
              className="shrink-0"
            />
            <span
              className={`flex-1 text-base ${
                todo.completed
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {todo.title}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleComplete(todo)}
                className="rounded-xl"
              >
                {todo.completed ? "Undo" : "Complete"}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(todo.id)}
                className="rounded-xl"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TodosList;
