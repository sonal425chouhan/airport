import React, { FC } from 'react';

//material libs
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface MaterialAutocompleteProps {
  id: string;
  options: any[];
  label: string;
  onChange: (event: React.SyntheticEvent, value: any) => void;
  getOptionLabel: (params: any) => string;
}

const MaterialAutocomplete: FC<MaterialAutocompleteProps> = ({ id, options, onChange, getOptionLabel, label }) => {
  return (
    <Autocomplete
      id={id}
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: {id}, // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default MaterialAutocomplete;

