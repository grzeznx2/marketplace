import { Navbar, Footer, Hero, Breadcrumbs } from '@components/common'
import { BaseLayout } from '@components/common/layout'
import { CourseList } from '@components/course'
import { OrderCard } from '@components/order'
import { EthRates, WalletBar } from '@components/web3'

export default function Home() {
  return (
    <>
      <Hero />
      <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <OrderCard />
      <CourseList />
    </>
  )
}

Home.Layout = BaseLayout
