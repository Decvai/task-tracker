import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../shared/userType';
import { getErrorMessage } from '../../utils/helpers';
import {
  fetchLogin,
  fetchAuth,
  fetchRegistration,
  AuthFetchResponse,
  AuthCredentials,
  RegistrationData,
} from './authApi';

export interface AuthState {
  currentUser: User | null;
  isAuth: boolean;
  token: string;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  currentUser: null,
  isAuth: false,
  token: '',
  loading: true,
  error: '',
};

export const login = createAsyncThunk<
  AuthFetchResponse,
  AuthCredentials,
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response: AuthFetchResponse = await fetchLogin(email, password);
    return response;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const auth = createAsyncThunk<
  AuthFetchResponse,
  void,
  { state: RootState; rejectValue: string }
>('auth/authorization', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = state.auth.token;
    if (!token) {
      throw new Error('No token');
    }

    const response: AuthFetchResponse = await fetchAuth(token);
    return response;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const registration = createAsyncThunk<
  boolean,
  RegistrationData,
  { rejectValue: string }
>('auth/registration', async (user, { rejectWithValue }) => {
  try {
    const isAdded: boolean = await fetchRegistration(user);
    return isAdded;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = initialState.currentUser;
      state.isAuth = initialState.isAuth;
      state.token = initialState.token;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(auth.pending, (state) => {
        state.loading = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        const { user, token } = action.payload;

        state.currentUser = user;
        state.isAuth = true;
        state.token = token;
        state.loading = false;
      })
      .addCase(auth.rejected, (state, action) => {
        state.token = initialState.token;
        state.loading = false;

        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = String(action.error.message);
        }
      })

      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;

        state.currentUser = user;
        state.isAuth = true;
        state.token = token;
      })
      .addCase(login.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = String(action.error.message);
        }
      })

      .addCase(registration.fulfilled, (_, action) => {
        const isAdded: boolean = action.payload;
        // TODO: add logic
      })
      .addCase(registration.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = String(action.error.message);
        }
      });
  },
});

export const { logout } = authSlice.actions;

export const getIsAuth = (state: RootState) => state.auth.isAuth;
export const getCurrentUser = (state: RootState) => state.auth.currentUser;
export const getToken = (state: RootState) => state.auth.token;
export const getLoading = (state: RootState) => state.auth.loading;
export const getError = (state: RootState) => state.auth.error;

export const authReducer = authSlice.reducer;
