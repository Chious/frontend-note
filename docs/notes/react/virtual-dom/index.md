---
title: 【Gitlab】什麼是單向資料流
sidebar_position: '1'
description: 什麼是單向資料流
tags: ['React', 'Virtual DOM']
---

## 什麼是單向資料流

```jsx
? : React如何觸發重新渲染？
```

[單向資料流、雙向資料流 - HackMD](https://hackmd.io/@pikachuchu/B18lNoKfY)

[https://schiou.notion.site/Redux-542880ac8d7646d0903876ad40f60be4?pvs=4](https://www.notion.so/542880ac8d7646d0903876ad40f60be4?pvs=21)

```jsx
const store = {
  counter: 0,
};

function incrementCounter() {
  store.counter++;
  render();
}

function render() {
  const counter = document.getElementById('counter');
  counter.textContent = store.counter;
}

incrementCounter(); // 初始計數為 1

// 沒有使用 Flux，因此很難追蹤資料變化的來源。
// 例如，如果我們想在按鈕點擊時遞增計數器，我們可以這樣做：

const button = document.getElementById('button');
button.addEventListener('click', incrementCounter);

// 但是，如果我們也想在其他地方遞增計數器，例如當資料發生變更時，我們需要重複相同的程式碼。
// 這會使程式碼變得難以維護和測試。
```

```jsx
const store = createStore(reducer);

function incrementCounter() {
  store.dispatch({ type: 'INCREMENT_COUNTER' });
}

function render() {
  const counter = document.getElementById('counter');
  counter.textContent = store.getState().counter;
}

store.subscribe(render);

incrementCounter(); // 初始計數為 1

// 使用 Redux，我們可以輕鬆地將計數器的遞增邏輯移至單一 Action：

const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function reducer(state = { counter: 0 }, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { counter: state.counter + 1 };
    default:
      return state;
  }
}

// 我們還可以將計數器的渲染邏輯移至 Redux 的 subscribe 方法：

const button = document.getElementById('button');
button.addEventListener('click', incrementCounter);
```

- 策略一（[vue 資料綁定](https://medium.com/andy的趣味程式練功坊/vue學習筆記-二-資料綁定與vue基礎-ad453cde5591)）：當資料更新後，人工判斷並手動更改 DOM

[https://codesandbox.io/s/96fzf5](https://codesandbox.io/s/96fzf5)

優點：只要開發操作較簡潔，可以減少多餘的 DOM 操作

缺點：完全依賴人為判斷

- 策略二：當資料變更後，將舊有的 DOM Element 全都清除，並回傳一個新的

[https://codesandbox.io/s/ke7msp](https://codesandbox.io/s/ke7msp)

優點：開發者只要專注於資料流，不用想考資料與畫面間的連動

缺點：可能造成不必要的 DOM 操作

## Component：商業邏輯的抽象化

- 描述 UI 結構 ⇒ 繪製出實體 DOM
  [https://react.dev/learn/describing-the-ui](https://react.dev/learn/describing-the-ui)

### 名詞解釋

<aside>
❓ 1. props 與 state 的差別在哪？

</aside>

- props：只能被讀取、描述資料
- children：子元素

```jsx
const virtualDOM = {
  type: 'div',
  props: {
    children: [
      {
        type: 'p',
        props: {
          children: ['目前計數：0'],
        },
      },
      {
        type: 'button',
        props: {
          onClick: () => setCount(count + 1),
          children: ['點我增加'],
        },
      },
    ],
  },
};

const virtualDOM2 = {
  type: 'div',
  props: {
    children: [
      {
        type: 'div',
        props: {
          children: ['目前計數：${state}'],
        },
      },
      {
        type: 'button',
        props: {
          onClick: () => setCount(count + 1),
          children: ['點我增加'],
        },
      },
    ],
  },
};
```

```jsx
// ⚠️錯誤用法

import React from 'react'

<Provider>

const [state, setState] = useState()

export default function ProductionListITem (state) {

	const [price, setPrice] = useState("10$")
   props.price= props.price * 0.9;

  return (
    <Drawer>
     <Route>
     {children}
     <Route/>
    </Drawer>
  )
}

<ShoppingList state={state} />

<Provider />

```

### 名詞解釋

<aside>
❓ 1. props 與 state 的差別在哪？
</aside>

- render：初始化
- re-render：當狀態改變造成的重新渲染

## State：觸發 Re-render 的機制

<aside>
💡 state = component 的內存

</aside>

```jsx
const [count, setCount] = useState(0);

// count: 該次state 的值
// setState: 用來更新state的方法
// 0: 初始值
```

初始化 ⇒ setState ⇒ 觸發 Component Function ⇒ 繪製新的 virtualDOM ⇒ 產生畫面

```jsx
function AppComponent(){

cosnt [count, setCount]=useState(0);

function (){

 count = count +1;
 setCount(count)


 v

}

if(...){
  useState();
}

for(1~10){
  useState(0);
}

array.forEach(()=>{
  useState();
})

}

useState();
```

## Reconciliation

## 1️⃣Render

### Render Phase

- 執行 component function，以 props 或 state 等資料來繪製出 React Element

### Commit Phase

- 由於第一次畫面上沒有任何物件，會觸發 appendChild()並放置到畫面中（mounted）

## 2️⃣Re-render

### Render Phase

- 再次執行 component function
- 將新舊版本做比較

setState ⇒ Object.is() ⇒ true/false 決定要不要 re-render

- 將新舊版本差異處交給 Commit Phase 去處理

### Commit Phase

- 步驟三：新舊比較、並產生實際的 DOM
