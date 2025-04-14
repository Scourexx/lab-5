/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectsData from '../data/projects.json';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return projectsData;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch projects');
    }
  }
);

export const addProject = createAsyncThunk(
  'projects/addProject',
  async (project, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newId = Date.now().toString();
      return { ...project, id: newId };
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add project');
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (project, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return project;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to update project');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return projectId;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to delete project');
    }
  }
);

const initialState = {
  projects: [],
  selectedProject: null,
  filteredProjects: [],
  filterCriteria: {
    status: null,
    priority: null,
    searchQuery: '',
  },
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    selectProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setFilterCriteria: (state, action) => {
      state.filterCriteria = {
        ...state.filterCriteria,
        ...action.payload,
      };

      const { status, priority, searchQuery } = state.filterCriteria;
      const filtered = state.projects.filter(project => {
        if (status && project.status !== status) return false;
        if (priority && project.priority !== priority) return false;
        if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      });

      state.filteredProjects = filtered;
    },
    clearFilters: (state) => {
      state.filterCriteria = {
        status: null,
        priority: null,
        searchQuery: '',
      };
      state.filteredProjects = state.projects;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.filteredProjects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add project
      .addCase(addProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.filteredProjects = state.projects;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
          if (state.selectedProject?.id === action.payload.id) {
            state.selectedProject = action.payload;
          }
          state.filteredProjects = state.projects;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(project => project.id !== action.payload);
        state.filteredProjects = state.projects;
        if (state.selectedProject?.id === action.payload) {
          state.selectedProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { selectProject, setFilterCriteria, clearFilters } = projectsSlice.actions;
export default projectsSlice.reducer;
