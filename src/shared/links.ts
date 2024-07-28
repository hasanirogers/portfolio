import { svgCodePen, svgGitHub, svgLinkedIn, svgNPM, svgStackBlitz, svgTwitter } from "../assets/svgs";
import routes from "./routes";
import { IRoute } from "./types";

export const getLinks = () => {
  const nonRouteLinks: IRoute[] = [{
    url: 'https://blog.hasanirogers.me',
    name: 'blog'
  }];

  const routeLinks: IRoute[] = [...routes, ...nonRouteLinks ]
    .filter(link => (!link.redirect && !link.path?.includes('/:')));

  return routeLinks;
}

export const socialLinks = [
  {
    href: "https://twitter.com/hasanirogers",
    title: "Twitter",
    icon: svgTwitter
  },
  {
    href: "https://github.com/hasanirogers",
    title: "Git Hub",
    icon: svgGitHub
  },
  {
    href: "https://codepen.io/hasanirogers",
    title: "Code Pen",
    icon: svgCodePen
  },
  {
    href: "https://www.npmjs.com/~hasanirogers",
    title: "NPM",
    icon: svgNPM
  },
  {
    href: "https://www.linkedin.com/in/hasani-rogers-85523829/",
    title: "Linked In",
    icon: svgLinkedIn
  },
  {
    href: "https://stackblitz.com/@hasanirogers",
    title: "Stackblitz",
    icon: svgStackBlitz
  }
];
