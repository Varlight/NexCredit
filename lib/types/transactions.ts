export interface RawTransaction {
  date: Date;
  description: string;
  amount: number;
}

export interface TransactionData extends RawTransaction {
  category: TransactionCategory;
  type: 'credit' | 'debit';
  risk_score?: number;
}

export type TransactionCategory =
  | 'salary'
  | 'shopping'
  | 'utilities'
  | 'groceries'
  | 'entertainment'
  | 'transfer'
  | 'other';

export interface TransactionAnalysis {
  incomeStability: number;
  spendingPattern: number;
  savingsRatio: number;
  riskMetrics: RiskMetrics;
}

export interface RiskMetrics {
  highRiskTransactions: number;
  consistencyScore: number;
  volatilityScore: number;
}