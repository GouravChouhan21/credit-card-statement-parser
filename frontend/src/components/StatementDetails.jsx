import Loader from './Loader';

const StatementDetails = ({ statement, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getIssuerLogo = (issuer) => {
    const logos = {
      'HDFC Bank': '🏦',
      'ICICI Bank': '🏦',
      'SBI': '🏦',
      'Axis Bank': '🏦',
      'Citibank': '🏦',
      'Unknown': '📄'
    };
    return logos[issuer] || '📄';
  };

  if (loading) {
    return <Loader />;
  }

  if (!statement) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">Statement not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="text-5xl">{getIssuerLogo(statement.issuer)}</div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{statement.issuer}</h1>
          </div>
        </div>

        {/* 5 Key Data Points */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Extracted Data Points</h2>
          
          {/* 1. Card Last 4 Digits */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-5 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-1">1. Card Last 4 Digits</p>
                <p className="text-2xl font-bold text-indigo-900">•••• •••• •••• {statement.cardLast4}</p>
              </div>
              <div className="text-3xl">💳</div>
            </div>
          </div>

          {/* 2. Billing Period */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">2. Billing Period</p>
                <p className="text-lg font-bold text-green-900">
                  From: {formatDate(statement.billingPeriod.from)}
                </p>
                <p className="text-lg font-bold text-green-900">
                  To: {formatDate(statement.billingPeriod.to)}
                </p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>

          {/* 3. Payment Due Date */}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-5 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-1">3. Payment Due Date</p>
                <p className="text-2xl font-bold text-red-900">
                  {formatDate(statement.dueDate)}
                </p>
              </div>
              <div className="text-3xl">⏰</div>
            </div>
          </div>

          {/* 4. Total / New Balance */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">4. Total / New Balance</p>
                <p className="text-3xl font-bold text-blue-900">
                  {formatCurrency(statement.totalBalance)}
                </p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Transaction List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-1">5. Transaction List</p>
              <h2 className="text-xl font-bold text-purple-900">
                {statement.transactions?.length || 0} Transactions Found
              </h2>
            </div>
            <div className="text-3xl">📋</div>
          </div>
        </div>
        {statement.transactions && statement.transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statement.transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No transactions found in this statement.
          </div>
        )}
      </div>

      {/* Upload Info */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p>
          <strong>Uploaded:</strong> {formatDate(statement.uploadedAt)} | 
          <strong> File:</strong> {statement.fileName || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default StatementDetails;
