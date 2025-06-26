import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage'
import ResultsPage from './Pages/ResultsPage';

export default function router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path='results' element={<ResultsPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}
