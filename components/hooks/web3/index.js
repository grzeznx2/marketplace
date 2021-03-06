import { useHooks } from '@components/providers/web3'

const enhanceHook = swrRes => {
  return {
    ...swrRes,
    hasInitialResponse: swrRes.data || swrRes.error,
  }
}

export const useAccount = () => ({ account: enhanceHook(useHooks(hooks => hooks.useAccount)()) })

export const useNetwork = () => ({ network: enhanceHook(useHooks(hooks => hooks.useNetwork)()) })

export const useOwnedCourses = (...args) => ({
  ownedCourses: enhanceHook(useHooks(hooks => hooks.useOwnedCourses)(...args)),
})
export const useOwnedCourse = (...args) => ({
  ownedCourse: enhanceHook(useHooks(hooks => hooks.useOwnedCourse)(...args)),
})

export const useWalletInfo = () => {
  const { account } = useAccount()
  const { network } = useNetwork()

  const purchaseAvaiable = !!(account.data && network.isSupported)

  return {
    account,
    network,
    purchaseAvaiable,
  }
}
