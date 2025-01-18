import PaginationButton from '@/Components/PaginationButton';
import { router } from '@inertiajs/react';
import { CampaignsResults } from '../Index';

type Props = {
  campaigns: CampaignsResults;
  search: string;
  withTrashed: boolean;
};

export function PaginationSection({ campaigns, search, withTrashed }: Props) {
  const totalPages = Math.ceil(campaigns.total / campaigns.per_page);

  const currentPage = campaigns.current_page;

  let middlePages: number[] = [];

  if (totalPages <= 5) {
    middlePages = Array.from({ length: totalPages - 2 }, (_, i) => i + 2);
  } else {
    if (currentPage <= 3) {
      middlePages = [2, 3, 4];
    } else if (currentPage >= totalPages - 2) {
      middlePages = [totalPages - 3, totalPages - 2, totalPages - 1];
    } else {
      middlePages = [currentPage - 1, currentPage, currentPage + 1];
    }
  }

  return (
    <div className="flex flex-col-reverse items-start justify-between gap-5 mt-8 lg:mt-4 lg:items-center lg:gap-0 lg:flex-row">
      <p className="text-sm">
        Showing{' '}
        <span className="font-bold text-gray-200">{campaigns.from}</span> to{' '}
        <span className="font-bold text-gray-200">{campaigns.to}</span> |{' '}
        <span className="font-bold text-gray-200">{campaigns.total}</span>{' '}
        campaigns
      </p>

      <div className="flex items-center gap-2">
        <PaginationButton
          onClick={() =>
            router.get(
              route('dashboard', {
                page: 1,
                search,
                withTrashed
              }),
              {},
              { preserveState: true, replace: true }
            )
          }
          isActive={currentPage === 1}
        >
          1
        </PaginationButton>

        {middlePages[0] > 2 && <span className="text-gray-400">...</span>}

        {middlePages.map((page) => (
          <PaginationButton
            key={page}
            onClick={() =>
              router.get(
                route('dashboard', {
                  page,
                  search,
                  withTrashed
                }),
                {},
                { preserveState: true, replace: true }
              )
            }
            isActive={page === currentPage}
          >
            {page}
          </PaginationButton>
        ))}

        {middlePages[middlePages.length - 1] < totalPages - 1 && (
          <span className="text-gray-400">...</span>
        )}

        {totalPages > 1 && (
          <PaginationButton
            onClick={() =>
              router.get(
                route('dashboard', {
                  page: totalPages,
                  search,
                  withTrashed
                }),
                {},
                { preserveState: true, replace: true }
              )
            }
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationButton>
        )}
      </div>
    </div>
  );
}
