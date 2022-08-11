import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import PropTypes from 'prop-types';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Feature from 'ol/Feature';
import { Circle, LineString, Point } from 'ol/geom';
import { Component, createRef } from 'react';
import Icon from 'ol/style/Icon';
import './Map.scss';
import Fill from 'ol/style/Fill';

class MapComponent extends Component {
	constructor() {
		super();

		this.mapRef = createRef();
	}

	componentDidMount() {
		let pathLayer, pathsLayer, markersLayer;

		if (this.props.path) {
			const pathFeature = new Feature({
				geometry: new LineString(
					this.props.path.map((coord) => fromLonLat(coord)),
					'XY'
				),
				name: 'Line',
			});

			const pathSource = new VectorSource({
				features: [pathFeature],
			});

			pathLayer = new Vector({
				source: pathSource,
				style: new Style({
					stroke: new Stroke({
						color: 'rgba(0, 26, 255, 0.4)',
						width: 5,
					}),
				}),
			});

			markersLayer = [
				new Vector({
					source: new VectorSource({
						features: [
							new Feature(
								new Point(fromLonLat(this.props.path[0]))
							),
						],
					}),
					style: new Style({
						image: new Icon({
							anchor: [0.5, 1],
							scale: 0.3,
							src: 'https://vitarsi.com/wp-content/uploads/2022/02/marker.png',
						}),
					}),
				}),
				new Vector({
					source: new VectorSource({
						features: [
							new Feature(
								new Point(
									fromLonLat(
										this.props.path[
											this.props.path.length - 1
										]
									)
								)
							),
						],
					}),
					style: new Style({
						image: new Icon({
							scale: 0.02,
							src: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Pan_Blue_Circle.png',
						}),
					}),
				}),
			];
		}

		if (this.props.paths) {
			pathsLayer = this.props.paths.map((path) => {
				const pathFeature = new Feature({
					geometry: new LineString(
						path.map((coord) => fromLonLat(coord)),
						'XY'
					),
					name: 'Line',
				});

				const pathSource = new VectorSource({
					features: [pathFeature],
				});

				return new Vector({
					source: pathSource,
					style: new Style({
						stroke: new Stroke({
							color: 'rgba(255, 92, 0, 0.4)',
							width: 5,
						}),
					}),
				});
			});
		}

		let layers = [
			new TileLayer({
				source: new OSM(),
			}),
		];

		if (pathLayer) {
			layers.push(pathLayer);
		}

		if (pathsLayer) {
			pathsLayer.forEach((layer) => layers.push(layer));
		}

		if (markersLayer) {
			markersLayer.forEach((layer) => layers.push(layer));
		}

		let map = {
			controls: [],
			view: new View({
				center: this.props.center
					? fromLonLat(this.props.center)
					: fromLonLat(this.props.path[0]),
				zoom: this.props.zoom,
			}),
			layers: layers,
			target: this.mapRef.current,
		};

		if (this.props.disableInteractions) {
			map.interactions = [];
		}

		new Map(map);
	}

	render() {
		return <div className="map" ref={this.mapRef} {...this.props}></div>;
	}
}

MapComponent.defaultProps = {
	zoom: 10,
};

export default MapComponent;
