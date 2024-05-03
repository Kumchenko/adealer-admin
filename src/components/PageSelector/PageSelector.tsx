import { paginate } from '@/utils/paginate'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { PageSelectorProps } from './interfaces'

const PageSelector = ({ page, pages = 0, setPage }: PageSelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 rounded-3xl border border-violet-400 bg-violet-50 px-2 py-1">
      {pages >= 1 ? (
        <>
          <button
            className="disabled:text-violet-400"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage(--page)}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <ul className="flex items-center justify-center gap-2">
            {paginate(page, pages).map((pageNum, id) =>
              pageNum > 0 ? (
                <li
                  key={pageNum}
                  className={`${
                    pageNum === page && 'bg-violet-800 font-semibold text-violet-50'
                  } flex h-6 w-6 items-center justify-center rounded-full text-sm`}
                >
                  <button onClick={() => setPage(pageNum)}>{pageNum}</button>
                </li>
              ) : (
                <span key={id}>...</span>
              ),
            )}
          </ul>
          <button
            className="disabled:text-violet-400"
            aria-label="Next page"
            disabled={page === pages}
            onClick={() => setPage(++page)}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </>
      ) : (
        'No pages'
      )}
    </div>
  )
}

export default PageSelector
