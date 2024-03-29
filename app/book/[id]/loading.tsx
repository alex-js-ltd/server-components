import { loadingBook } from '@/comps/loading'

const Loading = () => {
  const { coverImageUrl, title, author, publisher, synopsis } = loadingBook

  return (
    <div>
      <div className="relative grid gap-8 mb-4 grid-cols-[1fr] sm:grid-cols-[1fr_2fr]">
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          className="w-full max-w-14rem"
        />
        <div>
          <div className="flex relative">
            <div className="flex-1 justify-between">
              <h1 className="text-2xl font-bold">{title}</h1>
              <div className="flex items-center">
                <i>{author}</i>
                <span className="mx-2">|</span>
                <i>{publisher}</i>
              </div>
            </div>
            <div className="right-0 text-gray-700 flex flex-col justify-between min-h-32"></div>
          </div>
          <div className="mt-4 h-12"></div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
    </div>
  )
}

export default Loading
