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

export type DataItemExtended = {
  id: string;
  description: string | null;
  alt_description: string;
  urls: { regular: string };
  user: { name: string };
  exif: { name: string | null };
};
