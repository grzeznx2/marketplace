import { CourseCard, CourseList } from '@components/ui/course'
import { BaseLayout } from '@components/ui/layout'
import { getAllCourses } from '@content/courses/fetcher'
import { EthRates, WalletBar } from '@components/ui/web3'
import { useWalletInfo } from '@components/hooks/web3'
import { Button } from '@components/ui/common'
import { OrderModal } from '@components/ui/order'
import { useState } from 'react'
import { useEthPrice } from '@components/hooks/web3/useEthPrice'

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { network, account, purchaseAvaiable } = useWalletInfo()
  const { eth } = useEthPrice()

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.ta,
            isSupported: network.isSupported,
            hasInitialResponse: network.hasInitialResponse,
          }}
        />
        <EthRates eth={eth} />
      </div>
      <CourseList courses={courses}>
        {course => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!purchaseAvaiable}
            Footer={() => (
              <div className="mt-4">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  variant="lightPurple"
                  disabled={!purchaseAvaiable}
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </>
  )
}

export function getStaticProps() {
  const { data } = getAllCourses()
  return {
    props: {
      courses: data,
    },
  }
}

Marketplace.Layout = BaseLayout
