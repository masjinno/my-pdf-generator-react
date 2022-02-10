import React, {useState} from 'react';

const GET_CSV_HEADER_ITEMS_URL = "https://19p32enh5g.execute-api.us-west-2.amazonaws.com/dev";

const CsvInput = (props) => {
  const uploadFile = (event) => {
    if (event.target.files.length == 0) {
      props.setCsvData(null);
      return;
    }

    // ファイル読み込み
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // CSVファイル内容を親コンポーネントに返却
      props.setCsvData(reader.result);

      // CSVヘッダ項目一覧を親コンポーネントに返却
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let reqBody = JSON.stringify({ data: reader.result });
      let requestOptions = {
        method: 'PUT',
        body: reqBody,
        headers: myHeaders
      };
      console.log("GetCsvHeaderItems calling");
      fetch(GET_CSV_HEADER_ITEMS_URL, requestOptions)
        .then(response => response.json())
        .then(responseJson => props.setCsvHeaderItems(responseJson))
        .catch(error => console.log('error', error));
    }
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
