import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import { NewProduct } from '../../pages/NewProduct/NewProduct';
import { EditProduct } from '../EditProduct/EditProduct';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<NewProduct />} />
          <Route path='/edit/:productId' element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
