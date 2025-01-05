import { RawTransaction, TransactionData, TransactionCategory } from '@/lib/types/transactions';

const categoryRules: Record<string, TransactionCategory> = {
  'SALARY': 'salary',
  'AMAZON': 'shopping',
  'ELECTRICITY': 'utilities',
  'GROCERY': 'groceries',
};

export function categorizeTransaction(raw: RawTransaction): TransactionData {
  const category = determineCategory(raw.description);
  const type = raw.amount >= 0 ? 'credit' : 'debit';
  
  return {
    ...raw,
    category,
    type,
    risk_score: calculateTransactionRisk(raw, category),
  };
}

function determineCategory(description: string): TransactionCategory {
  const upperDesc = description.toUpperCase();
  
  for (const [keyword, category] of Object.entries(categoryRules)) {
    if (upperDesc.includes(keyword)) {
      return category;
    }
  }
  
  return 'other';
}

function calculateTransactionRisk(
  transaction: RawTransaction,
  category: TransactionCategory
): number {
  let risk = 0;
  
  // Higher risk for large transactions
  if (Math.abs(transaction.amount) > 10000) risk += 0.3;
  
  // Lower risk for salary credits
  if (category === 'salary') risk -= 0.2;
  
  // Higher risk for non-essential spending
  if (category === 'entertainment' || category === 'shopping') risk += 0.1;
  
  return Math.max(0, Math.min(1, risk));
}