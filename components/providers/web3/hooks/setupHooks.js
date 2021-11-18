import { createUseAccount } from './createUseAccount'

export const setupHooks = web3 => {
  return {
    useAccount: createUseAccount(web3),
  }
}
