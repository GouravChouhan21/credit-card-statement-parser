import { Link } from 'react-router-dom';
import Loader from './Loader';

const StatementList = ({ statements, loading }) => {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  if (loading) {
    return <Loader />;
  }

  if (!statements || statements.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">No statements uploaded yet.</p>
        <p className="text-gray-400 text-sm mt-2">Upload your first statement to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Parsed Statements</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {statements.map((statement) => (
          <Link
            key={statement._id}
            to={`/statement/${statement._id}`}
            className="block px-6 py-4 hover:bg-gray-50 transition duration-150"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">
                  {getIssuerLogo(statement.issuer)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {statement.issuer}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Card ending in {statement.cardLast4}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(statement.billingPeriod.from)} - {formatDate(statement.billingPeriod.to)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  {formatCurrency(statement.totalBalance)}
                </p>
                <p className="text-xs text-gray-500">
                  Due: {formatDate(statement.dueDate)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StatementList;
