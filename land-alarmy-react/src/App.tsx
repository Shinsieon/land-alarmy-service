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
import axios, { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";

export type TLocalCodes = {
  label: string;
  code: string;
};
function App() {
  const [data, setData] = useState<TLocalCodes[]>([]);
  const [code, setCode] = useState("");
  const [tradeType, setTradeType] = useState({
    all: true,
    buy: false,
    rentForYear: false,
    rentForMonth: false,
  });
  const [price, setPrice] = useState([10, 10]);
  const [size, setSize] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const codeChange = (e, value) => {
    if (value && value.code) setCode(value.code);
    else setCode("");
  };
  const tradeChange = (e) => {
    setTradeType({
      ...tradeType,
      [e.target.name]: e.target.checked,
    });
  };
  const { all, buy, rentForMonth, rentForYear } = tradeType;
  const error =
    [all, buy, rentForMonth, rentForYear].filter((v) => v).length > 1;

  const priceChangeMin = (e) => {
    const [min, max] = [...price];

    if (e.target.value) {
      setPrice([parseInt(e.target.value), max]);
    } else setPrice([0, max]);
  };
  const priceChangeMax = (e) => {
    const [min, max] = [...price];
    setPrice([min, parseInt(e.target.value)]);
  };
  const sizeChange = (e) => {
    setSize(e.target.value);
  };
  const phoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const submitBtnClicked = () => {
    const sendParams = {
      code,
      tradeType,
      price,
      size,
      phoneNumber,
    };
    if (
      !code ||
      !phoneNumber ||
      (price[0] === 0 && price[1] === 0) ||
      Object.values(tradeType).filter((item) => item === true).length === 0
    ) {
      alert("값을 확인해주세요");
      return;
    }
    axios
      .post("http://localhost:4000/user/register", sendParams)
      .then((result) => {
        console.log(result);
        if (result.status === HttpStatusCode.Created) {
          alert("등록 성공");
        }
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/scrap/localCodes");
      let localCodes = [];

      if (res.status === 200) {
        const data = res.data.split("\n");
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
        <FormControl
          required
          error={code === ""}
          component="fieldset"
          variant="standard"
        >
          <FormLabel>원하는 지역을 입력해주세요</FormLabel>
          <Autocomplete
            disablePortal
            options={data}
            size="small"
            sx={{ width: "100%", mt: 1 }}
            onChange={codeChange}
            renderInput={(params) => <TextField {...params} label="시/군/구" />}
          />
        </FormControl>
        <FormControl
          required
          error={error}
          component="fieldset"
          variant="standard"
        >
          <FormLabel component="legend">
            거래 유형 {error ? "* 한 가지 유형만 선택해주세요" : ""}
          </FormLabel>

          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox checked={all} onChange={tradeChange} name="all" />
              }
              label="전체"
            />
            <FormControlLabel
              control={
                <Checkbox checked={buy} onChange={tradeChange} name="buy" />
              }
              label="매매"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rentForYear}
                  onChange={tradeChange}
                  name="rentForYear"
                />
              }
              label="전세"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rentForMonth}
                  onChange={tradeChange}
                  name="rentForMonth"
                />
              }
              label="월세"
            />
          </FormGroup>
        </FormControl>
        <FormControl
          required
          error={price[1] === 0}
          component="fieldset"
          variant="standard"
        >
          <FormLabel>가격대</FormLabel>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <TextField
              id="outlined-basic"
              label="최저가"
              size="small"
              variant="outlined"
              value={price[0]}
              onChange={priceChangeMin}
              sx={{ width: "150px" }}
            />
            <Typography variant="body2"> 천만원 </Typography>
            <Typography> ~ </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              label="최대가"
              variant="outlined"
              value={price[1]}
              onChange={priceChangeMax}
              sx={{ width: "150px" }}
            />
            <Typography> 천만원 </Typography>
          </FormGroup>
        </FormControl>
        <FormLabel>평수</FormLabel>

        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={size}
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

        <FormControl
          required
          error={phoneNumber === ""}
          component="fieldset"
          variant="standard"
        >
          <FormLabel required>휴대전화 번호</FormLabel>
          <TextField
            size="small"
            label="Phone number"
            variant="outlined"
            type="tel"
            value={phoneNumber}
            onChange={phoneChange}
          />
        </FormControl>
        <Button
          variant="contained"
          size="large"
          sx={{ margin: "25px 0" }}
          onClick={submitBtnClicked}
          type="submit"
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}

export default App;
