import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  HeaderGroup,
  SortingState,
} from '@tanstack/table-core'
import { alpha, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Fragment, useMemo, useState } from 'react'
import { flexRender, useReactTable } from '@tanstack/react-table'
import MainCard from '@/components/MainCard'
import Stack from '@mui/material/Stack'
import { Table, TableBody, TableContainer, TableHead } from '@mui/material'
import {
  DebouncedInput,
  HeaderSort,
  RowSelection,
  TablePagination,
} from '@/components/third-party/react-table'
import Button from '@mui/material/Button'
import { Add } from 'iconsax-react'
import ScrollX from '@/components/ScrollX'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MemberView from '@/module/member/member-view'

interface Props {
  columns: ColumnDef<any>[]
  data: any[]
  modalToggler: () => void
}

// ==============================|| REACT TABLE - LIST ||============================== //

export default function ReactTable({ data, columns, modalToggler }: Props) {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))

  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  // const sortBy = { id: 'id', desc: false }
  const [statusFilter] = useState<string | number>('')

  const filteredData = useMemo(() => {
    if (statusFilter === '') return data
    return data.filter((member) => member.status === statusFilter)
  }, [statusFilter, data])

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      columnFilters,
      sorting,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getRowCanExpand: () => true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  })
  const backColor = alpha(theme.palette.primary.lighter, 0.1)

  return (
    <MainCard content={false}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        sx={{
          padding: 3,
          ...(matchDownSM && {
            '& .MuiOutlinedInput-root, & .MuiFormControl-root': { width: '100%' },
          }),
        }}
      >
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
          {/* <Select */}
          {/*  value={statusFilter} */}
          {/*  onChange={(event) => setStatusFilter(event.target.value)} */}
          {/*  displayEmpty */}
          {/*  inputProps={{ 'aria-label': 'Status Filter' }} */}
          {/* > */}
          {/*  <MenuItem value="">All Status</MenuItem> */}
          {/*  <MenuItem value={1}>Verified</MenuItem> */}
          {/*  <MenuItem value={2}>Pending</MenuItem> */}
          {/*  <MenuItem value={3}>Rejected</MenuItem> */}
          {/* </Select> */}
          {/* <SelectColumnSorting */}
          {/*  sortBy={sortBy.id} */}
          {/*  {...{ */}
          {/*    getState: table.getState, */}
          {/*    getAllColumns: table.getAllColumns, */}
          {/*    setSorting, */}
          {/*  }} */}
          {/* /> */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" startIcon={<Add />} onClick={modalToggler} size="large">
              Add Member
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <ScrollX>
        <Stack>
          <RowSelection selected={Object.keys(rowSelection).length} />
          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      if (
                        header.column.columnDef.meta !== undefined &&
                        header.column.getCanSort()
                      ) {
                        Object.assign(header.column.columnDef.meta, {
                          className: `${
                            header.column.columnDef.meta.className
                          } cursor-pointer prevent-select`,
                        })
                      }

                      return (
                        <TableCell
                          key={header.id}
                          {...header.column.columnDef.meta}
                          onClick={header.column.getToggleSortingHandler()}
                          {...(header.column.getCanSort() &&
                            header.column.columnDef.meta === undefined && {
                              className: 'cursor-pointer prevent-select',
                            })}
                        >
                          {header.isPlaceholder ? null : (
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Box>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </Box>
                              {header.column.getCanSort() && <HeaderSort column={header.column} />}
                            </Stack>
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow
                        sx={{
                          bgcolor: backColor,
                          '&:hover': { bgcolor: `${backColor} !important` },
                          overflow: 'hidden',
                        }}
                      >
                        <TableCell
                          colSpan={row.getVisibleCells().length}
                          sx={{ p: 2.5, overflow: 'hidden' }}
                        >
                          <MemberView data={row.original} />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
              <TablePagination
                {...{
                  setPageSize: table.setPageSize,
                  setPageIndex: table.setPageIndex,
                  getState: table.getState,
                  getPageCount: table.getPageCount,
                }}
              />
            </Box>
          </>
        </Stack>
      </ScrollX>
    </MainCard>
  )
}
