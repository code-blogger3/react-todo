import { UserModel } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateUserTodoCategoryList = asyncHandler(async (req, res) => {
  const userID = req.params.userID;
  const { newTodoCategory } = req.body;

  const user = await UserModel.findById(userID);

  if (!user) {
    res.json(new ApiError(404, "user not found"));
  }

  if (newTodoCategory && newTodoCategory.trim() !== "") {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      {
        $push: { todoCategories: newTodoCategory },
      },
      { new: true }
    );

    const { password: pass, ...userDoc } = updatedUser._doc;
    res.json(userDoc);
  } else {
    res.json(new ApiError(404, "newTodoCategory is empty string"));
  }
});

export { updateUserTodoCategoryList };
