export interface DataPoint {
  close: number;
}

export const simpleMovingAverage = (data: DataPoint[], period: number): number[] => {
  const sma: number[] = [];
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const sum = slice.reduce((acc, curr) => acc + curr.close, 0);
    sma.push(sum / period);
  }
  return sma;
};

export const exponentialMovingAverage = (data: DataPoint[], period: number): number[] => {
  const k = 2 / (period + 1);
  const ema: number[] = [data[0].close];
  for (let i = 1; i < data.length; i++) {
    const close = data[i].close;
    ema.push(close * k + ema[i - 1] * (1 - k));
  }
  return ema;
};

export const weightedMovingAverage = (data: DataPoint[], period: number): number[] => {
  const wma: number[] = [];
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const weightSum = (period * (period + 1)) / 2;
    const weightedSum = slice.reduce((acc, curr, index) => acc + curr.close * (index + 1), 0);
    wma.push(weightedSum / weightSum);
  }
  return wma;
};