import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("todo's_user"));
// console.log(user._id);
const addTodoCategoryApi = async (newTodoCategory) => {
  const res = await axios.put(`/api/user/updateTodoCategoryList/${user?._id}`, {
    newTodoCategory,
  });

  return res;
};

const useAddTodoCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add_todoCategory"],
    mutationFn: addTodoCategoryApi,
    onSuccess: (data) => {
      //   localStorage.setItem("todo's_user", data.data);
      // console.log(d)
      localStorage.setItem("todo's_user", JSON.stringify({ ...data.data }));
    },
  });
};

export { useAddTodoCategory };
