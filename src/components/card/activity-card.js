import { FaTrashAlt } from 'react-icons/fa'

export default function ActivityCard({
  title,
  date,
  id,
  handleDetail,
  deleteActivity,
}) {
  return (
    <div
      data-cy="activity-card"
      className="bg-white shadow-lg rounded-lg p-4 w-full md:w-[195px] lg:w-[235px]"
    >
      <div className="flex flex-col justify-between gap-32 md:gap-28 lg:gap-32">
        <h1
          onClick={() => handleDetail(id)}
          className="text-2xl font-bold cursor-pointer"
        >
          {title}
        </h1>
        <div className="flex flex-row justify-between items-center text-[#888888]">
          <h2 className="text-xl">{date}</h2>
          <FaTrashAlt
            className="block cursor-pointer"
            onClick={() => {
              deleteActivity(id, title)
            }}
          />
        </div>
      </div>
    </div>
  )
}
