import constants from '../constants'
import { TurboClient } from '../utils'

export default {

	selectVenue: (venue) => {
		return{
			type: constants.SELECT_VENUE,
			data: venue
		}
	},

	fetchUsers: (params) => {
		return dispatch => {
			return dispatch(TurboClient.getRequest('user', params, constants.USERS_RECEIVED))
		}
	},

	addUser: (params) => {
		return dispatch => {
			return dispatch(TurboClient.postRequest('user', params, constants.USER_CREATED))
		}
	},

	loginUser: (credentials) => {
		return dispatch => {
			return dispatch(TurboClient.login(credentials, constants.CURRENT_USER_RECEIVED))
		}
	},

	currentUser: () => {
		return dispatch => {
			return dispatch(TurboClient.currentUser(constants.CURRENT_USER_RECEIVED))
		}
	}

}
