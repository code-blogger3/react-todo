import { CreateTodoModal } from "@/components/CreateTodoModal";
import EisenhowerMatrix from "@/components/EisenhowerMatrix";
import TodoList from "@/components/TodoList";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const { todos } = useSelector((state) => state.todo);
  const [todosList, setTodoList] = useState(todos);

  // console.log(todosList);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  return (
    <>
      <div className=" pt-[66px]">
        <CreateTodoModal />
        <Tabs defaultValue="galleryView" className="mt-[-69px]">
          <TabsList className="flex justify-center gap-5 my-5 max-w-screen-sm mx-auto">
            <TabsTrigger value="galleryView">Gallery View</TabsTrigger>
            <TabsTrigger value="tableView">Table View</TabsTrigger>
            <TabsTrigger value="matrixView">Matrix View</TabsTrigger>
          </TabsList>
          <TabsContent value="galleryView">
            <section className="flex flex-wrap gap-3 mx-14 mt-[3rem]">
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
          </TabsContent>
          <TabsContent value="tableView">
            <section className="mx-14">
              <TodoList />
            </section>
          </TabsContent>
          <TabsContent value="matrixView">
            <EisenhowerMatrix />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Home;
