import { useCallback, useEffect, useState } from 'react'
import { Button } from '../button'
import { ActivityCard } from '../card'
import Image from 'next/image'
import Link from 'next/link'
import NewActivity from '@/assets/images/new-activity.svg'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { urlActivity, urlListItem, email } from '@/lib/data'

export default function Dashboard() {
  const [allActivity, setAllActivity] = useState(null)
  const [activity, setActivity] = useState()

  const router = useRouter()

  // Get All Activity
  async function getAllActivity() {
    try {
      const result = await axios.get(`${urlActivity}?email=${email}`)
      setAllActivity(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllActivity()
  }, [])

  // useEffect(() => {
  //   console.log(activity)
  // }, [activity])
  // Tambah Activity
  const addActivity = useCallback(async () => {
    try {
      const result = await axios.post(urlActivity, {
        title: 'New Activity',
        email: 'sikakikiri@gmail.com',
      })
      getAllActivity()
    } catch (error) {
      console.log(error)
    }
  }, [])
  // Delete Activity
  async function deleteActivity(id, title) {
    try {
      // e.stopPropagation()
      await axios.delete(`${urlActivity}/${id}`)
      await Swal.fire({
        title: `Apakah anda yakin menghapus activity "${title}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ED4C5C',
        cancelButtonColor: '#F4F4F4',
        confirmButtonText: 'Hapus',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Activity berhasil dihapus', 'success')
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      getAllActivity()
    }
  }

  // View Detail
  const handleDetail = useCallback(
    async (id) => {
      try {
        router.push(`/detail/${id}`)
      } catch (error) {
        console.log(error)
      }
    },
    [router]
  )
  console.log(allActivity)
  return (
    <div
      data-cy="activity-new-item"
      className="py-12 px-6 mx-auto md:px-16 lg:px-36"
    >
      <div className="flex flex-row justify-between py-8">
        <p className="font-bold text-3xl">Activity</p>
        <Button onClick={addActivity} name="+ Tambah" />
      </div>
      {allActivity === 0 ? (
        <div className="flex justify-center mx-auto py-8">
          <Image
            src={NewActivity}
            className="w-[400px] md:w-[600px]"
            alt="New Activity"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 grid-flow-row">
          {allActivity &&
            allActivity.map(({ title, created_at, id }) => (
              <ActivityCard
                key={id}
                title={title}
                id={id}
                date={created_at}
                handleDetail={handleDetail}
                deleteActivity={deleteActivity}
              />
            ))}
        </div>
      )}
    </div>
  )
}
