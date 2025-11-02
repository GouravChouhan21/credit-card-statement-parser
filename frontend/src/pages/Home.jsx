import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UploadForm from '../components/UploadForm';
import StatementList from '../components/StatementList';
import Loader from '../components/Loader';

const Home = () => {
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStatements();
  }, []);

  const fetchStatements = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/statements');
      if (response.data.success) {
        setStatements(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching statements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (newStatement) => {
    setUploadSuccess(newStatement);
    // Refresh statements list
    fetchStatements();
    // Navigate to the new statement after a short delay
    setTimeout(() => {
      navigate(`/statement/${newStatement._id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Credit Card Statement Parser
          </h1>
          <p className="text-gray-600 mt-2">
            Upload and parse PDF credit card statements from major issuers
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {uploadSuccess && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Extraction complete! Redirecting to statement details...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Form */}
        <UploadForm onUploadSuccess={handleUploadSuccess} />

        {/* Statements List */}
        <StatementList statements={statements} loading={loading} />
      </main>
    </div>
  );
};

export default Home;
