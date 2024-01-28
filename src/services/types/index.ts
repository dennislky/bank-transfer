type ResponseData = {
  code: number;
  message?: string;
  data?: TransferData | AccountOptionData[] | CurrencyOptionData[];
};

type TransferData = {
  timestamp: Date;
  from: string;
  to: string;
  description?: string;
  amount: number;
  currency: string;
};

type AccountOptionData = {
  label: string;
  value: string;
  availableBalance: number;
};

type CurrencyOptionData = {
  label: string;
  value: string;
};