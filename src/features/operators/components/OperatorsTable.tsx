import React, { useMemo } from 'react';
import {
  Box,
  Avatar,
  Checkbox,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableContainer,
  TablePagination,
  CircularProgress,
  Alert,
  styled,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSearch, setPage, setRowsPerPage, setSort } from '../slices/operatorsSlice';
import { useOperatorsData } from '../hooks/useOperators';
import type { Operator } from '../types';

// ==== styled-components ====

const Wrapper = styled(Box)({
  padding: '32px',
  backgroundColor: '#fff',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const PageTitle = styled(Typography)({
  fontSize: '1.75rem',
  fontWeight: 600,
});

const SearchField = styled(TextField)({
  width: 320,
  backgroundColor: '#fff',
});

const StyledTableContainer = styled(TableContainer)({
  borderRadius: 8,
  boxShadow: "0px 1px 3px 0px #0000001F",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#fafafa',
  '& .MuiTableCell-root': {
    fontWeight: 700,
    color: '#111',
    borderBottom: '1px solid #e0e0e0',
  },
});

const StyledTableCell = styled(TableCell)({
  borderBottom: '1px solid #eee',
  fontSize: '0.95rem',
  width: '50px',
});

const StyledCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: '#F04259',
  },
});

const NameBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontWeight: 500,
});

// ==== main component ====

export const OperatorsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { search, page, rowsPerPage, orderBy, order } = useAppSelector(
    (state) => state.operators
  );

  const { operators, addons, isLoading, error } = useOperatorsData();

  const addonColumns = useMemo(() => {
    if (!addons) return [];
    const unique = new Map();
    addons.forEach((a) => {
      if (!unique.has(a.fieldName)) unique.set(a.fieldName, a.text);
    });
    return Array.from(unique.entries()).map(([fieldName, text]) => ({
      fieldName,
      text,
    }));
  }, [addons]);

  const filtered = useMemo(() => {
    if (!operators) return [];
    return operators
      .filter((op) => op.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const aVal = a[orderBy as keyof Operator];
        const bVal = b[orderBy as keyof Operator];
        if (aVal < bVal) return order === 'asc' ? -1 : 1;
        if (aVal > bVal) return order === 'asc' ? 1 : -1;
        return 0;
      });
  }, [operators, search, orderBy, order]);

  const paginated = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  if (isLoading)
    return (
      <Wrapper display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Wrapper>
    );

  if (error)
    return (
      <Wrapper>
        <Alert severity="error">Помилка завантаження</Alert>
      </Wrapper>
    );

  return (
    <Wrapper>
      <PageTitle>Оператори</PageTitle>

      <SearchField
        label="Пошук"
        size="small"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Ім’я користувача..."
      />

      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell sortDirection={orderBy === 'name' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() =>
                    dispatch(
                      setSort({
                        orderBy: 'name',
                        order: order === 'asc' ? 'desc' : 'asc',
                      })
                    )
                  }
                >
                  Користувач
                </TableSortLabel>
              </TableCell>
              <TableCell>Працює</TableCell>
              <TableCell>Дата / Час створення</TableCell>
              {addonColumns.map((addon) => (
                <TableCell key={addon.fieldName}>{addon.fieldName}</TableCell>
              ))}
            </TableRow>
          </StyledTableHead>

          <TableBody>
            {paginated.map((op, i) => (
              <TableRow key={op.id} hover>
                <StyledTableCell>{page * rowsPerPage + i + 1}</StyledTableCell>

                <StyledTableCell>
                  <NameBox>
                    <Avatar src={op.avatar} alt={op.name} />
                    {op.name}
                  </NameBox>
                </StyledTableCell>

                <StyledTableCell>
                  <StyledCheckbox checked={op.isWorking} disabled />
                </StyledTableCell>

                <StyledTableCell>
                  {new Date(op.createdAt).toLocaleString('uk-UA', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </StyledTableCell>

                {addonColumns.map((addonCol) => {
                  const addonForOp = addons.find(
                    (a) => a.fieldName === addonCol.fieldName && a.id === op.id
                  );
                  return (
                    <StyledTableCell key={addonCol.fieldName}>
                      {addonForOp ? addonForOp.text : '-'}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, newPage) => dispatch(setPage(newPage))}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            dispatch(setRowsPerPage(parseInt(e.target.value, 10)))
          }
          sx={{
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': { fontSize: '12px' },
            '.MuiTablePagination-selectLabel': { color: "#668099" }
          }}
        />
      </StyledTableContainer>
    </Wrapper>
  );
};
