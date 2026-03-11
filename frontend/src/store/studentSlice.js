import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../services/api';

// Get all students
export const getStudents = createAsyncThunk('students/getStudents', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const getStudentById = createAsyncThunk('students/getStudentById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

// Create a student
export const createStudent = createAsyncThunk('students/createStudent', async (studentData, { rejectWithValue }) => {
  try {
    const response = await api.post('/students', studentData);
    toast.success('Student created successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create student');
    return rejectWithValue(error.response?.data);
  }
});

// Update a student
export const updateStudent = createAsyncThunk('students/updateStudent', async ({ id, studentData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    toast.success('Student updated successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update student');
    return rejectWithValue(error.response?.data);
  }
});

// Delete a student
export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/students/${id}`);
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
      .addCase(getStudentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedStudent = action.payload;
        state.isError = false;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload?.message || 'Failed to fetch student';
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
        if (state.selectedStudent?._id === action.payload) {
          state.selectedStudent = null;
        }
      });
  },
});

export const { setSelectedStudent, clearSelectedStudent, clearError } = studentSlice.actions;
export default studentSlice.reducer;
