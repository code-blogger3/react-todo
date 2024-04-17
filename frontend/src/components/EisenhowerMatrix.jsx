import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MatrixList from "./MatrixList";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function EisenhowerMatrix() {
  const { todos } = useSelector((state) => state.todo);
  const [todosList, setTodoList] = useState(todos);
  // console.log(todosList);
  const importantUrgentList = todosList.filter(
    (todo) => todo.importantUrgentCategory == "importantUrgent"
  );
  const importantNoturgentList = todosList.filter(
    (todo) => todo.importantUrgentCategory == "importantNotUrgent"
  );
  const notimportantUrgentList = todosList.filter(
    (todo) => todo.importantUrgentCategory == "notImportantUrgent"
  );
  // console.log(notimportantUrgentList);
  const notimportantNoturgentList = todosList.filter(
    (todo) => todo.importantUrgentCategory == "notImportantNotUrgent"
  );

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);
  return (
    <section className="max-w-sm mx-auto md:grid md:grid-cols-2 md:max-w-[750px] lg:max-w-5xl">
      <div>
        <CardHeader>
          <CardTitle className="text-center ">Important & Urgent</CardTitle>
        </CardHeader>
        <Card className="h-60 overflow-y-auto">
          <CardContent className="">
            <MatrixList selectedTodos={importantUrgentList} />
          </CardContent>
        </Card>
      </div>
      <div>
        <CardHeader>
          <CardTitle className="text-center">Important & Not Urgent</CardTitle>
        </CardHeader>
        <Card className="h-60 overflow-y-auto">
          <CardContent>
            <MatrixList selectedTodos={importantNoturgentList} />
          </CardContent>
        </Card>
      </div>
      <div>
        <CardHeader>
          <CardTitle className="text-center">Not Important & Urgent</CardTitle>
        </CardHeader>
        <Card className="h-60 overflow-y-auto">
          <CardContent>
            <MatrixList selectedTodos={notimportantUrgentList} />
          </CardContent>
        </Card>
      </div>
      <div>
        <CardHeader>
          <CardTitle className="text-center">
            Not Important & Not Urgent
          </CardTitle>
        </CardHeader>
        <Card className="h-60 overflow-y-auto">
          <CardContent>
            <MatrixList selectedTodos={notimportantNoturgentList} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default EisenhowerMatrix;
