import axios from "axios";
import { useQuery } from "react-query";

const getTodoListApi = async (userID) => {
  return await axios.get(`/api/todo/get/${userID}`);
};
const useGetTodoList = (userID) => {
  return useQuery({
    queryKey: ["get_todos"],
    queryFn: () => getTodoListApi(userID),
    retry: 3,
    staleTime: 10000,
    select: (data) => {
      const result = data?.data?.data;
      return result;
    },
  });
};

export { useGetTodoList };
