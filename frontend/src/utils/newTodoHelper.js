const initialState = {
  id: "",
  name: "",
  completed: false,
  importantUrgentCategory: "None",
  todoCategory: "None",
  localPriorityCategory: "None",
  localPriorityNum: 0,
  globalPriorityCategory: "None",
  globalPriorityNum: 0,
};

const ACTIONS = {
  CHANGE_INPUT: "CHANGE_INPUT",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

const ImpUrgCategoryOptions = [
  { value: "none", label: "None" },
  { value: "importantUrgent", label: "importantUrgent" },
  { value: "notImportantUrgent", label: "Not important and Urgent" },
  { value: "importantNotUrgent", label: "important and not Urgent" },
  { value: "notImportanNottUrgent", label: "Not important and Not Urgent" },
];

const todoCategoryOptions = [
  { value: "none", label: "None" },
  {
    value: "study",
    label: "Study",
  },
  { value: "code", label: "Code" },
];

const PriorityOptions = [
  {
    value: "none",
    label: "None",
  },
  { value: "highest", label: "Highest" },
  {
    value: "lowest",
    label: "Lowest",
  },
];

export {
  todoReducer,
  todoCategoryOptions,
  ImpUrgCategoryOptions,
  PriorityOptions,
  initialState,
  ACTIONS,
};
