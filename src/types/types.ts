export interface SearchState {
  keyWord: string;
  perPage: string;
  currentPage: string;
}

export type SearchData = {
  keyWord: string;
  perPage: string;
  currentPage: string;
};

export type HeaderProps = {
  keyWord: string;
  perPage: string;
  onSubmit: (value: string) => void;
  onPerPageChange: (value: string) => void;
};

export type DataItem = {
  id: string;
  urls: { small: string };
  user: { name: string };
};

export type ResponseData = {
  total: number;
  total_pages: number;
  results: DataItem[];
};

export type ResultsPageProps = {
  pageType: string;
  totalNumber: number;
  data: DataItem[];
};

export type DataItemExtended = {
  id: string;
  description: string | null;
  alt_description: string;
  urls: { regular: string };
  user: { name: string };
  exif: { name: string | null };
};

// Pagination

export type PaginationProps = {
  totalPages: number;
  changeCurrentPage: (value: string) => void;
};

export type BackButtonProps = {
  pageNumber: string;
  onClick: () => void;
};

export type ForwardButtonProps = {
  pageNumber: string;
  totalPages: number;
  onClick: () => void;
};

// Details

export type DetailsState = {
  isOpen: boolean;
  id: string;
};

// Loadings

export type LoadingsState = {
  resultsLoading: string;
  detailsLoading: string;
};
