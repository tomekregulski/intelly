import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAPI } from '../../context/apiContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  welcomeTable: {
    width: '90%',
    maxWidth: '420px',
    margin: '70px auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  '@media screen and (min-width: 768px)': {},
}));

export default function BasicTable() {
  const {
    region,
    timeframeProductData,
    timeframeStoreData,
    weeklyStoreData,
    weeklyProductData,
  } = useAPI();

  const [rows, setRows] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (timeframeProductData.length) {
      let totalNetSales = 0;
      let totalUnitSales = 0;
      let topSku = {
        name: '',
        sales: 0,
      };
      for (var i = 0; i < timeframeProductData.length; i++) {
        totalNetSales = totalNetSales + timeframeProductData[i].netSalesLW;
        totalUnitSales = totalUnitSales + timeframeProductData[i].unitSalesLW;
        if (
          topSku.name === '' ||
          timeframeProductData[i].unitSalesLW > topSku.sales
        ) {
          topSku.name = timeframeProductData[i].name;
          topSku.sales = timeframeProductData[i].unitSalesLW;
        }
      }

      let tempRows = [
        {
          name: 'Top Store',
          value: timeframeStoreData[0].name,
        },
        {
          name: 'Top SKU',
          value: topSku.name,
        },
        {
          name: 'Total Unit Sales',
          value: totalUnitSales,
        },
        {
          name: 'Total Net Sales',
          value: totalNetSales,
        },
      ];
      setRows(tempRows);
    }
  }, [
    timeframeProductData,
    timeframeStoreData,
    weeklyStoreData,
    weeklyProductData,
  ]);

  const cellStyle = {
    padding: '3px',
  };

  return (
    <div className={classes.welcomeTable}>
      <TableContainer component={Paper}>
        <Table className={classes.root} size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell
                style={cellStyle}
                padding='none'
                className='tableTitle'
                align='center'
                colSpan={2}
              >
                Top Metrics - {region}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding='none' style={cellStyle}>
                  {row.name}
                </TableCell>
                <TableCell padding='none' style={cellStyle} align='left'>
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
