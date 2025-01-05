import { TransactionData } from '@/lib/types/transactions';

export function analyzeIncome(transactions: TransactionData[]) {
  const salaryTransactions = transactions.filter(t => t.category === 'salary');
  
  return {
    stability: calculateIncomeStability(salaryTransactions),
    averageIncome: calculateAverageIncome(salaryTransactions),
    frequency: determineIncomeFrequency(salaryTransactions),
  };
}

function calculateIncomeStability(transactions: TransactionData[]): number {
  if (transactions.length < 2) return 0;
  
  const amounts = transactions.map(t => t.amount);
  const variance = calculateVariance(amounts);
  
  return Math.max(0, 1 - variance / Math.max(...amounts));
}

function calculateAverageIncome(transactions: TransactionData[]): number {
  if (transactions.length === 0) return 0;
  return transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length;
}

function determineIncomeFrequency(transactions: TransactionData[]): 'monthly' | 'biweekly' | 'irregular' {
  if (transactions.length < 2) return 'irregular';
  
  const intervals = calculateIntervals(transactions);
  const avgInterval = intervals.reduce((sum, i) => sum + i, 0) / intervals.length;
  
  if (Math.abs(avgInterval - 30) < 5) return 'monthly';
  if (Math.abs(avgInterval - 15) < 3) return 'biweekly';
  return 'irregular';
}

function calculateVariance(numbers: number[]): number {
  const mean = numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
  const squareDiffs = numbers.map(n => Math.pow(n - mean, 2));
  return squareDiffs.reduce((sum, n) => sum + n, 0) / numbers.length;
}

function calculateIntervals(transactions: TransactionData[]): number[] {
  const sortedTransactions = [...transactions].sort((a, b) => a.date.getTime() - b.date.getTime());
  const intervals = [];
  
  for (let i = 1; i < sortedTransactions.length; i++) {
    const days = (sortedTransactions[i].date.getTime() - sortedTransactions[i-1].date.getTime()) 
      / (1000 * 60 * 60 * 24);
    intervals.push(days);
  }
  
  return intervals;
}