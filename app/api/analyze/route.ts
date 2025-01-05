import { NextResponse } from 'next/server';
import { TransactionData } from '@/lib/types/transactions';
import { assessRisk } from '@/lib/services/analysis/riskAssessment';
import { calculateCreditScore } from '@/lib/services/scoring';

export async function POST(request: Request) {
  try {
    const { transactions } = await request.json() as { transactions: TransactionData[] };
    
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return NextResponse.json(
        { error: 'Invalid transaction data' },
        { status: 400 }
      );
    }

    const riskAssessment = assessRisk(transactions);
    const analysis = {
      incomeStability: 0.8,  // Mock values for demonstration
      spendingPattern: 0.6,
      savingsRatio: 0.3,
      riskMetrics: {
        highRiskTransactions: 2,
        consistencyScore: 0.7,
        volatilityScore: 0.4
      }
    };
    
    const creditScore = calculateCreditScore(transactions, analysis);
    
    return NextResponse.json({
      riskAssessment,
      creditScore,
    });
  } catch (error) {
    console.error('Error analyzing transactions:', error);
    return NextResponse.json(
      { error: 'Error analyzing transactions' },
      { status: 500 }
    );
  }
}