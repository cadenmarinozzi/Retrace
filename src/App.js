import Home from './components/pages/Home';
import Header from './components/containers/Header';
import Footer from './components/containers/Footer';
import Map from './components/pages/Map';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';
import './App.scss';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
	return (
		<SkeletonTheme baseColor="#2E2E2E" highlightColor="#D2D2D2">
			<Router>
				<Header />
				<div className="page">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/map" element={<Map />} />
					</Routes>
				</div>
				<Footer />
			</Router>
		</SkeletonTheme>
	);
}

export default App;
