import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { NewsContextProvider } from './context/NewsContext.jsx';
import PetitionContextProvider from './context/PetitionContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <NewsContextProvider>
        <PetitionContextProvider>
          <App />
        </PetitionContextProvider>
      </NewsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
