import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useAPI } from '../../context/apiContext';

export default function BrandSelect() {
  const { userBrands, brand, setBrand } = useAPI();

  const handleChangeBrand = (event) => {
    event.preventDefault();
    setBrand(event.target.value);
  };

  return (
    <>
      <FormControl
        id='brandMenu'
        style={{ marginRight: '30px' }}
        variant='standard'
        // className={classes.formControl}
      >
        <InputLabel>Brand</InputLabel>
        <Select
          style={{ width: '130px' }}
          labelId='brandLabel'
          id='brandSelect'
          value={brand || ''}
          onChange={handleChangeBrand}
        >
          {userBrands.length
            ? userBrands.map((brand, index) => (
                <MenuItem key={index} value={brand}>
                  {brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </>
  );
}
