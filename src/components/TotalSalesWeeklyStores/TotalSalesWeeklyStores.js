import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAPI } from '../../context/apiContext';
import './weeklySalesStore.css';

const TotalSalesWeeklyStores = () => {
  const [data, setData] = useState([]);
  const { timeframeStoreData } = useAPI();

  useEffect(() => {
    if (timeframeStoreData) {
      const weeklySalesByStore = [];

      for (let i = 0; i < timeframeStoreData.length; i++) {
        let week1 = 0;
        let week2 = 0;
        let week3 = 0;
        let week4 = 0;
        let storeName = timeframeStoreData[i].name;
        for (const sku in timeframeStoreData[i].sales) {
          week1 = week1 + timeframeStoreData[i].sales[sku].week1;
          week2 = week2 + timeframeStoreData[i].sales[sku].week2;
          week3 = week3 + timeframeStoreData[i].sales[sku].week3;
          week4 = week4 + timeframeStoreData[i].sales[sku].week4;
        }
        let obj = {};
        obj['name'] = storeName;
        obj['week1'] = week1;
        obj['week2'] = week2;
        obj['week3'] = week3;
        obj['week4'] = week4;
        weeklySalesByStore.push(obj);
      }
      setData(weeklySalesByStore);
    }
  }, [timeframeStoreData]);

  return (
    <>
      <TableContainer id='weeklySalesStore' component={Paper}>
        <Table className='tableBody' size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell className='tableTitle' align='center' colSpan={8}>
                % Change x Store - Last 4 Weeks
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='tableHeaders'>Store</TableCell>
              <TableCell className='tableHeaders' align='left'>
                Last Week
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                % Change
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                Week 2
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                % Change
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                Week 3
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                % Change
              </TableCell>
              <TableCell className='tableHeaders' align='left'>
                Week 4
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
                  <TableCell align='left'>{item.week1}</TableCell>
                  <TableCell align='left'>
                    {(((item.week1 - item.week2) / item.week2) * 100).toFixed(
                      1
                    )}
                    %
                  </TableCell>
                  <TableCell align='left'>{item.week2}</TableCell>
                  <TableCell align='left'>
                    {(((item.week2 - item.week3) / item.week3) * 100).toFixed(
                      1
                    )}
                    %
                  </TableCell>
                  <TableCell align='left'>{item.week3}</TableCell>
                  <TableCell align='left'>
                    {(((item.week3 - item.week4) / item.week4) * 100).toFixed(
                      1
                    )}
                    %
                  </TableCell>
                  <TableCell align='left'>{item.week4}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TotalSalesWeeklyStores;
