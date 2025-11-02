const pdfParse = require('pdf-parse');
const fs = require('fs');
const { detectIssuer } = require('./issuerDetection');

/**
 * Parse PDF and extract credit card statement data
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<Object>} - Parsed statement data
 */
const parsePDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    if (!text || text.trim().length === 0) {
      throw new Error('PDF appears to be scanned or empty. OCR support needed.');
    }

    // Detect issuer
    const issuer = detectIssuer(text);

    // Parse based on issuer
    let parsedData;
    switch (issuer) {
      case 'HDFC Bank':
        parsedData = parseHDFC(text);
        break;
      case 'ICICI Bank':
        parsedData = parseICICI(text);
        break;
      case 'SBI':
        parsedData = parseSBI(text);
        break;
      case 'Axis Bank':
        parsedData = parseAxis(text);
        break;
      case 'Citibank':
        parsedData = parseCitibank(text);
        break;
      default:
        parsedData = parseGeneric(text);
    }

    parsedData.issuer = issuer;
    parsedData.extractedText = text;

    return parsedData;
  } catch (error) {
    throw new Error(`PDF parsing failed: ${error.message}`);
  }
};

/**
 * Parse HDFC Bank statement
 */
const parseHDFC = (text) => {
  const data = {
    cardLast4: extractCardLast4(text, ['Card ending', 'Card No', 'Card Number', 'Card ending in']),
    billingPeriod: extractBillingPeriod(text, [
      /Statement\s+Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
      /Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
      /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i
    ]),
    dueDate: extractDueDate(text, ['Payment Due Date', 'Due Date', 'Pay by']),
    totalBalance: extractBalance(text, ['Total Amount Due', 'Total Due', 'Outstanding', 'New Balance', 'Total Balance']),
    transactions: extractTransactions(text)
  };

  return data;
};

/**
 * Parse ICICI Bank statement
 */
const parseICICI = (text) => {
  const data = {
    cardLast4: extractCardLast4(text, ['Card ending', 'Card No', 'Card Number', 'XXXX XXXX XXXX']),
    billingPeriod: extractBillingPeriod(text, [
      /Statement\s+Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
      /Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i
    ]),
    dueDate: extractDueDate(text, ['Payment Due Date', 'Due Date', 'Due by']),
    totalBalance: extractBalance(text, ['Total Amount Due', 'Total Outstanding', 'Amount Due', 'New Balance']),
    transactions: extractTransactions(text)
  };

  return data;
};

/**
 * Parse SBI statement
 */
const parseSBI = (text) => {
  const data = {
    cardLast4: extractCardLast4(text, ['Card ending', 'Card No', 'Card Number', 'Card']),
    billingPeriod: extractBillingPeriod(text, [
      /Statement\s+Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
      /Billing\s+Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i
    ]),
    dueDate: extractDueDate(text, ['Payment Due Date', 'Due Date', 'Pay by']),
    totalBalance: extractBalance(text, ['Total Amount Due', 'Outstanding', 'Total Due', 'New Balance']),
    transactions: extractTransactions(text)
  };

  return data;
};

/**
 * Parse Axis Bank statement
 */
const parseAxis = (text) => {
  const data = {
    cardLast4: extractCardLast4(text, ['Card ending', 'Card No', 'Card Number', 'XXXX XXXX XXXX']),
    billingPeriod: extractBillingPeriod(text, [
      /Statement\s+Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
      /Billing\s+Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i
    ]),
    dueDate: extractDueDate(text, ['Payment Due Date', 'Due Date', 'Due by']),
    totalBalance: extractBalance(text, ['Total Amount Due', 'Outstanding', 'Total Due', 'New Balance']),
    transactions: extractTransactions(text)
  };

  return data;
};

/**
 * Parse Citibank statement
 */
