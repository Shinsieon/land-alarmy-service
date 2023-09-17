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
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export type TLocalCodes = {
  label: string;
  code: string;
};
function App() {
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
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <FormControl
        sx={{
          margin: "50px 0",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "500px",
        }}
      >
        <Typography variant="h4">매물 알리미 서비스 등록</Typography>

        <FormLabel>
          <b>원하는 지역을 입력해주세요</b>
        </FormLabel>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data}
          size="small"
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="시/군/구" />}
        />
        <FormLabel>
          <b>거래방식</b>
        </FormLabel>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="전체"
          />
          <FormControlLabel control={<Checkbox />} label="매매" />
          <FormControlLabel control={<Checkbox />} label="전세" />
          <FormControlLabel control={<Checkbox />} label="월세" />
        </Box>
        <FormLabel>
          <b>가격대</b>
        </FormLabel>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TextField
            size="small"
            id="outlined-basic"
            label="최저가"
            variant="outlined"
          />
          <Typography> ~ </Typography>
          <TextField
            size="small"
            id="outlined-basic"
            label="최대가"
            variant="outlined"
          />
        </FormGroup>
        <FormLabel>
          <b>평수</b>
        </FormLabel>

        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={0}
            fullWidth={true}
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
        <FormLabel>
          <b>휴대전화 번호</b>
        </FormLabel>
        <TextField
          size="small"
          id="outlined-basic"
          label="Phone number"
          variant="outlined"
          type="tel"
        />
        <Button variant="contained" size="large" sx={{ margin: "25px 0" }}>
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}

export default App;
