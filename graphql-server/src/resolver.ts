import axios from "axios";

let todoIdCounter = 201;

export const resolvers = {
  Query: {
    todos: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      return res.data;
    },
    todoById: async (_: any, { id }: { id: number }) => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      return res.data;
    },
  },
  Mutation: {
    createTodo: (
      _: any,
      { title, completed }: { title: string; completed: boolean }
    ) => ({
      userId: 1,
      id: todoIdCounter++,
      title,
      completed,
    }),
    updateTodo: (
      _: any,
      {
        id,
        title,
        completed,
      }: { id: number; title: string; completed: boolean }
    ) => ({
      userId: 1,
      id,
      title: title || "Updated todo",
      completed: completed ?? false,
    }),
    deleteTodo: (_: any, { id }: { id: number }) => ({
      userId: 1,
      id,
      title: "Deleted Todo",
      completed: false,
    }),
  },
};
