import { useField, useFormikContext } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import css from "./SetProduct.module.css";

const FormikMuiSelect = ({ name, label, options }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <FormControl
      className={css.mui_select}
      fullWidth
      error={meta.touched && Boolean(meta.error)}
    >
      <InputLabel id={`${name}-label`} className={css.mui_input}>
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        value={field.value}
        onChange={(e) => setFieldValue(name, e.target.value)}
        onBlur={field.onBlur}
        label={label}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormikMuiSelect;
