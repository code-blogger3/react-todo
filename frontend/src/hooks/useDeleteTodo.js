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

    onMutate: async (todoID) => {
      await queryClient.cancelQueries(["get_todos"]);
      const previousData = queryClient.getQueriesData(["get_todos"]);

      queryClient.setQueryData(["get_todos"], (oldQueryData) => {
        // console.log(oldQueryData);
        if (!oldQueryData || !Array.isArray(oldQueryData.data)) {
          return oldQueryData;
        }

        const filterTodoList = oldQueryData.data.filter(
          (todo) => todo._id !== todoID
        );

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
