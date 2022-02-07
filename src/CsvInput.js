import React, {useState} from 'react';

const CsvInput = () => {
  const uploadFile = (event) => {
    console.log("uploadFile");
    if (event.target.files.length == 0) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      return setCsvData(reader.result);
    }
    reader.readAsText(file);
  }

  const [csvData, setCsvData] = useState(null);

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
