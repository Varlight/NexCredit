import { NextResponse } from 'next/server';
import { processStatement } from '@/lib/services/pdfProcessing';
import { validatePDF } from '@/lib/utils/fileValidation';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const validationError = validatePDF(file);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    const transactions = await processStatement(file);
    
    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Error processing file' },
      { status: 500 }
    );
  }
}