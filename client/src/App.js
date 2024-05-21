// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Auth from './Auth/Auth';
import { FinancialRecordsProvider } from './Context/recordContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FinancialRecordsProvider>
          <Dashboard/>
        </FinancialRecordsProvider>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
