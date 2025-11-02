# Credit Card Statement Parser — MERN Stack Full-Stack Web App

A full-stack web application that uploads and parses PDF credit card statements from 5 major issuers (HDFC Bank, ICICI Bank, SBI, Axis Bank, Citibank) and extracts key data points including card details, billing periods, payment due dates, balances, and transaction lists.

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **PDF Parsing:** pdf-parse (text-based PDFs) + tesseract.js (scanned PDFs OCR fallback)
- **File Upload:** Multer
- **Language:** JavaScript

## Features

- ✅ Upload PDF credit card statements (max 20MB)
- ✅ Automatic issuer detection (HDFC, ICICI, SBI, Axis, Citibank)
- ✅ Extract 5 key data points:
  - Card last 4 digits
  - Billing period (start and end date)
  - Payment due date
  - Total / New balance
  - Transaction list (date, description, amount)
- ✅ RESTful API endpoints
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Responsive design
- ✅ Transaction history viewing

## Project Structure

```
Project_Sure_finance/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── statementRoutes.js
│   ├── controllers/
│   │   └── statementController.js
│   ├── models/
│   │   └── statementModel.js
│   ├── utils/
│   │   ├── pdfParser.js
│   │   └── issuerDetection.js
│   ├── uploads/              # Uploaded PDFs (gitignored)
│   ├── config/
│   │   └── db.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadForm.jsx
│   │   │   ├── StatementList.jsx
│   │   │   ├── StatementDetails.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── StatementView.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── sample_pdfs/              # Sample PDFs for testing
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- npm or yarn

## Setup Instructions

### 1. Clone or navigate to the project directory

```bash
cd Project_Sure_finance
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (optional - defaults provided)
# MONGODB_URI=mongodb://localhost:27017/credit-card-parser
# PORT=5000

# Start MongoDB (if running locally)
# Make sure MongoDB is running on localhost:27017
# Or update MONGODB_URI in .env with your MongoDB Atlas connection string

# Start the backend server
npm start

# For development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### POST /api/statements/upload
Upload a PDF statement and parse it.

**Request:** Multipart form data with `pdf` field
**Response:**
```json
{
  "success": true,
  "message": "Statement parsed successfully",
  "data": {
    "issuer": "HDFC Bank",
    "cardLast4": "1234",
    "billingPeriod": { "from": "2025-10-01", "to": "2025-10-31" },
    "dueDate": "2025-11-21",
    "totalBalance": 26095.00,
    "transactions": [...]
  }
}
```

### GET /api/statements
Get list of all parsed statements (summary).

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

### GET /api/statements/:id
Get full details of a specific statement.

**Response:**
```json
{
  "success": true,
  "data": {
    "issuer": "HDFC Bank",
    "cardLast4": "1234",
    ...
  }
}
```

## Sample PDFs

Sample PDFs for testing are stored in the `/sample_pdfs` directory. These are anonymized sample statements marked with "SAMPLE — FOR TESTING ONLY" watermark.

**Note:** You will need to create sample PDFs manually as they cannot be generated programmatically. Each PDF should contain:
- Bank name (HDFC Bank, ICICI Bank, SBI, Axis Bank, or Citibank)
- Card number ending (last 4 digits)
- Billing period dates
- Payment due date
- Total balance amount
- Transaction list with dates, descriptions, and amounts

## Usage

1. **Upload a Statement:**
   - Click "Choose File" and select a PDF statement
   - Click "Upload & Parse Statement"
   - Wait for parsing to complete

2. **View Statements:**
   - View all parsed statements on the home page
   - Click on any statement to view full details

3. **View Details:**
   - See card information, billing period, due date, and balance
   - Browse all transactions in a table format

## Data Model

```javascript
{
  issuer: "HDFC Bank",
  cardLast4: "1234",
  billingPeriod: { from: "2025-10-01", to: "2025-10-31" },
  dueDate: "2025-11-21",
  totalBalance: 26095.00,
  transactions: [
    { date: "2025-10-05", description: "Online Merchant", amount: 12999.00 },
    { date: "2025-10-12", description: "Cafe Latte", amount: 450.00 }
  ],
  extractedText: "... full text ...",
  uploadedAt: Date.now(),
  fileName: "statement.pdf"
}
```

## Development

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in `.env` file
   - For MongoDB Atlas, use the connection string provided

2. **PDF Parsing Fails:**
   - Ensure PDF is text-based (not scanned image)
   - Check file size is under 20MB
   - Verify PDF contains readable text

3. **Port Already in Use:**
   - Change PORT in backend `.env` file
   - Update proxy in `frontend/vite.config.js` if needed

## Security & Ethics

- ⚠️ **This is for educational/demo purposes only**
- ⚠️ **Sample PDFs should be clearly marked**
- ⚠️ **Do not use in production without proper security measures**

## Future Enhancements (Optional)

- Manual field correction before saving
- Dynamic issuer logo display
- Search/filter by card number or date
- Export parsed data to CSV/Excel
- OCR support for scanned PDFs (tesseract.js integration)

## License

This project is for educational purposes only.
---
