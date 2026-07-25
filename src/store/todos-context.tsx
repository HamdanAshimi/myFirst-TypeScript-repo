import React, { useState } from "react";
import Todo from "../models/todo";

type TodosCtxObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosCtxObj>({
  items: [],
  addTodo: () => {},
  removeTodo: () => {},
});

const TodosContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const onAddTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);
    setTodos((prevTodos) => prevTodos.concat(newTodo));
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const ctxValue: TodosCtxObj = {
    items: todos,
    addTodo: onAddTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={ctxValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
