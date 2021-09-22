import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useAPI } from '../../context/apiContext';

export default function TimeframeSelect() {
  const { allBrandTimeframes, setCurrentTimeframe, currentTimeframe } =
    useAPI();

  const handleChangeTimeframe = (event) => {
    event.preventDefault();
    setCurrentTimeframe(event.target.value);
  };

  return (
    <>
      <FormControl
        id='timeframeMenu'
        variant='standard'
        // className={classes.formControl}
      >
        <InputLabel>Timeframe</InputLabel>
        <Select
          style={{ width: '130px' }}
          labelId='timeframeSelect'
          id='timeframeSelect'
          value={currentTimeframe || ''}
          onChange={handleChangeTimeframe}
        >
          {allBrandTimeframes.length
            ? allBrandTimeframes.map((timeframe, index) => (
                <MenuItem key={index} value={timeframe}>
                  {timeframe}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </>
  );
}
