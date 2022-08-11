import './Notification.scss';

function Notification({ title, body }) {
	return (
		<div className="notification">
			<h2>{title}</h2>
			<h3 className="notification-body">{body}</h3>
		</div>
	);
}

export default Notification;
