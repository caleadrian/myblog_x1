import React from 'react';
import { Route, Link } from 'react-router-dom';

const routes = {
  '/admin': 'Home',
  '/admin/settings': 'Settings',
  '/admin/posts': 'Posts',
};

const findRouteName = url => routes[url];

const getPaths = (pathname) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr, index) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });

  return paths;
};

const BreadcrumbsItem = ({ match, ...rest }) => {
  const routeName = findRouteName(match.url);
  if (routeName) {
    return (
      match.isExact ?
      (<li className="breadcrumb-item active" aria-current="page">{routeName}</li>) :
      (
        <li className="breadcrumb-item">
          <Link to={match.url || ''}>
            {routeName}
          </Link>
        </li>
      )
    );
  }
  return null;
};

const Breadcrumbs = ({ location : { pathname }, match, ...rest }) => {
  const paths = getPaths(pathname);
  return (
    <ol className="breadcrumb py-2">
      {paths.map(function(p,i) {

        return (<Route key={i} path={p} component={BreadcrumbsItem} />)

      })}
    </ol>
  );
};

const props = () => (
  <React.Fragment><Route path="/:path" component={Breadcrumbs} {...props} /></React.Fragment>
);

export default props
