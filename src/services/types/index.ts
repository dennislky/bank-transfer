type ResponseData = {
  code: number;
  message?: string;
  data?: any;
};

type TransferData = {
  timestamp: Date;
  from: string;
  to: string;
  description: string;
  amount: number;
  currency: string;
};
