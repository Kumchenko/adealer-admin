import { paginate } from '@/utils/paginate'
import { MouseEvent, useCallback, useMemo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { PageSelectorProps } from './interfaces'

const PageSelector = ({ page, pages = 0, changePage }: PageSelectorProps) => {
    const handleClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            const pageString = (e.target as HTMLButtonElement).textContent
            if (pageString) {
                changePage(parseInt(pageString))
            }
        },
        [changePage],
    )

    const pageElems = useMemo(
        () =>
            paginate(page, pages).map((pageNum, id) =>
                pageNum > 0 ? (
                    <li
                        key={pageNum}
                        className={`${
                            pageNum === page && 'bg-violet font-semibold text-violet-white'
                        } flex h-6 w-6 items-center justify-center rounded-full text-sm`}
                    >
                        <button onClick={handleClick}>{pageNum}</button>
                    </li>
                ) : (
                    <span key={id}>...</span>
                ),
            ),
        [page, pages],
    )

    return (
        <div className="flex items-center justify-center gap-1 rounded-3xl border bg-violet-white px-2 py-1">
            {pages >= 1 ? (
                <>
                    <button
                        className="disabled:text-violet-light"
                        aria-label="Previous page"
                        disabled={page === 1}
                        onClick={() => changePage(page - 1)}
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <ul className="flex items-center justify-center gap-2">{pageElems}</ul>
                    <button
                        className="disabled:text-violet-light"
                        aria-label="Next page"
                        disabled={page === pages}
                        onClick={() => changePage(page + 1)}
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
