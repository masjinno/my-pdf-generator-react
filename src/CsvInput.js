import React, {useState} from 'react';

const CsvInput = (props) => {
  const uploadFile = (event) => {
    if (event.target.files.length == 0) {
      props.setCsvData(null);
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => props.setCsvData(reader.result);
    reader.readAsText(file);
  }

  return (
    <p>
      <label>
        CSVファイル
        <input type="file" id="csv_file" accept="text/csv" onChange={uploadFile}/>
      </label>
    </p>
  );
}

export default CsvInput;
