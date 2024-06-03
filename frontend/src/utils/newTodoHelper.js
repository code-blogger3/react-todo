const initialState = {
  name: "",
  completed: false,
  importantUrgentCategory: "None",
  todoCategory: "None",
  PriorityText: "None",
  PriorityNum: 0,
};

const ACTIONS = {
  CHANGE_INPUT: "CHANGE_INPUT",
  CLEAR_FIELDS: "CLEAR_FIELDS",
  ADD_TODO_CATEGORY: "ADD_TODO_CATEGORY",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case ACTIONS.ADD_TODO_CATEGORY:
      return {};
    case ACTIONS.CLEAR_FIELDS:
      return {
        ...initialState,
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
  { value: "notImportanNotUrgent", label: "Not important and Not Urgent" },
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
