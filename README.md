# Critical CSS

Critical CSS is a framework for better browser defaults with theming capabilities.

## Code Conventions

* [CSS Styleguide](https://github.com/nathanjessen/css)
* [Naming UI components in OOCSS](http://csswizardry.com/2014/03/naming-ui-components-in-oocss/)


## Technologies used:

- [PostCSS](http://postcss.org/)


## Issues

If you discover a bug, [report it here](https://github.com/nathanjessen/critical-css/issues) or even better, edit and send a pull-request with the fix.


## Goals / Key Features

1. Clear folder structure
2. Scalable and maintainable stylesheets
3. Easy setup
4. Use of Native CSS Features
5. Simple tools with the addition of PostCSS to process stylesheets
6. Ensure optimal performance
7. Be a CSS architecture and methodology to help build sites rapidly
8. Remove the complexity that can be introduced my other tools and frameworks
9. Encourage developers to begin using native CSS and learn about the cool stuff being added to CSS like functions and CSS variables


## File Structure
For now, all CSS files are located in the CSS directory. There should be a single point of entry for importing all files. These files get imported using CSS import plugin.

1. main.css
2. root.css (Default variables)
3. Components
4. Specifics
5. Vendor


## Browser Support

The latest and greatest (and IE11+). Browsers should support flexbox and CSS Custom Properties (CSS variables). Graceful degradation instead of progressive enhancement.


# Additional Resources
1. [Ways to Reduce Content Shifting on Page Load](https://www.smashingmagazine.com/2016/08/ways-to-reduce-content-shifting-on-page-load/)
2. [Need for Speed 2](https://jonsuh.com/blog/need-for-speed-2/)
3. [How We Load Web Fonts Progressively](https://jonsuh.com/blog/font-loading-with-font-events/)
4. [Flash of Faux Text -- Still More on Font Loading](https://www.zachleat.com/web/foft/)
