import TodoList from "@/components/TodoList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const { todos } = useSelector((state) => state.todo);
  const [todosList, setTodoList] = useState(todos);
  const [tableView, setTableView] = useState(false);
  const [galleryView, setGalleryView] = useState(true);
  // console.log(todosList);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  return (
    <>
      <div className="flex justify-center gap-3 my-5">
        <Button
          variant={tableView ? "default" : "outline"}
          onClick={() => {
            setTableView(true);
            setGalleryView(false);
          }}
        >
          Table View
        </Button>
        <Button
          variant={galleryView ? "default" : "outline"}
          onClick={() => {
            setTableView(false);
            setGalleryView(true);
          }}
        >
          Gallery View
        </Button>
      </div>
      {tableView && (
        <section className="mx-14">
          <TodoList />
        </section>
      )}
      {galleryView && (
        <section className="flex flex-wrap gap-3 mx-14">
          {todosList.map((todo) => (
            <Card className="w-[250px] border border-sky-700" key={todo.id}>
              <CardHeader>
                <CardTitle className="text-center">{todo?.name}</CardTitle>
              </CardHeader>
              <hr className="w-[200px] mx-7" />
              <CardContent className="flex flex-col">
                <span>Category : {todo.todoCategory}</span>
                <span>Status : {todo.importantUrgentCategory}</span>
                <span>Local Priority : {todo.localPriorityNum}</span>
                <span>Global Priority : {todo.globalPriorityNum}</span>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </>
  );
}

export default Home;
