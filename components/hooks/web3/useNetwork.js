import { useHooks } from '@components/providers/web3'

export const useNetwork = () => useHooks(hooks => hooks.useNetwork)()
