# Sample PDFs Directory

This directory contains sample credit card statement PDFs for testing the parser application.

## Required Sample PDFs

Please create at least one sample PDF for each of the following issuers:

1. **HDFC Bank** - `sample_hdfc.pdf`
2. **ICICI Bank** - `sample_icici.pdf`
3. **SBI** - `sample_sbi.pdf`
4. **Axis Bank** - `sample_axis.pdf`
5. **Citibank** - `sample_citibank.pdf`

## Sample PDF Requirements

Each sample PDF should:

1. **Be clearly marked** with watermark: "SAMPLE — FOR TESTING ONLY"
2. **Include bank name** in the document (e.g., "HDFC Bank", "ICICI Bank")
3. **Contain the following data fields:**
   - Card number (last 4 digits visible)
   - Billing period (start date and end date)
   - Payment due date
   - Total balance / Amount due
   - At least 3-5 sample transactions with:
     - Transaction date
     - Description/merchant name
     - Amount

## Sample Data Format

Example content that should appear in each PDF:

```
Bank Name: [HDFC Bank / ICICI Bank / SBI / Axis Bank / Citibank]
Card ending in: XXXX

Statement Period: 01-10-2025 to 31-10-2025
Payment Due Date: 21-11-2025

Total Amount Due: ₹26,095.00

Transactions:
05-10-2025  Online Merchant    ₹12,999.00
12-10-2025  Cafe Latte         ₹450.00
18-10-2025  Fuel Station       ₹1,500.00
25-10-2025  Grocery Store       ₹2,146.00
```

## Creating Sample PDFs

You can create sample PDFs using:

1. **Word/Google Docs:**
   - Create a document with the required fields
   - Add watermark "SAMPLE — FOR TESTING ONLY"
   - Export as PDF

2. **PDF Generators:**
   - Use online PDF generators
   - Ensure text is selectable (not just images)

3. **Code:**
   - Use libraries like `pdfkit` or `jspdf` to generate PDFs programmatically

## Notes

- **Anonymize all data** - Use fake card numbers, amounts, and merchant names
- **Ensure text is extractable** - PDFs must contain actual text, not just scanned images
- **Keep file size under 20MB**
- **Use consistent date formats** (DD-MM-YYYY or DD/MM/YYYY)

## Testing

After creating sample PDFs:

1. Upload each PDF through the web interface
2. Verify that the issuer is correctly detected
3. Check that all 5 key data points are extracted correctly:
   - ✅ Card last 4 digits
   - ✅ Billing period
   - ✅ Payment due date
   - ✅ Total balance
   - ✅ Transaction list

If parsing fails, check:
- PDF contains actual text (not just images)
- Bank name is clearly visible
- Data fields are in a readable format
- File is not corrupted
