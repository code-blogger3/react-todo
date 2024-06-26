import axios from "axios";
import { useQuery } from "react-query";

const user = JSON.parse(localStorage.getItem("todo's_user"));

const getTodoListApi = async (userID) => {
  return await axios.get(`/api/todo/get/${userID}`);
};
const useGetTodoList = () => {
  return useQuery({
    queryKey: ["get_todos"],
    queryFn: () => getTodoListApi(user?._id),
    // retryDelay: 1000,
    // retry: 3,
    // // staleTime: 1000,
    // retry: (failureCount, error) => {
    //   // Retry only for specific error types
    //   let result = true;
    //   let count = 0;
    //   if (count > 2) {
    //     result = false;
    //   }
    //   if (error.status === 204) {
    //     count++;
    //   }
    //   return result;
    // },
    select: (data) => {
      const result = data?.data;
      return result;
    },
  });
};

export { useGetTodoList };
