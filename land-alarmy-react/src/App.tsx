import "./App.css";
import {
  Button,
  FormControl,
  FormLabel,
  TextField,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export type TLocalCodes = {
  label: string;
  code: string;
};
function App() {
  console.log("hello");
  const [data, setData] = useState<TLocalCodes[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/scrap/localCodes");
      let localCodes = [];

      if (res.status === 200) {
        console.log(res.data);
        const data = res.data.split("\n");
        console.log("데이터 개수: ", data.length);
        for (let i = 0; i < data.length; i++) {
          const codeItem = data[i].split(" ");
          if (codeItem.length === 4) {
            const [code_, do_, si_, isExist] = codeItem;
            localCodes.push({ code: code_, label: do_ + " " + si_ });
          } else if (codeItem.length === 5) {
            const [code_, do_, si_, gu_, isExist] = codeItem;
            localCodes.push({
              code: code_,
              label: do_ + " " + si_ + " " + gu_,
            });
          }
        }
      }
      console.log(localCodes);
      return localCodes;
    };

    fetchData().then((res) => setData(res));
  }, []);
  return (
    <div className="App">
      <FormControl>
        <FormLabel>원하는 지역을 입력해주세요</FormLabel>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="시/군/구" />}
        />
        <TextField></TextField>
        <Button>Submit</Button>
      </FormControl>
    </div>
  );
}

export default App;
