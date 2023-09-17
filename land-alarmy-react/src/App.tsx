import "./App.css";
import {
  Button,
  FormControl,
  FormLabel,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
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
  const sizeChange = () => {};
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
        <FormLabel>거래방식</FormLabel>
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="전체"
          />
          <FormControlLabel control={<Checkbox />} label="매매" />
          <FormControlLabel control={<Checkbox />} label="전세" />
          <FormControlLabel control={<Checkbox />} label="월세" />
        </FormGroup>
        <FormLabel>가격대</FormLabel>
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            size="small"
            id="outlined-basic"
            label="최저가"
            variant="outlined"
          />
          ~
          <TextField
            size="small"
            id="outlined-basic"
            label="최저가"
            variant="outlined"
          />
        </FormGroup>
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={0}
            label="Age"
            onChange={sizeChange}
          >
            <MenuItem value={0}>~10평</MenuItem>
            <MenuItem value={1}>10평대</MenuItem>
            <MenuItem value={2}>20평대</MenuItem>
            <MenuItem value={3}>30평대</MenuItem>
            <MenuItem value={4}>40평대</MenuItem>
            <MenuItem value={5}>50평대</MenuItem>
            <MenuItem value={6}>60평대</MenuItem>
            <MenuItem value={7}>70평~</MenuItem>
          </Select>
        </FormGroup>
        <Button>Submit</Button>
      </FormControl>
    </div>
  );
}

export default App;
