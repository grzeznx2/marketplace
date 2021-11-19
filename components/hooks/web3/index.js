import { useHooks } from '@components/providers/web3'

const enhanceHook = swrRes => {
  return {
    ...swrRes,
    hasInitialResponse: swrRes.data || swrRes.error,
  }
}

export const useAccount = () => ({ account: enhanceHook(useHooks(hooks => hooks.useAccount)()) })

export const useNetwork = () => ({ network: enhanceHook(useHooks(hooks => hooks.useNetwork)()) })