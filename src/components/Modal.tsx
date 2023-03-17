import { useState, Fragment, useEffect, useRef, LegacyRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type ModalPops = {
  isOpen: boolean
  onClose: (value: boolean) => void
  children: React.ReactElement
  title: string | React.ReactElement
  closeModal: ()=> void

}

export default function Modal({ isOpen, onClose, title, children, closeModal }: ModalPops) {
  const panelRef = useRef<HTMLDivElement>(null)
  
  async function onMouseLeave(event: any){
    console.log("mouse leave happened");
    closeModal()
  }

  function mouseEnter(event: any){
    panelRef.current?.addEventListener("mouseenter", (e)=>{
      console.log("mosuse enter func called");
      
    })
  }
 
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              afterEnter={() => {
                console.log("after enter here");
                panelRef.current?.addEventListener("mouseleave", onMouseLeave)
              }}

              afterLeave={()=>{
                console.log("after leave here");
                panelRef.current?.addEventListener("mouseleave", onMouseLeave)
              }}

            >
              <Dialog.Panel className="transform bg-dark overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  {title}
                </Dialog.Title>
                {children}


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>


  )
}
