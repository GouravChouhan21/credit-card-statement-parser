const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { _id: false });

const statementSchema = new mongoose.Schema({
  issuer: {
    type: String,
    required: true
  },
  cardLast4: {
    type: String,
    required: true
  },
  billingPeriod: {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  },
  dueDate: {
    type: String,
    required: true
  },
  totalBalance: {
    type: Number,
    required: true
  },
  transactions: {
    type: [transactionSchema],
    default: []
  },
  extractedText: {
    type: String,
    default: ''
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  fileName: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Statement', statementSchema);
