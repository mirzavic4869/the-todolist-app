import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useCallback } from 'react'
import { Button } from '../button'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'
import { urlListItem } from '@/lib/data'
import { useRouter } from 'next/router'

export default function ListItem({ isOpen, closeModal, getAllItem }) {
  const [input, setInput] = useState({})
  const [listItem, setListItem] = useState()
  const [color, setColor] = useState()
  const router = useRouter()

  function handleChange(event) {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }
  console.log(input)
  // Add Item
  const addItem = useCallback(async () => {
    try {
      const result = await axios.post(urlListItem, {
        title: input.title,
        priority: input.priority,
        activity_group_id: router.query?.id,
      })
      console.log(result.data)
      setListItem(result.data)
    } catch (error) {
      console.log(error)
    } finally {
      getAllItem()
      closeModal()
    }
  }, [input])
  return (
    <div data-cy="list-item-modal">
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full md:w-3/4 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center">
                    <Dialog.Title
                      as="h2"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Tambah List Item
                    </Dialog.Title>
                    <FaTimes
                      className="cursor-pointer"
                      onClick={closeModal}
                      color="#A4A4A4"
                    />
                  </div>

                  <div className="my-4 w-full h-[1px] bg-[#E5E5E5]"></div>
                  <div className="mt-8 flex flex-col">
                    <label className="font-bold mb-2 text-sm text-gray-500">
                      NAMA LIST ITEM
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      value={input.title || ''}
                      name="title"
                      required
                      placeholder="Tambahkan nama Activity"
                      className="w-full p-4 appearance-none outline-none border border-[#E5E5E5] rounded-lg"
                    />
                  </div>
                  <div className="mt-4 flex flex-col">
                    <label className="font-bold mb-2 text-sm text-gray-500">
                      PRIORITY
                    </label>
                    <select
                      onChange={handleChange}
                      name="priority"
                      value={input.priority}
                      className="w-1/2 p-4 appearance-none outline-none border border-[#E5E5E5] rounded-lg"
                    >
                      <option value="very-high">Very High</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                      <option value="very-low">Very Low</option>
                    </select>
                  </div>
                  <div className="my-4 w-full h-[1px] bg-[#E5E5E5]"></div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={addItem} name="SIMPAN" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
