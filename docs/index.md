# React Router Component

React router component allows you to define application routes in your [React][]
in a declarative manner, directly as a part of your component hierarchy.

To use it, you just return a configured router component from your `.render()`
function:

    <Locations>
      <Location path="/" handler={MainPage} />
      <Location path="/users/:username" handler={UserPage} />
    </Locations>

Alternatively, if you don't prefer JSX:

    Locations(
      Location({path: "/", handler: MainPage}),
      Location({path: "/users/:username", handler: UserPage}))

While having a nice API this approach allows you to dynamically reconfigure
routing based on your application state. For example you can return a different
set of allowed locations for anonymous and signed-in users.

React router component handles `"popstate"` event and makes appropriate
transitions between locations (that means back button works as expected). It
also provides a method to navigate between locations which sets the correct
`window.location` by using `window.history.pushState(..)` function.

React router component also provides advanced features like support for full
page server side rendering and nested and contextual routers.

Its functionality is tested using [Saucelabs][] on all modern browsers (IE >=
10, Chrome >= 27, Firefox >= 25, Safari >= 6 and Mobile Safari on iPhone and
iPad >= 6). Basically, the browsers which support the HTML5 History API.

## Installation

React router component is packaged on npm:

    % npm install react-router-component

## Basic usage

First you require `react-router-component` library:

    var React = require('react')
    var Router = require('react-router-component')

If you are using JSX, don't forget to bring names from a library into scope,
cause JSX doesn't support namespaces yet:

    var Locations = Router.Locations
    var Location = Router.Location

Now you can define your application as a regular React component which renders
into `Locations` router:

    var App = React.createClass({

      render: function() {
        return (
          <Locations>
            <Location path="/" handler={MainPage} />
            <Location path="/users/:username" handler={UserPage} />
          </Locations>
        )
      }
    })

You also need to `MainPage` and `UserPage` components (these are just regular
React components) or require them from a different module:

    var MainPage = React.createClass({...})
    var UserPage = React.createClass({...})

The final part is to render your `App` component which activates your router:

    React.renderComponent(App(), document.body)

## Navigating between locations

To navigate between different locations React router component provides a `Link`
component. It renders into `<a>` DOM element but handles `"click"` by activating
a different location in the router.

As an example, let's see how `MainPage` component can be implemented with the
usage of the `Link` component to transition to a `UserPage`:

    var Link = require('react-router-component').Link;
    var MainPage = React.createClass({

      render: function() {
        return (
          <div>
            Hello, this is main page of the application!
            Proceed to my <Link href="/users/andreypopp">user page</Link>.
          </div>
        )
      }
    })

Alternatively, if you have a reference to a router component instance, you can
call its `.navigate(href)` method to do a transition to a different location.
You can acquire a reference to a router by using [Refs][React-Refs] mechanism.

## Advanced usage

Advanced usage includes support for full page server side rendering and nested
and contextual routers.

[React]: http://facebook.github.io/react/
[React-Refs]: http://facebook.github.io/react/docs/more-about-refs.html
[Saucelabs]: saucelabs.com