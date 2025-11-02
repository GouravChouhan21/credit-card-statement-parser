import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StatementView from './pages/StatementView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statement/:id" element={<StatementView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
