import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("todo's_user"));
const postTodoApi = async (todoDetails) => {
  const res = await axios.post("/api/todo/post", {
    ...todoDetails,
    userRef: user?._id,
  });
  // const todoData = res?.data?.data;
  // console.log(todoData);
  // dispatch(addTodo({ todoData }));
  return res;
};

const usePostTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create_todo"],
    mutationFn: postTodoApi,

    onMutate: async (todoDetails) => {
      await queryClient.cancelQueries(["get_todos"]);
      const previousData = queryClient.getQueriesData(["get_todos"]);
      queryClient.setQueryData(["get_todos"], (oldQueryData) => {
        if (!oldQueryData || !Array.isArray(oldQueryData.data)) {
          return oldQueryData;
        }
        // Ensure oldQueryData.data is an array before spreading

        const updatedTodos = [
          ...oldQueryData.data,
          { _id: oldQueryData.data.length + 1, ...todoDetails },
        ];

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
export { usePostTodo };
