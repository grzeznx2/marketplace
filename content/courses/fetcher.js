import courses from './index.json'

export const getAllCourses = () => {
  return {
    data: courses,
    courseMap: courses.reduce((acc, cur, i) => {
      acc[cur.id] = cur
      acc[cur.id].index = i
      return acc
    }, {}),
  }
}
