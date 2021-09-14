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
  const { timeframeProductData } = useAPI();

  useEffect(() => {
    setData(timeframeProductData);
  }, [timeframeProductData]);

  return (
    <>
      <TableContainer id='velocityTable' component={Paper}>
        <Table className='tableBody' size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className='tableTitle' align='center' colSpan={7}>
                Units Sold Per Store Per Week
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='tableHeaders' colSpan={1} />
              <TableCell className='tableHeaders' colSpan={2} align='center'>
                Last Week
              </TableCell>
              <TableCell className='tableHeaders' colSpan={4} align='center'>
                Average Units Sold Per Store Per Week
              </TableCell>
            </TableRow>
            <TableRow className='tableSubHeader'>
              <TableCell className='tableHeaders'>Product</TableCell>
              <TableCell className='tableHeaders' align='left'>
                Units Sold
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                Total Stores
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                Last Week
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                4 Weeks
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                12 Weeks
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                52 Weeks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='tableBody'>
            {data.length &&
              data.map((item, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 1 ? 'highlighted' : null}
                >
                  <TableCell component='th' scope='row'>
                    {item.name}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(item.unitSalesLW)}
                  </TableCell>
                  <TableCell align='left'>{item.storesLW}</TableCell>
                  <TableCell align='left'>
                    {parseFloat(item.unitSalesLW / item.storesLW).toFixed(1)}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(item.unitSales4W / item.stores4W / 4).toFixed(
                      1
                    )}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(
                      item.unitSales12W / item.stores12W / 12
                    ).toFixed(1)}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(
                      item.unitSales52W / item.stores52W / 52
                    ).toFixed(1)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default VelocityTable;
