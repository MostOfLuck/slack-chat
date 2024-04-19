import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { chatContextRoutes } from '../routes';

const fetchInitialData = createAsyncThunk(
  'fetchInitialData',
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(chatContextRoutes.data(), { headers: { Authorization: `Bearer ${user.token}` } });
      return response.data;
    } catch (error) {
      if (error.isAxiosError) {
        return rejectWithValue(error.response.status);
      }
      throw error;
    }
  },
);

export default fetchInitialData;
