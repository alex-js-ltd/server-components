'use client'

import { Modal } from '@/comps/modal'

export default function Home() {
  return (
    <main>
      <Modal>
        <Modal.OpenButton>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Default
          </button>
        </Modal.OpenButton>

        <Modal.Contents title="hello">
          <h1>hello</h1>
        </Modal.Contents>
      </Modal>
    </main>
  )
}
