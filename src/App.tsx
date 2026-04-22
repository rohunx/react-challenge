import { TermPage } from './components/TermPage';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return <TermPage user={user} isAdmin={isAdmin} />;
};

export default App;