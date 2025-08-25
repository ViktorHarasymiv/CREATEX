import css from "./Currency.module.css";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import America from "./icons/america.png";
import Europe from "./icons/europe.png";

function Currency({ setValute, valute }) {
  const handleChange = (event) => {
    setValute(event.target.value);
  };

  return (
    <div className={css.valute_tile}>
      <FormControl sx={{ m: 1, margin: 0, padding: 0 }} size="small">
        <Select
          className={css.custom_select}
          value={valute}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          inputProps={{
            sx: {
              padding: "0",
            },
          }}
        >
          <MenuItem value={"Dollar"}>
            <img
              style={{
                width: "20px",
                height: "12px",
                marginRight: "7px",
              }}
              src={America}
              alt="America"
            />
            <span className="select_text">Eng / $</span>
          </MenuItem>
          <MenuItem value={"Euro"}>
            <img
              style={{ width: "20px", height: "12px", marginRight: "7px" }}
              src={Europe}
              alt="Europe"
            />
            <span className="select_text">Euro / €</span>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Currency;