const parseCitibank = (text) => {
  const data = {
    cardLast4: extractCardLast4(text, ['Card ending', 'Card No', 'Card Number', 'XXXX XXXX XXXX']),
    billingPeriod: extractBillingPeriod(text, [
      /Statement\s+Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
      /Billing\s+Period[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i
    ]),
    dueDate: extractDueDate(text, ['Payment Due Date', 'Due Date', 'Due by']),
    totalBalance: extractBalance(text, ['Total Amount Due', 'Outstanding', 'Total Due', 'New Balance']),
    transactions: extractTransactions(text)
  };

  return data;
};

/**
 * Generic parser as fallback
 */
const parseGeneric = (text) => {
  const data = {
    cardLast4: extractCardLast4(text, ['Card ending', 'Card No', 'Card Number', 'XXXX']),
    billingPeriod: extractBillingPeriod(text, [
      /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i
    ]),
    dueDate: extractDueDate(text, ['Due Date', 'Payment Due', 'Pay by']),
    totalBalance: extractBalance(text, ['Total', 'Balance', 'Due', 'Outstanding']),
    transactions: extractTransactions(text)
  };

  return data;
};

/**
 * Extract card last 4 digits
 */
const extractCardLast4 = (text, keywords) => {
  for (const keyword of keywords) {
    const regex = new RegExp(`${keyword}[:\s]*([\\dX]{4})`, 'i');
    const match = text.match(regex);
    if (match) {
      return match[1].replace(/[X\s]/g, '');
    }
  }

  // Try to find 4 digits at the end of card number patterns
  const cardPattern = /(\d{4})\s*(?:$|\n|Card|Statement)/i;
  const cardMatch = text.match(cardPattern);
  if (cardMatch) {
    return cardMatch[1];
  }

  return '0000';
};

/**
 * Extract billing period
 */
const extractBillingPeriod = (text, patterns) => {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1] && match[2]) {
      return {
        from: normalizeDate(match[1]),
        to: normalizeDate(match[2])
      };
    }
  }

  // Fallback: try to find date ranges
  const dateRangePattern = /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+to\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i;
  const rangeMatch = text.match(dateRangePattern);
  if (rangeMatch) {
    return {
      from: normalizeDate(rangeMatch[1]),
      to: normalizeDate(rangeMatch[2])
    };
  }

  return {
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  };
};

/**
 * Extract due date
 */
const extractDueDate = (text, keywords) => {
  for (const keyword of keywords) {
    const regex = new RegExp(`${keyword}[:\s]+(\\d{1,2}[-/]\\d{1,2}[-/]\\d{2,4})`, 'i');
    const match = text.match(regex);
    if (match) {
      return normalizeDate(match[1]);
    }
  }

  return new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
};

/**
 * Extract total balance
 */
const extractBalance = (text, keywords) => {
  for (const keyword of keywords) {
    const regex = new RegExp(`${keyword}[:\s]*[₹Rs]?[\\s]*([\\d,]+(?:\\.[\\d]{2})?)`, 'i');
    const match = text.match(regex);
    if (match) {
      return parseFloat(match[1].replace(/,/g, ''));
    }
  }

  // Fallback: find currency amounts
  const amountPattern = /[₹Rs]?\s*([\d,]+(?:\.\d{2})?)/g;
  const amounts = [...text.matchAll(amountPattern)];
  if (amounts.length > 0) {
    const lastAmount = amounts[amounts.length - 1][1];
    return parseFloat(lastAmount.replace(/,/g, ''));
  }

  return 0.0;
};

/**
 * Extract transactions
 */
const extractTransactions = (text) => {
  const transactions = [];
  const lines = text.split('\n');

  // Common patterns for transaction lines
  const transactionPatterns = [
    /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\s+(.+?)\s+[₹Rs]?\s*([\d,]+(?:\.\d{2})?)/i,
    /(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(.+?)\s+([\d,]+(?:\.\d{2})?)/i,
    /(\d{2}-\d{2}-\d{4})\s+(.+?)\s+([\d,]+(?:\.\d{2})?)/i
  ];

  for (const line of lines) {
    if (line.trim().length < 10) continue;

    for (const pattern of transactionPatterns) {
      const match = line.match(pattern);
      if (match && match[1] && match[2] && match[3]) {
        const description = match[2].trim();
        
        // Skip header-like lines
        if (description.match(/Date|Description|Amount|Transaction/i)) {
          continue;
        }

        transactions.push({
          date: normalizeDate(match[1]),
          description: description.substring(0, 100), // Limit description length
          amount: parseFloat(match[3].replace(/,/g, ''))
        });
        break;
      }
    }
  }

  // Limit to first 50 transactions if too many
  return transactions.slice(0, 50);
};

/**
 * Normalize date format to YYYY-MM-DD
 */
const normalizeDate = (dateStr) => {
  if (!dateStr) return new Date().toISOString().split('T')[0];

  // Handle different date formats
  let parts;
  if (dateStr.includes('-')) {
    parts = dateStr.split('-');
  } else if (dateStr.includes('/')) {
    parts = dateStr.split('/');
  } else {
    return new Date().toISOString().split('T')[0];
  }

  if (parts.length !== 3) {
    return new Date().toISOString().split('T')[0];
  }

  let day = parseInt(parts[0]);
  let month = parseInt(parts[1]);
  let year = parseInt(parts[2]);

  // Handle 2-digit years
  if (year < 100) {
    year += 2000;
  }

  // Ensure valid date
  if (month > 12) {
    [day, month] = [month, day];
  }

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

module.exports = { parsePDF };
