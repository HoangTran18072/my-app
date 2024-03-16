
import { Container } from 'react-bootstrap';
import './App.scss';
import Header from './components/header';
import TableUser from './components/tableUser';

import { ToastContainer } from 'react-toastify'

function App() {



  return (
    <div className='container-fluid'>
      <Header />
      <Container>
        <TableUser/>
      </Container>

      <ToastContainer
        position='top-right'
        autoClose = {5000}
        hideProgressBar = {false}
        newestOnTop = {false}
        rtl = {false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
