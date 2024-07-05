// Import ServerRespond from DataStreamer
import { ServerRespond } from './DataStreamer';

// Define the Row interface
export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  timestamp: Date;
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | undefined;
}

// Define the DataManipulator class
export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    // Extract prices and calculate average prices for ABC and DEF
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;

    // Calculate the ratio of prices
    const ratio = priceABC / priceDEF;

    // Define upper and lower bounds
    const upper_bound = 1 + 0.05;
    const lower_bound = 1 - 0.05;

    // Determine the latest timestamp
    const timestamp = serverResponds[0].timestamp > serverResponds[1].timestamp
      ? serverResponds[0].timestamp
      : serverResponds[1].timestamp;

    // Return the Row object with calculated values
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp,
      upper_bound,
      lower_bound,
      trigger_alert: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined,
    };
  }
}

