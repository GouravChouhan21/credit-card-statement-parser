/**
 * Detects the credit card issuer from extracted text
 * @param {string} text - Extracted text from PDF
 * @returns {string} - Issuer name or 'Unknown'
 */
const detectIssuer = (text) => {
  const normalizedText = text.toUpperCase();

  // HDFC Bank detection
  if (normalizedText.includes('HDFC BANK') || normalizedText.includes('HDFC')) {
    return 'HDFC Bank';
  }

  // ICICI Bank detection
  if (normalizedText.includes('ICICI BANK') || normalizedText.includes('ICICI')) {
    return 'ICICI Bank';
  }

  // SBI detection
  if (normalizedText.includes('STATE BANK OF INDIA') || 
      normalizedText.includes('SBI CARD') || 
      normalizedText.includes('S.B.I.')) {
    return 'SBI';
  }

  // Axis Bank detection
  if (normalizedText.includes('AXIS BANK') || normalizedText.includes('AXIS')) {
    return 'Axis Bank';
  }

  // Citibank detection
  if (normalizedText.includes('CITIBANK') || 
      normalizedText.includes('CITI BANK') || 
      normalizedText.includes('CITI')) {
    return 'Citibank';
  }

  return 'Unknown';
};

module.exports = { detectIssuer };
