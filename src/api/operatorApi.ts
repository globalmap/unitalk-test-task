import type { Operator, OperatorAddon } from '../features/operators/types';
import { axiosClient } from './axiosClient';

export const operatorApi = {
  getOperators: async (): Promise<Operator[]> => {
    const { data } = await axiosClient.get('/operator');
    return data;
  },
  getOperatorAddons: async (): Promise<OperatorAddon[]> => {
    const { data } = await axiosClient.get('/operatorAddon');
    return data;
  },
};
