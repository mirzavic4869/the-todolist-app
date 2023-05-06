import Link from 'next/link'

export default function DashboardHeader() {
  return (
    <nav data-cy="navbar" className="bg-[#16ABF8]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between px-6 mx-auto md:px-16 lg:px-36 py-8">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            To Do List App
          </span>
        </Link>
      </div>
    </nav>
  )
}
