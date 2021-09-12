import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAPI } from '../../context/apiContext';
import './velocityTable.css';

function VelocityTable() {
  const [data, setData] = useState([]);
  const { productData } = useAPI();

  useEffect(() => {
    setData(productData);
  }, []);

  return (
    <TableContainer className='tableContainer' component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align='left'>Units Sold</TableCell>
            <TableCell align='left'>Total Stores</TableCell>
            <TableCell align='left'>Velocity Last Week</TableCell>
            <TableCell align='left'>4 Weeks</TableCell>
            <TableCell align='left'>12 Weeks</TableCell>
            <TableCell align='left'>52 Weeks</TableCell>
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
                  {parseFloat(item.salesWeek).toFixed(1)}
                </TableCell>
                <TableCell align='left'>{item.stores}</TableCell>
                <TableCell align='left'>
                  {parseFloat(item.salesWeek / item.stores).toFixed(1)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.sales4W / item.stores).toFixed(1)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.sales12W / item.stores).toFixed(1)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.sales52W / item.stores).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VelocityTable;
