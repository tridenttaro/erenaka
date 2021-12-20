export type ChangePageProps = {
  path: string;
  query?: { input: string };
};

export type ChangePage = {
  (props: ChangePageProps): void;
};
