import { CreateTodoModal } from "@/components/CreateTodoModal";
import EisenhowerMatrix from "@/components/EisenhowerMatrix";
import GalleryView from "@/components/GalleryView";
import TodoList from "@/components/TodoList";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTodoList } from "@/hooks/useGetTodoList";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const { todos } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.user);
  const { data, isLoading, refetch } = useGetTodoList(user?._id);
  const [todosList, setTodoList] = useState(data);

  useEffect(() => {
    // refetch();
    setTodoList(data);
  }, [data]);
  // if (isLoading) {
  //   return <>Loading...</>;
  // }
  // if (data == null) {
  //   return <>no data</>;
  // }
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
            <GalleryView
              todosList={todosList}
              isLoading={isLoading}
              refetch={refetch}
            />
          </TabsContent>
          <TabsContent value="tableView">
            <section className="mx-14">
              <TodoList />
            </section>
          </TabsContent>
          <TabsContent value="matrixView">
            <EisenhowerMatrix data={todosList} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Home;
