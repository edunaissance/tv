import axios from "axios";
import to from "await-to-js";

const finnhub = require('finnhub'); //changed

const api_key = finnhub.ApiClient.instance.authentications['api_key']; //changed
api_key.apiKey = "ceo33oiad3icu1038ab0ceo33oiad3icu1038abg" //changed
const finnhubClient = new finnhub.DefaultApi() //changed

export interface IApiSymbol {
  "amount-precision": number;
  "api-trading": string;
  "base-currency": string;
  "buy-market-max-order-value": number;
  "leverage-ratio": number;
  "limit-order-max-order-amt": number;
  "limit-order-min-order-amt": number;
  "max-order-amt": number;
  "min-order-amt": number;
  "min-order-value": number;
  "price-precision": number;
  "quote-currency": string;
  "sell-market-max-order-amt": number;
  "sell-market-min-order-amt": number;
  state: string;
  "super-margin-leverage-ratio": number;
  symbol: string;
  "symbol-partition": string;
  "value-precision": number;
}

export interface IApiKLine {
  id: number; //	调整为新加坡时间的时间戳，单位秒，并以此作为此K线柱的id
  amount: number; // 	以基础币种计量的交易量
  count: number; //	交易次数
  open: number; //	本阶段开盘价
  close: number; // 本阶段收盘价
  low: number; //	本阶段最低价
  high: number; //	本阶段最高价
  vol: number; //	以报价币种计量的交易量
}

export async function fetchSymbols() {
  const [err, res] = await to(
    axios.get<{ data: IApiSymbol[] }>(finnhubClient.stockSymbols("US", (error, data, response) => { //changed
      console.log(data) // changed
    }))  //changed
  );
  if (err) return;
  return res.data?.data;
}

export async function fetchKLine(symbol: string, period: string, size = 2000) {
  const [err, res] = await to(
    axios.get<{ data: IApiKLine[] }>(finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, function (error: any, data: any): void { //changed
        console.log(data); // changed
      })) // changed
    );
  if (err) return;
  return res.data?.data;
}
