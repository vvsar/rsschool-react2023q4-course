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
  word: string;
  perPage: string;
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
