import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export type State = {
  openShift: boolean;
  openShiftDate: Date | null;
  closeShiftDate: Date | null;
  initCashFlow: number;
  endCashFlow: number;
};

const initialState: State = {
  openShift: false,
  openShiftDate: null,
  closeShiftDate: null,
  initCashFlow: 0,
  endCashFlow: 0,
};

export const shiftInfoSlice = createSlice({
  name: 'shiftInfo',
  initialState,
  reducers: {
    setOpenShift: (state, action: PayloadAction<number>) => {
      state.openShift = true;
      state.openShiftDate = new Date();
      state.initCashFlow = action.payload;
    },
    setCloseShift: (state) => {
      state.openShift = false;
      state.closeShiftDate = new Date();
    },
  },
});

export const selectShiftInfo = (state: RootState) => state.shiftInfo;

export const { setOpenShift, setCloseShift } = shiftInfoSlice.actions;

export default shiftInfoSlice.reducer;
