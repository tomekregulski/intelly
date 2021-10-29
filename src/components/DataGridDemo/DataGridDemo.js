import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useAPI } from '../../context/apiContext';

const columns = [
  { field: 'product', headerName: 'Product', width: 220 },
  {
    field: 'sales1w',
    headerName: 'Sales',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'revenue1w',
    headerName: 'Revenue',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'sales4w',
    headerName: 'Sales',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'revenue4w',
    headerName: 'Revenue',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'sales12w',
    headerName: 'Sales',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'revenue12w',
    headerName: 'Revenue',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'sales52w',
    headerName: 'Sales',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'revenue52w',
    headerName: 'Revenue',
    type: 'number',
    width: 150,
    editable: true,
  },
];

export default function DataGridDemo() {
  const [rows, setRows] = useState([]);
  const { timeframeProductData } = useAPI();

  useEffect(() => {
    if (timeframeProductData) {
      const rowsData = timeframeProductData.forEach((item, index) => ({
        id: index,
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
      setRows(rowsData);
    }
  }, [timeframeProductData]);

  if (rows.length) {
    return (
      <div>
        <DataGrid
          autoHeight={true}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    );
  } else {
    return null;
  }
}
