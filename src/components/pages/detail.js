import { FaAngleLeft, FaArrowUp, FaPencilAlt } from 'react-icons/fa'
import { Button } from '../button'
import { ItemCard } from '../card'
import { ListItem } from '../modal'
import Image from 'next/image'
import NewItem from '@/assets/images/new-item.svg'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { urlActivity, urlListItem } from '@/lib/data'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Detail() {
  const router = useRouter()
  const [id, setId] = useState(router.query.id)
  const [title, setTitle] = useState('New Activity')
  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [allListItem, setListItem] = useState()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  // Edit Activity
  const editData = useCallback(
    async (id) => {
      try {
        const response = await axios.patch(`${urlActivity}/${id}`, {
          title: title,
        })
        console.log(response, 'Detail')
      } catch (error) {
        console.log(error)
      }
    },
    [title]
  )

  // GetAllListItem
  async function getAllItem() {
    try {
      const result = await axios.get(
        `${urlListItem}?activity_group_id=${router.query.id}`
      )
      setListItem(result.data.data)
      console.log(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllItem()
  }, [getAllItem])

  return (
    <div
      data-cy="itemlist-empty-state"
      className="py-12 px-6 mx-auto md:px-16 lg:px-36"
    >
      <div className="flex flex-row justify-between py-8">
        <div className="flex flex-row items-center gap-2 md:gap-6">
          <Link href="/">
            <FaAngleLeft className="cursor-pointer" />
          </Link>
          {isEdit === false && (
            <h1
              onClick={() => setIsEdit(true)}
              className="font-bold md:text-3xl text-lg cursor-text"
            >
              {title}
            </h1>
          )}
          {isEdit === true && (
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => {
                setIsEdit(false)
                editData(id)
              }}
            />
          )}
          <FaPencilAlt
            className="cursor-pointer"
            color="#A4A4A4"
            onClick={() => editData(id)}
          />
        </div>
        <div className="flex flex-row items-center gap-2 md:gap-4">
          <FaArrowUp color="#A4A4A4" />
          <Button onClick={() => openModal()} name="+ Tambah" />
        </div>
      </div>
      {!allListItem?.length > 0 ? (
        <div className="flex justify-center mx-auto py-8">
          <Image
            src={NewItem}
            className="w-[400px] md:w-[600px]"
            alt="New Item"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {allListItem?.length > 0 &&
            allListItem.map(({ title, id }) => (
              <ItemCard
                id={id}
                getAllItem={getAllItem}
                key={id}
                title={title}
              />
            ))}
        </div>
      )}

      {/* Modal */}
      <div>
        <ListItem
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
          getAllItem={getAllItem}
        />
      </div>
    </div>
  )
}
