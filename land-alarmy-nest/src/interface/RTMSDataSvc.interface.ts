export interface RTMSDataSvcSHRent_Inf {
  useOfRenewalRequestRights: string | undefined; // "갱신요구권사용"
  yearOfConstruction: string | undefined; // "건축년도"
  contractClassification: string | undefined; // "계약구분"
  term: string | undefined; // "계약기간"
  size: string | undefined; // "계약면적"
  year: number | undefined; // "년"
  beopjeongDong: string | undefined; // "법정동"
  depositAmount: string | undefined; // "보증금액"
  month: number | undefined; // "월"
  monthlyRentAmount: number | undefined; // "월세금액"
  day: number | undefined; // "일"
  previousContractDeposit: number; // "종전계약보증금"
  previousContractMonthlyRent: number; // "종전계약월세
  code: string;
}
export interface RTMSDataSvcAptRent_Inf {
  useOfRenewalRequestRights: string | undefined;
  yearOfConstruction: string | undefined;
  contractClassification: string | undefined;
  term: string | undefined;
  size: string | undefined; // <전용면적>
  year: number | undefined;
  beopjeongDong: string | undefined;
  depositAmount: string | undefined;
  apart: string | undefined; // <아파트>
  month: number | undefined;
  monthlyRentAmount: number | undefined;
  day: number | undefined;
  previousContractDeposit: number;
  previousContractMonthlyRent: number;
  jibun: number | undefined; //지번
  floor: number | undefined; //층
  code: string;
}
