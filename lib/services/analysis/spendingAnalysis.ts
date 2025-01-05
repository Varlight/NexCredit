import { TransactionData, TransactionCategory } from '@/lib/types/transactions';

export function analyzeSpending(transactions: TransactionData[]) {
  const expenses = transactions.filter(t => t.type === 'debit');
  
  return {
    categoryBreakdown: calculateCategoryBreakdown(expenses),
    monthlySpending: calculateMonthlySpending(expenses),
    riskMetrics: calculateRiskMetrics(expenses),
  };
}

function calculateCategoryBreakdown(transactions: TransactionData[]) {
  const breakdown: Record<TransactionCategory, number> = {
    shopping: 0,
    utilities: 0,
    groceries: 0,
    entertainment: 0,
    transfer: 0,
    salary: 0,
    other: 0,
  };
  
  transactions.forEach(t => {
    breakdown[t.category] += Math.abs(t.amount);
  });
  
  return breakdown;
}

function calculateMonthlySpending(transactions: TransactionData[]) {
  const monthlyData: Record<string, number> = {};
  
  transactions.forEach(t => {
    const monthKey = `${t.date.getFullYear()}-${t.date.getMonth() + 1}`;
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + Math.abs(t.amount);
  });
  
  return monthlyData;
}

function calculateRiskMetrics(transactions: TransactionData[]) {
  const highRiskTransactions = transactions.filter(t => (t.risk_score || 0) > 0.7).length;
  const totalTransactions = transactions.length;
  
  return {
    highRiskRatio: highRiskTransactions / totalTransactions,
    averageTransactionSize: calculateAverageTransactionSize(transactions),
    volatility: calculateSpendingVolatility(transactions),
  };
}

function calculateAverageTransactionSize(transactions: TransactionData[]): number {
  if (transactions.length === 0) return 0;
  return transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / transactions.length;
}

function calculateSpendingVolatility(transactions: TransactionData[]): number {
  if (transactions.length < 2) return 0;
  
  const amounts = transactions.map(t => Math.abs(t.amount));
  const mean = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
  const variance = amounts.reduce((sum, a) => sum + Math.pow(a - mean, 2), 0) / amounts.length;
  
  return Math.sqrt(variance) / mean;
}