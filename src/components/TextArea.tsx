import { TextField, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SectionType } from "./types.d";

interface Props {
  type: SectionType;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const lightGrey = grey[300];

const TextArea = ({ loading, type, value, onChange }: Props) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <Paper elevation={16} sx={{ borderRadius: "10px" }}>
      <TextField
        placeholder={
          type === SectionType.From
            ? "Ingresar texto"
            : loading
            ? "Traduciendo..."
            : "Traducción"
        }
        multiline
        rows={14}
        sx={{
          borderRadius: "10px",
          width: "100%",
          ...(type === SectionType.To && { bgcolor: lightGrey }),
          "::placeholder": {
            color: "black",
          },
        }}
        disabled={type === SectionType.To}
        autoFocus={type === SectionType.From}
        onChange={handleChange}
        value={value}
      />
    </Paper>
  );
};

export default TextArea;
