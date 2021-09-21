import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAPI } from '../../context/apiContext';

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function TablTest() {
  const [rows, setRows] = useState([]);
  const { timeframeProductData } = useAPI();

  function createData(
    product,
    sales1w,
    revenue1w,
    sales4w,
    revenue4w,
    sales12w,
    revenue12w,
    sales52w,
    revenue52w
  ) {
    return {
      product,
      sales1w,
      revenue1w,
      sales4w,
      revenue4w,
      sales12w,
      revenue12w,
      sales52w,
      revenue52w,
    };
  }

  useEffect(() => {
    if (timeframeProductData) {
      const rowsData = timeframeProductData.map((item, index) => ({
        product: item.name,
        sales1w: item.unitSalesLW,
        revenue1w: item.netSalesLW,
        sales4w: item.unitSales4W,
        revenue4w: item.netSales4W,
        sales12w: item.unitSales12W,
        revenue12w: item.netSales12W,
        sales52w: item.unitSales52W,
        revenue52w: item.netSales52W,
      }));
      for (var i = 0; i < rowsData.length; i++) {
        createData(rowsData[i]);
      }
      setRows(rowsData);
    }
  }, [timeframeProductData]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length &&
            rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.calories}</TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
