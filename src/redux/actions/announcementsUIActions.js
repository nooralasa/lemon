export const FETCH_ANNOUNCEMENTS = 'FETCH_ANNOUNCEMENTS';
export const FETCH_ANNOUNCEMENT = 'FETCH_ANNOUNCEMENT';

export function fetchAnnouncements(filter = null) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);

	const request = {
		filter: filter
	};

	return {
		type: FETCH_ANNOUNCEMENTS,
		payload: request
	};
}

export function fetchAnnouncement(id) {
	//const request = axios.get(`/api/v1/lemon/${access_token}`, access_token);
	const request = {
		id: id
	};


	return {
		type: FETCH_ANNOUNCEMENT,
		payload: request
	};
}