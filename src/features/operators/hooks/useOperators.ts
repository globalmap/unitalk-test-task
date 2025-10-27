import { useQuery } from '@tanstack/react-query';
import { operatorApi } from '../../../api/operatorApi';
import type { Operator, OperatorAddon } from '../types';

export const useOperatorsData = () => {
  const { data: operators, ...ops } = useQuery<Operator[]>({
    queryKey: ['operators'],
    queryFn: operatorApi.getOperators,
  });

  const { data: addons, ...addonsQuery } = useQuery<OperatorAddon[]>({
    queryKey: ['operatorAddons'],
    queryFn: operatorApi.getOperatorAddons,
  });

  return { operators, addons, ...ops, ...addonsQuery };
};
