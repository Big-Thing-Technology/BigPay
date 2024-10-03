// ==============================|| OVERRIDES - PAGINATION ||============================== //

export default function Pagination() {
  return {
    MuiPagination: {
      defaultProps: {
        shape: 'rounded',
      },
      styleOverrides: { ul: { rowGap: 6 } },
    },
  }
}
