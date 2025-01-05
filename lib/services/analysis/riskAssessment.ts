import { TransactionData } from '@/lib/types/transactions';
import { analyzeIncome } from './incomeAnalysis';
import { analyzeSpending } from './spendingAnalysis';

export interface RiskAssessment {
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  factors: RiskFactor[];
}

interface RiskFactor {
  name: string;
  impact: number;
  description: string;
}

export function assessRisk(transactions: TransactionData[]): RiskAssessment {
  const incomeAnalysis = analyzeIncome(transactions);
  const spendingAnalysis = analyzeSpending(transactions);
  
  const factors: RiskFactor[] = [
    {
      name: 'Income Stability',
      impact: calculateIncomeImpact(incomeAnalysis),
      description: getIncomeDescription(incomeAnalysis),
    },
    {
      name: 'Spending Pattern',
      impact: calculateSpendingImpact(spendingAnalysis),
      description: getSpendingDescription(spendingAnalysis),
    },
  ];
  
  const score = calculateOverallScore(factors);
  
  return {
    score,
    riskLevel: getRiskLevel(score),
    factors,
  };
}

function calculateIncomeImpact(analysis: ReturnType<typeof analyzeIncome>): number {
  return analysis.stability * 0.7 + (analysis.frequency === 'monthly' ? 0.3 : 0);
}

function calculateSpendingImpact(analysis: ReturnType<typeof analyzeSpending>): number {
  return 1 - analysis.riskMetrics.highRiskRatio;
}

function calculateOverallScore(factors: RiskFactor[]): number {
  return factors.reduce((score, factor) => score + factor.impact, 0) / factors.length;
}

function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 0.7) return 'low';
  if (score >= 0.4) return 'medium';
  return 'high';
}

function getIncomeDescription(analysis: ReturnType<typeof analyzeIncome>): string {
  if (analysis.stability > 0.8) return 'Very stable income pattern';
  if (analysis.stability > 0.5) return 'Moderately stable income';
  return 'Irregular income pattern';
}

function getSpendingDescription(analysis: ReturnType<typeof analyzeSpending>): string {
  const { highRiskRatio } = analysis.riskMetrics;
  if (highRiskRatio < 0.1) return 'Conservative spending pattern';
  if (highRiskRatio < 0.3) return 'Balanced spending behavior';
  return 'High-risk spending pattern';
}