export interface PageProps {}

export interface HeaderType {
  title: string;
  metaDesc: string;
  fav?: string;
}

export type ReduxAction = {
  type: string;
  data: any;
};
