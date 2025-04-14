import { useReducer } from 'react';

// Initial state for a new task
const initialTaskState = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assignee: '',
  dueDate: null,
};

// Action types
const ACTIONS = {
  CHANGE_FIELD: 'change_field',
  RESET_FORM: 'reset_form',
  LOAD_TASK: 'load_task',
};

// Reducer function
const taskFormReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case ACTIONS.RESET_FORM:
      return initialTaskState;
    case ACTIONS.LOAD_TASK:
      return { ...action.task };
    default:
      return state;
  }
};

const useTaskForm = (initialTask = null) => {
  const [formState, dispatch] = useReducer(
    taskFormReducer,
    initialTask || initialTaskState
  );

  const handleFieldChange = (field, value) => {
    dispatch({
      type: ACTIONS.CHANGE_FIELD,
      field,
      value,
    });
  };

  const resetForm = () => {
    dispatch({ type: ACTIONS.RESET_FORM });
  };

  const loadTask = (task) => {
    dispatch({
      type: ACTIONS.LOAD_TASK,
      task,
    });
  };

  const isFormValid = () => {
    // Basic validation
    return (
      formState.title.trim() !== '' && 
      formState.status !== '' && 
      formState.priority !== ''
    );
  };

  return {
    formState,
    handleFieldChange,
    resetForm,
    loadTask,
    isFormValid,
  };
};

export default useTaskForm; 