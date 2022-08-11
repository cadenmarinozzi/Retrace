import Notification from 'components/shared/Notification';
import ReactDOM from 'react-dom';

function showNotification({ title, body, duration = 3000 }) {
	const notification = <Notification title={title} body={body} />;

	ReactDOM.render(
		notification,
		document.body.querySelector('#notifications')
	);

	setTimeout(() => {
		ReactDOM.unmountComponentAtNode(
			document.body.querySelector('#notifications')
		);
	}, duration);
}

export { showNotification };
