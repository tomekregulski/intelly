import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './weeklyTable.css';

function WeeklyTable(props) {
  const [data, setData] = useState([]);

  // console.log(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props]);

  return (
    <TableContainer className='tableContainer' component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align='left'>Last Week</TableCell>
            <TableCell align='left'>% Change</TableCell>
            <TableCell align='left'>Week 2</TableCell>
            <TableCell align='left'>% Change</TableCell>
            <TableCell align='left'>Week 3</TableCell>
            <TableCell align='left'>% Change</TableCell>
            <TableCell align='left'>Week 4</TableCell>
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
                <TableCell align='left'>
                  {parseFloat(
                    ((item.salesWeek2 - item.salesWeek) / item.salesWeek2) * 100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.salesWeek2).toFixed(1)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(
                    ((item.salesWeek3 - item.salesWeek2) / item.salesWeek3) *
                      100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.salesWeek3).toFixed(1)}
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(
                    ((item.salesWeek4 - item.salesWeek3) / item.salesWeek4) *
                      100
                  ).toFixed(1)}
                  %
                </TableCell>
                <TableCell align='left'>
                  {parseFloat(item.salesWeek4).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WeeklyTable;