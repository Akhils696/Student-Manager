import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../services/api';

// Get all tasks
export const getTasks = createAsyncThunk('tasks/getTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// Get tasks by student
export const getTasksByStudent = createAsyncThunk('tasks/getTasksByStudent', async (studentId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/tasks/student/${studentId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const getTaskById = createAsyncThunk('tasks/getTaskById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// Create a task
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, { rejectWithValue }) => {
  try {
    const response = await api.post('/tasks', taskData);
    toast.success('Task created successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create task');
    return rejectWithValue(error.response?.data);
  }
});

// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, taskData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/tasks/${id}`, taskData);
    toast.success('Task updated successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update task');
    return rejectWithValue(error.response?.data);
  }
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/tasks/${id}`);
    toast.success('Task deleted successfully');
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete task');
    return rejectWithValue(error.response?.data);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    tasksByStudent: [],
    selectedTask: null,
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get tasks
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || 'Failed to fetch tasks';
      })
      // Get tasks by student
      .addCase(getTasksByStudent.fulfilled, (state, action) => {
        state.tasksByStudent = action.payload;
      })
      .addCase(getTaskById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedTask = action.payload;
        state.isError = false;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || 'Failed to fetch task';
      })
      // Create task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.selectedTask?._id === action.payload._id) {
          state.selectedTask = action.payload;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
        state.tasksByStudent = state.tasksByStudent.filter(task => task._id !== action.payload);
        if (state.selectedTask?._id === action.payload) {
          state.selectedTask = null;
        }
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
