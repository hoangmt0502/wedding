import { Button, ButtonProps } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import locales from "../../locales";
import { UploadFile } from "@mui/icons-material";

type TProps = {
  onImport: (file: File) => void;
} & ButtonProps

const ImportExcelButton = ({
  onImport,
  ...other
} : TProps) => {
  const {common: t_common} = locales['vi'];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    onImport(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        onChange={handleImport}
        style={{ display: "none" }}
      />
      <Button startIcon={<UploadFile />} variant="outlined" color="secondary" onClick={triggerFileSelect} {...other}>
        {t_common.dialogImportExcel}
      </Button>
    </>
  );
};

export default ImportExcelButton;
