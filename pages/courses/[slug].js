import { Modal } from '@components/common'
import { BaseLayout } from '@components/common/layout'
import { CourseHero, Curriculum, Keypoints } from '@components/course'

export default function Course() {
  return (
    <div className="py-4">
      <CourseHero />
      <Keypoints />
      <Curriculum />
      <Modal />
    </div>
  )
}

Course.Layout = BaseLayout
