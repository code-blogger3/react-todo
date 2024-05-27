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
    onSuccess: () => {
      queryClient.invalidateQueries(["get_todos"]);
    },
  });
};

export { useDeleteTodo };
