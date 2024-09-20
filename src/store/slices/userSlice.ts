import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'src/types/user';
import * as userService from 'src/services/userService';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  lastUpdated: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  lastUpdated: Date.now(),
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await userService.fetchUsers();
});

export const addUser = createAsyncThunk('users/addUser', async (user: User) => {
  const newUser = await userService.addUser(user);
  return newUser;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
  return await userService.updateUser(user);
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: number) => {
  await userService.deleteUser(id);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        if (!state.users.some((user) => user.id === action.payload.id)) {
          state.users.push(action.payload);
          state.lastUpdated = Date.now(); // Add this line
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
          state.lastUpdated = Date.now(); // Add this line
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.lastUpdated = Date.now(); // Add this line
      });
  },
});

export const { setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
