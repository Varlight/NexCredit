import { TransactionData, RawTransaction } from '@/lib/types/transactions';
import { categorizeTransaction } from '@/lib/utils/transactionRules';

export async function processStatement(file: File): Promise<TransactionData[]> {
  const arrayBuffer = await file.arrayBuffer();
  const text = await extractTextFromPDF(arrayBuffer);
  const rawTransactions = extractTransactions(text);
  
  return rawTransactions.map(categorizeTransaction);
}

async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
  // TODO: Implement actual PDF parsing
  // For now, return mock data for development
  return mockPDFContent;
}

function extractTransactions(text: string): RawTransaction[] {
  const transactionPattern = /(\d{2}-\d{2}-\d{4})\s+([^0-9]+)\s+([-]?\d+(?:,\d{3})*(?:\.\d{2})?)/g;
  const matches = [...text.matchAll(transactionPattern)];
  
  return matches.map(match => ({
    date: new Date(match[1]),
    description: match[2].trim(),
    amount: parseFloat(match[3].replace(/,/g, '')),
  }));
}

// Mock data for development
const mockPDFContent = `
01-03-2024 SALARY CREDIT 50000.00
05-03-2024 AMAZON SHOPPING -2500.00
10-03-2024 ELECTRICITY BILL -1500.00
15-03-2024 GROCERY STORE -3000.00
`;