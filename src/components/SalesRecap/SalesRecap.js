import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAPI } from '../../context/apiContext';
import './salesRecap.css';

function SalesRecap() {
  const [data, setData] = useState([]);
  const { timeframeProductData } = useAPI();

  console.log(timeframeProductData);

  useEffect(() => {
    if (timeframeProductData) {
      setData(timeframeProductData);
    }
  }, [timeframeProductData]);

  return (
    <>
      <TableContainer id='salesRecap' component={Paper}>
        <Table className='tableBody' size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className='tableTitle' align='center' colSpan={9}>
                Sales Recap
              </TableCell>
            </TableRow>
            <TableRow className='subHeader'>
              <TableCell
                colSpan={2}
                className='tableHeaders'
                align='center'
              ></TableCell>
              <TableCell colSpan={2} className='tableHeaders' align='center'>
                Last Week
              </TableCell>
              <TableCell colSpan={2} className='tableHeaders' align='center'>
                4 Weeks
              </TableCell>
              <TableCell colSpan={2} className='tableHeaders' align='center'>
                12 Weeks
              </TableCell>
              <TableCell colSpan={2} className='tableHeaders' align='center'>
                52 Weeks
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='tableHeaders'>Product</TableCell>
              <TableCell className='tableHeaders' align='center'>
                Sales
              </TableCell>
              <TableCell className='tableHeaders' align='center'>
                Revenue
              </TableCell>
              <TableCell className='tableHeaders' align='center'>
                Sales
              </TableCell>
              <TableCell className='tableHeaders' align='center'>
                Revenue
              </TableCell>
              <TableCell className='tableHeaders' align='center'>
                Sales
              </TableCell>
              <TableCell className='tableHeaders' align='center'>
                Revenue
              </TableCell>
              <TableCell className='tableHeaders' align='center'>
                Sales
              </TableCell>
              <TableCell className='tableHeaders' align='center'>
                Revenue
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                    {parseFloat(item.unitSalesLW).toFixed(0)}
                  </TableCell>
                  <TableCell align='left'>
                    ${parseFloat(item.netSalesLW).toFixed(2)}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(item.unitSales4W).toFixed(0)}
                  </TableCell>
                  <TableCell align='left'>
                    ${parseFloat(item.netSales4W).toFixed(2)}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(item.unitSales12W).toFixed(0)}
                  </TableCell>
                  <TableCell align='left'>
                    ${parseFloat(item.netSales12W).toFixed(2)}
                  </TableCell>
                  <TableCell align='left'>
                    {parseFloat(item.unitSales52W).toFixed(0)}
                  </TableCell>
                  <TableCell align='left'>
                    ${parseFloat(item.netSales52W).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SalesRecap;
