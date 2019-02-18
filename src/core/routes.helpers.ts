import { match } from 'react-router-dom';

export type RouteProps<RouteParams> = { match: match<RouteParams> };
export function getRouteParams<RouteParams>(props: RouteProps<RouteParams>): RouteParams {
  return props.match.params
};
