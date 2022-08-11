import {
	faPlusSquare,
	faLocationArrow,
} from '@fortawesome/free-solid-svg-icons';
import RouterLink from 'components/shared/RouterLink';
import './Footer.scss';

function Footer() {
	return (
		<div className="footer">
			<RouterLink to="/add" icon={faPlusSquare} />
			<RouterLink to="/map" icon={faLocationArrow} />
		</div>
	);
}

export default Footer;
