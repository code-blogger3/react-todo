import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const deleteTodoApi = async (todoID) => {
  return await axios.delete(`/api/todo/delete/${todoID}`);
};

const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete_todo"],
    mutationFn: deleteTodoApi,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["get_todos"]);
    // },

    onMutate: async (todoID) => {
      await queryClient.cancelQueries(["get_todos"]);
      const previousData = queryClient.getQueriesData(["get_todos"]);

      queryClient.setQueryData(["get_todos"], (oldQueryData) => {
        console.log(oldQueryData);
        const filterTodoList = oldQueryData?.data?.data?.filter(
          (todo) => todo._id !== todoID
        );
        console.log(oldQueryData.data.data);
        console.log(filterTodoList);
        return {
          ...oldQueryData,
          data: filterTodoList,
        };
      });
      return previousData;
    },

    onError: (_error, _todos, context) => {
      queryClient.setQueryData(["get_todos"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["get_todos"]);
    },
  });
};

export { useDeleteTodo };
