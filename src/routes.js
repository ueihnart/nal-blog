import { Route, Switch } from "react-router";
import { Blog } from "./routers/Blog";
import { Home } from "./routers/Home";

export const routes = {
  home: "/",
  blog: "/blog/:id",
};
export const Routes = () => (
  <Switch>
    <Route exact path={routes.home} children={<Home />} />
    <Route exact path={routes.blog} children={<Blog />} />
  </Switch>
);
