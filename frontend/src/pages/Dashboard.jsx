import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTodoList } from "@/hooks/useGetTodoList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const { data } = useGetTodoList();
  const TotalTodo = data?.length;

  const CompletedTodo = data?.filter((todo) => todo.completed === true).length;
  const InCompletedTodo = data?.filter(
    (todo) => todo.completed === false
  ).length;
  // console.log(InCompletedTodo);
  // console.log(data);
  const chartData = {
    labels: ["completed todo", "total todo", "incompleted todo"],
    datasets: [
      {
        label: "Todos",
        data: [CompletedTodo, TotalTodo, InCompletedTodo],
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
        ],
        borderRadius: 5,
      },
    ],
  };
  return (
    <>
      <div className=" grid grid-cols-12 gap-3">
        <Card className="mt-[91px] md:col-span-8 col-span-12 mx-7">
          <CardContent>
            <Bar data={chartData} />
          </CardContent>
        </Card>
        {/* <ScrollArea>
          {data?.map((todo) => {
            return todo.name;
          })}
        </ScrollArea> */}
        <ScrollArea className="h-72  rounded-md border mt-[91px] md:col-span-4 mr-7">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Todos</h4>
            {data?.map((todo) => (
              <>
                <div key={todo._id} className="text-sm">
                  {todo.name}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
