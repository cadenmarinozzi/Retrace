import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Icon.scss';

function Icon({ icon, size, button, ...rest }) {
	return (
		<FontAwesomeIcon
			className={`icon fa-${size} ${
				(button || rest.onClick) && 'icon-button'
			}`}
			icon={icon}
			{...rest}
		/>
	);
}

Icon.propTypes = {
	icon: PropTypes.any.isRequired,
	size: PropTypes.oneOf(['2xs', 'xs', 'sm', 'lg', 'xl', '2xl']),
};

Icon.defaultProps = {
	size: 'xl',
};

export default Icon;
