import { normalizeOwnedCourse } from '@utils/normalize'
import useSWR from 'swr'

export const createUseOwnedCourses =
  ({ web3, contract }) =>
  (courses, account) => {
    const getKey = () => (web3 && contract && account ? `web3/ownedCourses/${account}` : null)

    const fetcher = async () => {
      const ownedCourses = []
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i]

        if (!course.id) {
          continue
        }

        const hexCourseId = web3.utils.utf8ToHex(course.id)
        const courseHash = web3.utils.soliditySha3(
          { type: 'bytes16', value: hexCourseId },
          { type: 'address', value: account }
        )

        const ownedCourse = await contract.methods.getCourseByHash(courseHash).call()
        if (ownedCourse.owner !== '0x0000000000000000000000000000000000000000') {
          const normalized = normalizeOwnedCourse(web3)(course, ownedCourse)
          ownedCourses.push(normalized)
        }
      }

      return ownedCourses
    }

    const swrRes = useSWR(getKey(), fetcher)

    return swrRes
  }
