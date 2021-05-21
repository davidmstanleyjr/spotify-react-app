import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import Dashboard from './dashboard';
import './Style.css';

//takes in url code so users can login
const code = new URLSearchParams(window.location.search).get('code');

function App() {
	return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
