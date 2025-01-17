---
id: hello
title: What Is Static?
sidebar_label: Hello React
sidebar_position: 1
description: An introduction to React and how to get started with it.
path: react
---

# Hello, React!

Welcome to the React documentation!

## Getting Started

To get started with React, you need to install it using npm or yarn:

```bash
npm install react react-dom
```

or

```bash
yarn add react react-dom
```

## Creating a Component

Here's a simple example of a React component:

```jsx
import React from 'react';

function HelloWorld() {
  return <h1>Hello, world!</h1>;
}

export default HelloWorld;
```

## Rendering the Component

To render the component, you can use `ReactDOM.render`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld';

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
```

## Learn More

To learn more about React, check out the [official documentation](https://reactjs.org/docs/getting-started.html).

```

```
