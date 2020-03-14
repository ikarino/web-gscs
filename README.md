<p align="center">
  <img src="https://github.com/ikarino/web-gscs/blob/master/public/logo.png?raw=true" width=40%>
</p>
<h2 align="center">web-gscs</h2>

[![Netlify Status](https://api.netlify.com/api/v1/badges/1ac6a824-7bf1-454f-a2fb-7c71d07d8e03/deploy-status)](https://app.netlify.com/sites/web-gscs/deploys)

typescript で書き直しているブランチ

scs の実行には web worker api を使う。

## TODO

投稿機能に関わる firebase/firestore は後回しで、とりあえず Run/Playground が動くにようにがんばる。

- [x] worker api
- [x] inbound links
- [x] LocalStorage 保存機能
- [x] Run
  - [x] Field
  - [x] Friend
    - [x] テンプレート切替時の Dialogue 未反映問題
    - [x] 追加/削除機能
  - [x] Conifg
    - [x] Probability Config
  - [x] Result
    - [x] SummaryGrid(UI と円グラフの反映速度)
    - [x] BarChartGrid
    - [x] StatisticsGrid
- [x] Playground
- [x] ♥Records
- [ ] ♥Record Details
  - [x] 基本情報の表示
  - [x] ロード機能
  - [ ] 結果/投稿者情報
- [x] About
- [ ] ♥Dashboard
  - [x] 最近の投稿
  - [ ] web-gscs 更新情報
- [x] firebase auth 統合
- [ ] migration
  - [x] Record 抽出
  - [ ] Record 再登録
- [x] firestore 統合

## Dependencies

```
yarn create react-app web-gscs --typescript
```

### core

- workerize-loader
- react-router-dom
- @types/react-router-dom
- react-redux
- @types/react-redux
- @reduxjs/toolkit

### react components

- @material-ui/core
- @material-ui/icons
- victory
- @types/victory

### scs

- torneko3js

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
