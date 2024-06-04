import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTodoList } from "@/hooks/useGetTodoList";

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
      <div className=" grid grid-cols-12 l gap-3">
        <Card className="mt-[91px] md:col-span-7 col-span-2">
          <CardContent>
            <Bar data={chartData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
