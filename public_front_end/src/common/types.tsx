export interface PageProps {}

export interface HeaderType {
  title: string;
  canonical: string;
  meta: {
    desc: string;
    og: {
      title: string;
      description: string;
      images: Array<{
        url: string;
        width?: number;
        height?: number;
        alt?: string;
        type?: string;
      }>;
      url: string;
    };
  };
}

export type ReduxAction = {
  type: string;
  data: any;
};
