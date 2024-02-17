import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react'
import i18next from 'i18next'
import leoProfanity from 'leo-profanity'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'

import App from './components/App.jsx'
import AuthProvider from './context/authProvider.jsx'
import chatApi from './context/chatApi.js'
import { chatApiContext } from './context/context.js'
import resources from './locales/index.js'
import rollbarConfig from './rollbar/rollbarConfig.js'
import store from './slices/index.js'

const Init = async () => {
	const i18n = i18next.createInstance()
	await i18n.use(initReactI18next).init({
		resources,
		fallbackLng: 'ru',
	})

	const ruDict = leoProfanity.getDictionary('ru')
	leoProfanity.add(ruDict)

	return (
		<RollbarProvider config={rollbarConfig}>
			<ErrorBoundary>
				<I18nextProvider i18n={i18n}>
					<Provider store={store}>
						<AuthProvider>
							<chatApiContext.Provider value={chatApi}>
								<App />
							</chatApiContext.Provider>
						</AuthProvider>
					</Provider>
				</I18nextProvider>
			</ErrorBoundary>
		</RollbarProvider>
	)
}

export default Init
