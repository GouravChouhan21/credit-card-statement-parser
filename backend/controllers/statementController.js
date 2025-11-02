const Statement = require('../models/statementModel');
const { parsePDF } = require('../utils/pdfParser');
const fs = require('fs');
const path = require('path');

/**
 * Upload and parse PDF statement
 */
const uploadStatement = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const filePath = req.file.path;

    // Parse PDF
    const parsedData = await parsePDF(filePath);

    // Save to database
    const statement = new Statement({
      ...parsedData,
      fileName: req.file.originalname
    });

    await statement.save();

    // Delete uploaded file after parsing (optional - you may want to keep it)
    // fs.unlinkSync(filePath);

    res.status(201).json({
      success: true,
      message: 'Statement parsed successfully',
      data: statement
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up file on error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to parse PDF statement'
    });
  }
};

/**
 * Get all statements (summary list)
 */
const getAllStatements = async (req, res) => {
  try {
    const statements = await Statement.find()
      .select('issuer cardLast4 billingPeriod dueDate totalBalance uploadedAt fileName')
      .sort({ uploadedAt: -1 });

    res.status(200).json({
      success: true,
      count: statements.length,
      data: statements
    });
  } catch (error) {
    console.error('Get all statements error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statements'
    });
  }
};

/**
 * Get single statement by ID
 */
const getStatementById = async (req, res) => {
  try {
    const statement = await Statement.findById(req.params.id);

    if (!statement) {
      return res.status(404).json({
        success: false,
        error: 'Statement not found'
      });
    }

    res.status(200).json({
      success: true,
      data: statement
    });
  } catch (error) {
    console.error('Get statement error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statement'
    });
  }
};

module.exports = {
  uploadStatement,
  getAllStatements,
  getStatementById
};
