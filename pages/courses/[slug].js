import { Modal } from '@components/ui/common'
import { BaseLayout } from '@components/ui/layout'
import { CourseHero, Curriculum, Keypoints } from '@components/ui/course'
import { getAllCourses } from '@content/courses/fetcher'
import { useAccount, useOwnedCourse } from '@components/hooks/web3'

export default function Course({ course }) {
  const { account } = useAccount()
  const { ownedCourse } = useOwnedCourse(course, account.data)

  console.log(ownedCourse)
  return (
    <div className="py-4">
      <CourseHero
        hasOwner={!!ownedCourse.data}
        title={course.title}
        description={course.description}
        image={course.coverImage}
      />
      <Keypoints points={course.wsl} />
      <Curriculum locked={true} />
      <Modal />
    </div>
  )
}

export function getStaticPaths() {
  const { data } = getAllCourses()

  return {
    paths: data.map(course => ({
      params: {
        slug: course.slug,
      },
    })),
    fallback: false,
  }
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses()
  const course = data.filter(course => course.slug === params.slug)[0]

  return {
    props: {
      course,
    },
  }
}

Course.Layout = BaseLayout
