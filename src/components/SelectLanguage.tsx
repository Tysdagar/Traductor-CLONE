import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from "./constants";
import { type FromLanguage, type ToLanguage, SectionType } from "./types.d";
import { SelectChangeEvent } from "@mui/material/Select";

type Props =
  | {
      type: SectionType.From;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | {
      type: SectionType.To;
      value: ToLanguage;
      onChange: (language: ToLanguage) => void;
    };

const SelectLanguage = ({ value, type, onChange }: Props) => {
  function handleChange(event: SelectChangeEvent) {
    onChange(event.target.value as ToLanguage);
  }

  return (
    <>
      <Typography variant="h5" sx={{ color: "white" }}>
        Selecciona un idioma
      </Typography>
      <Paper elevation={16}>
        <FormControl fullWidth>
          <Select value={value} onChange={(e) => handleChange(e)}>
            {type === SectionType.From && (
              <MenuItem value={AUTO_LANGUAGE}>Detectar Idioma</MenuItem>
            )}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, idiom]) => (
              <MenuItem key={key} value={key}>
                {idiom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </>
  );
};

export default SelectLanguage;
