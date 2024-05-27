import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function GalleryView({ todosList, isLoading, refetch }) {
  if (isLoading) {
    return <>Loading...</>;
  }
  if (todosList == null) {
    refetch();
    return <>no data</>;
  }
  return (
    <section className="flex flex-wrap gap-3 mx-14 mt-[3rem]">
      {todosList.map((todo) => (
        <Card className="w-[250px] border border-sky-700" key={todo._id}>
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
  );
}

export default GalleryView;
