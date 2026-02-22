import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000/api';

// Get all students
export const getStudents = createAsyncThunk('students/getStudents', async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.get(`${API_BASE_URL}/students`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// Create a student
export const createStudent = createAsyncThunk('students/createStudent', async (studentData, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.post(`${API_BASE_URL}/students`, studentData, config);
    toast.success('Student created successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create student');
    return rejectWithValue(error.response?.data);
  }
});

// Update a student
export const updateStudent = createAsyncThunk('students/updateStudent', async ({ id, studentData }, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.put(`${API_BASE_URL}/students/${id}`, studentData, config);
    toast.success('Student updated successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update student');
    return rejectWithValue(error.response?.data);
  }
});

// Delete a student
export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    await axios.delete(`${API_BASE_URL}/students/${id}`, config);
    toast.success('Student deleted successfully');
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to delete student');
    return rejectWithValue(error.response?.data);
  }
});

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    selectedStudent: null,
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
    clearError: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get students
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || 'Failed to fetch students';
      })
      // Create student
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      // Update student
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(student => student._id === action.payload._id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        if (state.selectedStudent && state.selectedStudent._id === action.payload._id) {
          state.selectedStudent = action.payload;
        }
      })
      // Delete student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(student => student._id !== action.payload);
      });
  },
});

export const { setSelectedStudent, clearSelectedStudent, clearError } = studentSlice.actions;
export default studentSlice.reducer;