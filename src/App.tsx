import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Layout from './components/layout/Layout';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <Layout>
        <div className="App">
          <AppRoutes />
          <Toaster position="top-right" />
        </div>
      </Layout>
    </Router>
  );
}

export default App;