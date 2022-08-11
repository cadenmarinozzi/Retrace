import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import './RouterLink.scss';

function RouterLink({ children, icon, ...rest }) {
	return (
		<NavLink
			className={(navData) =>
				`navlink ${
					navData.isActive ? 'navlink-active' : 'navlink-inactive'
				}`
			}
			{...rest}>
			{icon && <Icon icon={icon} button />}
			{children}
		</NavLink>
	);
}

export default RouterLink;
