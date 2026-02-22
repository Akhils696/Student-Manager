import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000/api';

// Get all tasks
export const getTasks = createAsyncThunk('tasks/getTasks', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.get(`${API_BASE_URL}/tasks`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// Get tasks by student
export const getTasksByStudent = createAsyncThunk('tasks/getTasksByStudent', async (studentId, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.get(`${API_BASE_URL}/tasks/student/${studentId}`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// Create a task
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, config);
    toast.success('Task created successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create task');
    return rejectWithValue(error.response?.data);
  }
});

// Update a task
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, taskData }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData, config);
    toast.success('Task updated successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update task');
    return rejectWithValue(error.response?.data);
  }
});

// Delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    await axios.delete(`${API_BASE_URL}/tasks/${id}`, config);
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
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;