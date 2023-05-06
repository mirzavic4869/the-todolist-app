import { Detail } from '@/components/pages'
import { DashboardLayout } from '@/components/layout'

export default function DetailPage() {
  return (
    <>
      <Detail />
    </>
  )
}

DetailPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>
}
