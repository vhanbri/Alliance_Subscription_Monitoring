import React from "react";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { formatDate } from "../../utils";

const Export = ({ itemsToShow, columns, fileName }) => {
  const exportToExcel = (itemsToShow, columns) => {
    const filteredColumns = columns.filter(
      (column) => column.text !== "Actions"
    );
    const header = filteredColumns.map((column) => column.text);
    const ownerColumnIndex = filteredColumns.findIndex(
      (column) => column.text === "Owner"
    );

    

    const datetimeCreatedIndex = filteredColumns.findIndex(
      (column) => column.text === "Datetime Created"
    );

    const datetimeExpiryIndex = filteredColumns.findIndex(
      (column) => column.text === "Datetime Expiry"
    );
    

    const data = itemsToShow.map(
      (item) =>
        filteredColumns.map((column, index) =>
          index === ownerColumnIndex
            ? item.userName
            : index === datetimeCreatedIndex || index === datetimeExpiryIndex
            ? formatDate(item[column.dataField])
            : item[column.dataField]
        )
    );
    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const finalData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    FileSaver.saveAs(finalData, fileName);
  };
  return (
    // <div className="d-flex justify-content-end mb-4">
    <div className="mt-2">
      <button
        className="btn btn-dark "
        onClick={() => exportToExcel(itemsToShow, columns)}
      >
        <FileDownloadIcon className="mr-2" />
        Export as Excel
      </button>
    </div>
  );
};

export default Export;
