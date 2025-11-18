import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  token: string | null;
  imperToken: string | null;
}

const initialState: UserState = {
  name: '',
  email: '',
  token: null,
  imperToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setImpersonationToken: (state, action: PayloadAction<string>) => {
      state.imperToken = action.payload;
    },
    removeImpersonationToken: (state) => {
      state.imperToken = null;
    }
  },
});

export const { setImpersonationToken, removeImpersonationToken } = userSlice.actions;
export default userSlice.reducer;