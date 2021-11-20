import { createUseAccount } from './createUseAccount'
import { createUseNetwork } from './createUseNetwork'
import { createUseOwnedCourses } from './createUseOwnedCourses'

export const setupHooks = (...deps) => {
  return {
    useAccount: createUseAccount(...deps),
    useNetwork: createUseNetwork(...deps),
    useOwnedCourses: createUseOwnedCourses(...deps),
  }
}
