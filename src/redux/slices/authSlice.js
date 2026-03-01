import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, getProfile, updateProfile } from "../../services/authService";

const user = JSON.parse(localStorage.getItem("userInfo")) || null;

const initialState = {
  user: user,
  loading: false,
  error: null,
};

export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    return await registerUser(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    return await loginUser(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (token, thunkAPI) => {
    try {
      return await getProfile(token); // authService.js will send header
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updateProfileData = createAsyncThunk(
  "auth/updateProfileData",
  async ({ name, email, token }, thunkAPI) => {
    try {
      return await updateProfile(token, { name, email }); // sends header
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(fetchProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateProfileData.pending, (state) => { state.loading = true; })
      .addCase(updateProfileData.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(updateProfileData.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});



export const { logout } = authSlice.actions;
export default authSlice.reducer;
