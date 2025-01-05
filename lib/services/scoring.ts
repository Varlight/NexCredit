import { TransactionData, TransactionAnalysis } from '@/lib/types/transactions';

interface CreditScore {
  overall: number;
  components: {
    incomeStability: number;
    spendingBehavior: number;
    savingsRate: number;
    transactionRisk: number;
  };
}

const WEIGHT_FACTORS = {
  incomeStability: 0.35,
  spendingBehavior: 0.25,
  savingsRate: 0.25,
  transactionRisk: 0.15,
};

export function calculateCreditScore(
  transactions: TransactionData[],
  analysis: TransactionAnalysis
): CreditScore {
  const components = {
    incomeStability: calculateIncomeStability(transactions, analysis),
    spendingBehavior: calculateSpendingScore(analysis),
    savingsRate: calculateSavingsScore(analysis),
    transactionRisk: calculateRiskScore(analysis),
  };

  const overall = Object.entries(components).reduce(
    (score, [key, value]) => score + value * WEIGHT_FACTORS[key as keyof typeof WEIGHT_FACTORS],
    0
  );

  return {
    overall: Math.round(overall * 100),
    components,
  };
}

function calculateIncomeStability(
  transactions: TransactionData[],
  analysis: TransactionAnalysis
): number {
  return analysis.incomeStability;
}

function calculateSpendingScore(analysis: TransactionAnalysis): number {
  return (1 - analysis.spendingPattern);
}

function calculateSavingsScore(analysis: TransactionAnalysis): number {
  return analysis.savingsRatio;
}

function calculateRiskScore(analysis: TransactionAnalysis): number {
  const { highRiskTransactions, consistencyScore } = analysis.riskMetrics;
  return (consistencyScore - highRiskTransactions) / 2;
}