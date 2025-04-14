/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tasksData from '../data/tasks.json';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return tasksData;
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      return rejectWithValue('Failed to fetch tasks');
    }
  }
);

export const fetchTasksByProject = createAsyncThunk(
  'tasks/fetchTasksByProject',
  async (projectId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return tasksData.filter(task => task.projectId === projectId);
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      return rejectWithValue('Failed to fetch tasks for project');
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newId = Date.now().toString();
      return { ...task, id: newId };
    } catch (_) {
      return rejectWithValue('Failed to add task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return task;
    } catch (_) {
      return rejectWithValue('Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return taskId;
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      return rejectWithValue('Failed to delete task');
    }
  }
);

const initialState = {
  allTasks: [],
  projectTasks: [],
  selectedTask: null,
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    moveTask: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const taskIndex = state.projectTasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        // Update the task status in projectTasks
        state.projectTasks[taskIndex].status = newStatus;
        
        // Also update in allTasks
        const allTasksIndex = state.allTasks.findIndex(task => task.id === taskId);
        if (allTasksIndex !== -1) {
          state.allTasks[allTasksIndex].status = newStatus;
        }
        
        // Update selected task if it's the one being moved
        if (state.selectedTask && state.selectedTask.id === taskId) {
          state.selectedTask.status = newStatus;
        }
      }
    },
    reorderTasks: (state, action) => {
      // Reorder implementation for drag and drop
      // This assumes we'll keep tasks in their status columns and reorder within a column
      // In a real app, you might want to add order/position fields to tasks
      const { sourceIndex, destinationIndex, status } = action.payload;
      
      // Get tasks of the specified status
      const tasksInColumn = state.projectTasks.filter(task => task.status === status);
      
      // Reorder the tasks
      const [movedTask] = tasksInColumn.splice(sourceIndex, 1);
      tasksInColumn.splice(destinationIndex, 0, movedTask);
      
      // Return the updated array with proper ordering
      // This is just a placeholder - in a real app you might need a more complex implementation
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.allTasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch tasks by project
      .addCase(fetchTasksByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectTasks = action.payload;
      })
      .addCase(fetchTasksByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.allTasks.push(action.payload);
        if (state.projectTasks.some(task => task.projectId === action.payload.projectId)) {
          state.projectTasks.push(action.payload);
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update in allTasks
        const allTasksIndex = state.allTasks.findIndex(task => task.id === action.payload.id);
        if (allTasksIndex !== -1) {
          state.allTasks[allTasksIndex] = action.payload;
        }
        
        // Update in projectTasks
        const projectTasksIndex = state.projectTasks.findIndex(task => task.id === action.payload.id);
        if (projectTasksIndex !== -1) {
          state.projectTasks[projectTasksIndex] = action.payload;
        }
        
        // Update selected task if it's the one being edited
        if (state.selectedTask && state.selectedTask.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        
        // Remove from allTasks
        state.allTasks = state.allTasks.filter(task => task.id !== action.payload);
        
        // Remove from projectTasks
        state.projectTasks = state.projectTasks.filter(task => task.id !== action.payload);
        
        // Clear selected task if it was deleted
        if (state.selectedTask && state.selectedTask.id === action.payload) {
          state.selectedTask = null;
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectTask, moveTask, reorderTasks } = tasksSlice.actions;

export default tasksSlice.reducer; 