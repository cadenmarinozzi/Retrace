import axios from 'axios';

const apiKey = '0a9ba6ec61034e949d0c286d1adec471';

async function cityFromCoords({ lat, lng }) {
	const res = await axios.get(
		encodeURI(
			`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&addressdetails=1&apiKey=${apiKey}`
		)
	);

	return res.data.features[0].properties.city;
}

export { cityFromCoords };
