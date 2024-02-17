import Add from './addChannel.jsx'
import Remove from './removeChannel.jsx'
import Rename from './renameChannel.jsx'

const modals = {
	addChannel: Add,
	removing: Remove,
	renaming: Rename,
}

export default modalName => modals[modalName]
