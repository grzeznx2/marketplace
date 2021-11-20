import { createUseAccount } from './createUseAccount'
import { createUseNetwork } from './createUseNetwork'
import { createUseOwnedCourses } from './createUseOwnedCourses'

export const setupHooks = ({ web3, provider, contract }) => {
  return {
    useAccount: createUseAccount({ web3, provider }),
    useNetwork: createUseNetwork({ web3, provider }),
    useOwnedCourses: createUseOwnedCourses({ web3, contract }),
  }
}
