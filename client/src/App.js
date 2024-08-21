import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ListViewPage from './pages/ListViewPage';
import CalendarViewPage from './pages/CalendarViewPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div id="page-body">
          <Routes>
            <Route path='/' element={<WelcomePage/>}/>
            <Route path='/ListView' element={<ListViewPage/>}/>
            <Route path='/CalendarView' element={<CalendarViewPage/>}/>
            <Route path='*' element={<NotFoundPage/>}/>
          </Routes>
        </div>      
      </div>
    </BrowserRouter>
  );
}

export default App;
