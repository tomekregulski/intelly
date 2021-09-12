import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAPI } from '../../context/apiContext';
import './revenueTable.css';

function RevenueTable() {
  const [data, setData] = useState([]);
  const { productData } = useAPI();

  useEffect(() => {
    if (productData) {
      setData(productData);
    }
  }, []);

  return (
    <TableContainer className='tableContainer' component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align='left'>Units Sold LW</TableCell>
            <TableCell align='left'>Revenue LW</TableCell>
            <TableCell align='left'>Units Sold 4W</TableCell>
            <TableCell align='left'>Revenue 4W</TableCell>
            <TableCell align='left'>Units Sold 12W</TableCell>
            <TableCell align='left'>Revenue 12W</TableCell>
            <TableCell align='left'>Units Sold 52W</TableCell>
            <TableCell align='left'>Revenue 52W</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length &&
            data.map((item) => (
              <TableRow key={item.name}>
                <TableCell component='th' scope='row'>
                  {item.name}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.salesWeek).toFixed(0)}
                </TableCell>
                <TableCell align='left'>
                  ${parseFloat(item.salesWeek * item.price).toFixed(2)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.sales4W).toFixed(0)}
                </TableCell>
                <TableCell align='left'>
                  ${parseFloat(item.sales4W * item.price).toFixed(2)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.sales12W).toFixed(0)}
                </TableCell>
                <TableCell align='left'>
                  ${parseFloat(item.sales12W * item.price).toFixed(2)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.sales52W).toFixed(0)}
                </TableCell>
                <TableCell align='left'>
                  ${parseFloat(item.sales52W * item.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RevenueTable;
