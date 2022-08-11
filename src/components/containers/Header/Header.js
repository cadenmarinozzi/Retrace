import RouterLink from 'components/shared/RouterLink';
import { faGear, faHome } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

function Header() {
	return (
		<div className="header">
			<RouterLink to="/" icon={faHome} />
			<h1>Retrace</h1>
			<RouterLink to="/settings" icon={faGear} />
		</div>
	);
}

export default Header;
