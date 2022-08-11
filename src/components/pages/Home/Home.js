import Icon from 'components/shared/Icon';
import {
	faRunning,
	faShare,
	faBiking,
} from '@fortawesome/free-solid-svg-icons';
import { Component, createRef } from 'react';
import Map from 'components/shared/Map';
import { cityFromCoords } from 'utils/methods';
import Skeleton from 'react-loading-skeleton';
import mapsData from 'mapsData.json';
import { showNotification } from 'utils/notification';
import './Home.scss';

async function formatMapsData() {
	let formattedMapsData = await Promise.all(
		mapsData.map(async (map) => {
			return {
				...map,
				from:
					map.from ||
					(await cityFromCoords({
						lat: map.path[0][1],
						lng: map.path[0][0],
					})),
				to:
					map.to ||
					(await cityFromCoords({
						lat: map.path[map.path.length - 1][1],
						lng: map.path[map.path.length - 1][0],
					})),
			};
		})
	);

	this.setState({
		mapsData: formattedMapsData,
	});

	return formattedMapsData;
}

class Home extends Component {
	constructor() {
		super();

		this.mapRefs = mapsData.map(() => createRef());
		this.state = {};
	}

	async componentDidMount() {
		if (this.state.mapsData) return;

		await formatMapsData.call(this);
	}

	render() {
		if (!this.state.mapsData) return;

		return (
			<div className="home">
				{this.state.mapsData.map((map, index) => {
					return (
						<div key={index} className="section">
							<div className="section-header">
								<Icon
									icon={faShare}
									onClick={async () => {
										await navigator.clipboard.writeText(
											'a'
										);

										showNotification({
											title: 'Link Copied',
											body: 'Copied share link to the clipboard!',
										});
									}}
								/>
								<h2 className="section-title">
									{map.name || `${map.from} to ${map.to}`}
								</h2>
								<Icon
									icon={
										map.type === 'Run'
											? faRunning
											: faBiking
									}
								/>
							</div>
							<Map
								path={map.path}
								className="map"
								disableInteractions
							/>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Home;
