export interface IRoute {
  path?: string;
  url?: string;
  name?: string;
  redirect?: string;
  component?: string;
  action?: () => void;
}
