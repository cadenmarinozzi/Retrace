import Map from 'components/shared/Map';
import { Component } from 'react';
import mapsData from 'mapsData.json';
import Skeleton from 'react-loading-skeleton';
import './Map.scss';

class MapPage extends Component {
	constructor() {
		super();

		this.state = {};
	}

	componentDidMount() {
		let paths = mapsData.map((map) => map.path);

		navigator.geolocation.watchPosition(({ coords }) => {
			this.setState({
				center: [coords.longitude, coords.latitude],
				paths: paths,
			});
		});
	}

	render() {
		if (!this.state.center) return;

		return (
			<Map
				center={this.state.center}
				paths={this.state.paths}
				zoom={16}
				className="map"
			/>
		);
	}
}

export default MapPage;
