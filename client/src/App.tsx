import Header from './components/Header';
import Footer from './components/Footer';
import {Outlet} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'


function App() {
    return (
        <div className="max-w-screen-2xl border px-12">
            <div>
                <Header />

                <div className="mt-40 md:mt-24 py-3">
                    <Outlet />
                </div>

                <Footer />
            </div>

            <ToastContainer />
        </div>
    );
}

export default App;