import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useAPI } from '../../context/apiContext';

export default function RegionSelect() {
  const { setRegion, currentBrandRegions, region } = useAPI();

  const handleChangeRegion = (event) => {
    event.preventDefault();
    setRegion(event.target.value);
  };

  return (
    <>
      <FormControl
        id='regionSelect'
        style={{ marginRight: '30px' }}
        variant='standard'
        // className={classes.formControl}
      >
        <InputLabel>Region</InputLabel>
        <Select
          style={{ width: '130px' }}
          labelId='regionLabel'
          id='regionSelect'
          value={region || ''}
          onChange={handleChangeRegion}
        >
          <MenuItem value={'all regions'}>All Regions</MenuItem>
          {currentBrandRegions.length
            ? currentBrandRegions.map((reg, index) => (
                <MenuItem key={index} value={reg}>
                  {reg}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </>
  );
}
