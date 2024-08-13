import React, { ChangeEvent } from "react";
import * as XLSX from "xlsx";
import ButtonCustom from "../Button/ButtonCustom";
import { ImportOutlined } from "@ant-design/icons";

const ExcelReader: React.FC = () => {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          console.log(jsonData);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{ display: "none" }}
        ref={(fileInput) => fileInput && fileInput.setAttribute("multiple", "")}
      />
      <ButtonCustom
        colorButton="#47b14b"
        style={{
          color: "white",
          height: 36,
        }}
        icon={<ImportOutlined />}
        text={"Import excel"}
        onClick={() => {
          const fileInput = document.querySelector(
            "input[type=file]"
          ) as HTMLInputElement;
          fileInput.click();
        }}
      />
    </div>
  );
};

export default ExcelReader;
