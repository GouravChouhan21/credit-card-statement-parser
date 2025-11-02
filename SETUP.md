# Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:

- ✅ Node.js installed (v14+)
- ✅ MongoDB running (local or Atlas connection string)
- ✅ npm or yarn package manager

## Step-by-Step Setup

### Option 1: Manual Setup (Recommended for first-time setup)

#### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2. Configure Backend (Optional)

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb://localhost:27017/credit-card-parser
PORT=5000
```


#### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### 4. Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

#### 5. Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### Option 2: Using Root Scripts

From the project root:

```bash
# Install all dependencies
npm run install-all

# In separate terminals:
npm run dev-backend  # Terminal 1
npm run dev-frontend # Terminal 2
```

## Verify Installation

1. **Backend Health Check:**
   - Open browser: `http://localhost:5000/api/health`
   - Should return: `{"status":"OK","message":"Credit Card Statement Parser API is running"}`

2. **Frontend:**
   - Open browser: `http://localhost:3000`
   - Should see the upload form and dashboard

## MongoDB Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `.env` file with connection string

## Testing with Sample PDFs

1. Create sample PDFs in `/sample_pdfs` directory (see `sample_pdfs/README.md`)
2. Upload through the web interface
3. Verify parsing works correctly

## Common Issues

### Issue: MongoDB Connection Failed

**Solution:**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access for MongoDB Atlas

### Issue: Port Already in Use

**Solution:**
- Change PORT in backend `.env`
- Kill process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Issue: Module Not Found

**Solution:**
- Delete `node_modules` and reinstall:
  ```bash
  rm -rf node_modules
  npm install
  ```

### Issue: PDF Parsing Fails

**Solution:**
- Ensure PDF contains extractable text (not just images)
- Check file size is under 20MB
- Verify PDF format is valid

## Next Steps

1. ✅ Backend and Frontend running
2. ✅ MongoDB connected
3. 📄 Create sample PDFs for testing
4. 🚀 Start uploading and parsing!

For detailed documentation, see [README.md](./README.md)
