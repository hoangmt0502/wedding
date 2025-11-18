import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PaletteMode } from '@mui/material';
import { RootState } from '../index';
import DefaultPalette from '../../theme/palette';
import { getSystemMode } from '../../utils/themeMode';

export interface ThemeField {
  label: string;
  value: string;
}

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export type PaletteModeExtended = PaletteMode | 'system'

type ThemeState = {
  mode: PaletteModeExtended;
  themeColor: ThemeColor;
  userThemeColor?: string;
  customColors: ReturnType<typeof DefaultPalette>['custom'];
  customColorOverrides: Partial<ReturnType<typeof DefaultPalette>['custom']>;
  isChanged: boolean;
};

const defaultMode: PaletteMode = 'light';
const initialPalette = DefaultPalette(defaultMode);

const initialState: ThemeState = {
  mode: defaultMode,
  themeColor: 'primary',
  userThemeColor: undefined,
  customColors: initialPalette.custom,
  customColorOverrides: {},
  isChanged: false,
};

export const loadUserColorsFromFile = createAsyncThunk(
  'theme/loadUserColorsFromFile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('/userColors.json');

      if (!response.ok) {
        throw new Error('Failed to load userColors.json');
      }

      const data = await response.json();

      dispatch(setCustomColorOverrides(data));
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<PaletteModeExtended>) {
      state.mode = action.payload;
    },
    setThemeColor(state, action: PayloadAction<ThemeColor>) {
      state.themeColor = action.payload;
    },
    setUserThemeColor(state, action: PayloadAction<string | undefined>) {
      state.userThemeColor = action.payload;
      state.isChanged = action.payload === undefined ? false : true;
    },
    setCustomColorOverrides(state, action: PayloadAction<Partial<ReturnType<typeof DefaultPalette>['custom']>>) {
      state.customColorOverrides = {
        ...state.customColorOverrides,
        ...action.payload
      };

      state.customColors = {
        ...state.customColors,
        ...action.payload
      };

      state.isChanged = true;
    },
    resetCustomColorOverrides(state) {
      const resolvedMode = state.mode === 'system' ? 'light' : state.mode;
      const fallback = DefaultPalette(resolvedMode);

      state.customColorOverrides = {};
      state.customColors = fallback.custom;
      state.isChanged = false;
    }
  }
});

export const { setMode, setThemeColor, setCustomColorOverrides, resetCustomColorOverrides, setUserThemeColor } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;
export default themeSlice.reducer;
