import { Route, Switch } from "react-router";
import { Blog } from "./routers/Blog";
import { Home } from "./routers/Home";

export const routes = {
  home: "/",
  blog: "/blog",
};
export const Routes = () => (
  <Switch>
    <Route exact path={routes.home} children={<Home />} />
    <Route path={routes.blog} children={<Blog />} />
  </Switch>
);
