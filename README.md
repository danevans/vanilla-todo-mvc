# Minimal TODO

A todo list web app in the spirit of [todomvc](http://todomvc.com) but without
the MVC. The goal here was, just as an exercise, implement the features of the
todo app with as little semblance of a framework as possible. So there not only
is no framework but no non-browser dependencies at all; no jQuery, backbone, etc.

In addition this avoids the approach of the [vanilla JS](https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs)
implementation which implements its own models, views, and controllers.

This project doesn't bother with backwards compatibility, modules, namespaces,
avoiding globals, comments, or tests.

The one feature currently missing from this implementation is local storage
support.

## Goals

The goal was to see how long it would take to implement this at a casual pace
and how much code it would turn out to be.

The answers are: ~2 hours and ~150 lines.

## Running the code

You can run the code by downloading this repo and opening up `index.html` in a
browser.
