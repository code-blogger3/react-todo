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
    onSuccess: () => {
      queryClient.invalidateQueries(["get_todos"]);
    },
  });
};

export { useUpdateTodo };
