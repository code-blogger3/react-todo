import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const updateTodoApi = async (todoID, todoDetails) => {
  return await axios.put(`/api/todo/update/${todoID}`, {
    ...todoDetails,
  });
};

const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update_todo"],
    mutationFn: ({ todoID, todoDetails }) => updateTodoApi(todoID, todoDetails),
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["get_todos"]);
    // },

    onMutate: async (todoID, todoDetails) => {
      await queryClient.cancelQueries(["get_todos"]);
      const previousData = queryClient.getQueriesData(["get_todos"]);
      queryClient.setQueryData(["get_todos"], (oldQueryData) => {
        if (!oldQueryData || !Array.isArray(oldQueryData.data)) {
          return oldQueryData;
        }
        // Ensure oldQueryData.data is an array before spreading

        // const updatedTodos = [
        //   ...oldQueryData.data.data,
        //   { _id: oldQueryData.data.data.length + 1, ...todoDetails },
        // ];

        const updatedTodos = oldQueryData.data.data.map((todo) => {
          if (todo._id === todoID) {
            return { ...todo, ...todoDetails };
          }
          return todo;
        });

        // Return the new state with the added todo
        return {
          ...oldQueryData,
          data: updatedTodos,
        };
      });
      return previousData;
    },

    onError: (_error, _todos, context) => {
      queryClient.setQueryData(["get_todos", context.previousData]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["get_todos"]);
    },
  });
};

export { useUpdateTodo };
