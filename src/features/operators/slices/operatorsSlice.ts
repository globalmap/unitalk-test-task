import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Order } from '../types';

interface OperatorsUIState {
  search: string;
  page: number;
  rowsPerPage: number;
  orderBy: string;
  order: Order;
}

const initialState: OperatorsUIState = {
  search: '',
  page: 0,
  rowsPerPage: 10,
  orderBy: 'name',
  order: 'asc',
};

const operatorsSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 0;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
    setSort: (state, action: PayloadAction<{ orderBy: string; order: Order }>) => {
      state.orderBy = action.payload.orderBy;
      state.order = action.payload.order;
    },
  },
});

export const { setSearch, setPage, setRowsPerPage, setSort } = operatorsSlice.actions;
export default operatorsSlice.reducer;
