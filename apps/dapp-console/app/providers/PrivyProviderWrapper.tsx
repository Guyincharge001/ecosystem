'use client'

import { PrivyProvider, User } from '@privy-io/react-auth'
import { useTheme } from 'next-themes'
import { trackSuccessfulSignIn } from '@/app/event-tracking/mixpanel'
import { externalRoutes } from '@/app/constants'

// This is a public app_id provided in the privy docs: https://docs.privy.io/guide/quickstart
const PRIVY_PUBLIC_APP_ID = 'clpispdty00ycl80fpueukbhl'

function PrivyProviderWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const logo =
    theme === 'dark'
      ? '/logos/superchain-developer-logo-dark.png'
      : '/logos/superchain-developer-logo-light.png'

  const handleSuccess = (user: User, isNewUser: boolean) => {
    trackSuccessfulSignIn(isNewUser)
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || PRIVY_PUBLIC_APP_ID}
      config={{
        loginMethods: ['email'],
        appearance: {
          theme: theme === 'dark' ? 'dark' : 'light',
          accentColor: '#FF0420',
          logo: logo,
        },
        legal: {
          termsAndConditionsUrl: externalRoutes.TERMS.path,
          privacyPolicyUrl: externalRoutes.PRIVACY_POLICY.path,
        },
      }}
      onSuccess={handleSuccess}
    >
      {children}
    </PrivyProvider>
  )
}

export { PrivyProviderWrapper }
