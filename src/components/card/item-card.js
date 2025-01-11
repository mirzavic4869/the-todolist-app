import { FaCheckSquare, FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { urlListItem } from '@/lib/data'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react'

export default function ItemCard({ id, title, getAllItem }) {
  const [isActive, setIsActive] = useState(true)
  async function deleteItem(id, title) {
    try {
      // e.stopPropagation()
      await axios.delete(`${urlListItem}/${id}`)
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
      getAllItem()
    }
  }
  async function updateStatus(id) {
    try {
      const response = await axios.patch(`${urlListItem}/${id}`, {
        is_Active: isActive,
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      data-cy="item-card"
      className="w-full p-6 bg-white shadow-lg rounded-xl md:p-8"
    >
      <div className="flex flex-row items-center justify-between text-lg md:text-xl">
        <div className="flex flex-row items-center gap-3 md:gap-4">
          <input
            type="checkbox"
            checked={!isActive}
            name="isActive"
            onChange={() => {
              setIsActive(!isActive)
              updateStatus(id)
            }}
          />
          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
          <h1 className={`font-semibold ${!isActive && 'line-through'}`}>
            {title}
          </h1>
          <FaPencilAlt color="#A4A4A4" />
        </div>
        <FaTrashAlt onClick={() => deleteItem(id, title)} color="#888888" />
      </div>
    </div>
  )
}
