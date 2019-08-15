# React + TypeScript + Storybook 프로젝트 설정

# 리액트 타입스크립트
```
npx create-react-app my-app --typescript
```

# SASS
```
npm install node-sass --save
```

# 스토리북
https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B6%81-react-storybook-%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EA%B3%BC-%ED%99%9C

https://hyunseob.github.io/2018/01/08/storybook-beginners-guide/

리액트 스토리북(Storybook)은 UI 컴포넌트를 직접 보면서 개발을 할 수 있는 환경을 제공하는 도구
스토리북은 프로젝트 내에서 독립된 환경으로 실행 되기 때문에, 앱의 특정한 의존성에서 벗어나서 순수 UI 개발에 집중
리액트 네이티브(React Native) 환경에서도 사용

스토리북 활용
개발자 본인 뿐 아니라, 팀(기획자, 디자이너)과의 협업 구조에서도 원할한 커뮤니케이션과 빠른 이터레이션(iteration)을 통한 개발 생산성 향상

UI 개발을 하다 보면 빈번하게 일어나는 디자인 스펙 오류, 기획 프로세스 오류 등을 빠르게 확인 하여 수정
개발자는 컴포넌트를 더욱 유연하고, 재사용 가능한 컴포넌트 개발
https://storybook.js.org/examples/


# 스토리북 화면구조
* Manager App: 모든 스토리가 나열되는 곳. 여기서 선택된 스토리를 프리뷰 패널에서 확인 할 수 있다.
* Preview Panel: 매니저 앱에서 선택된 스토리(컴포넌트)가 렌더링 되는 곳
* Add-on Panel: 다양한 애드온을 통해 컴포넌트와 인터렉션을 하거나 컴포넌트 정보등을 보여주는 곳으로 기본 설치시 Action Logger 패널이 추가되어 있다.



https://www.learnstorybook.com/react/en/get-started/

# 스토리북 설치
```
npm i -D @storybook/react
```

.storybook 폴더 생성
- addons.js
- config.js
- webpack.config.js

> mkdir .storybook src
> touch .storybook/config.js .storybook/addons.js .storybook/webpack.config.js


package.json
{
  "scripts": {
    "storybook": "start-storybook -p 9001 -c .storybook"
  }
}


config.js
```
import { configure } from '@storybook/react';
const req = require.context('../src/components', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}
configure(loadStories, module);
```
```
import { configure } from '@storybook/react';
const req = require.context('../src/components', true, /\.stories\.(js|jsx)$/);
function loadStories() {
  req.keys().forEach(filename => {
    req(filename)
  })
}
configure(loadStories, module);
```



#타입스크립트 설정
npm install -D awesome-typescript-loader
npm install -D @types/storybook__react
npm install -D @storybook/addon-info react-docgen-typescript-loader

#testing
npm install -D jest "@types/jest" ts-jest



.storybook 폴더 webpack.config.js 파일생성
```
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
      // Optional
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
```

```
const path = require("path");
const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../stories');
//components 폴더 안에 스토리가있는 경우 스토리 경로가 필요하지 않습니다

module.exports = ({config}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH, STORIES_PATH],
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
          options: {
            configFileName: './.storybook/tsconfig.json' // tsconfig 별도 사용시
          }
        },
        { loader: require.resolve('react-docgen-typescript-loader'), }
      ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
```


.storybook 폴더 tsconfig.json 파일생성
"module": "commonjs", 아래로 변경 에러발생
"module": "esnext",
원본
```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
```




```

{
  "compilerOptions": {
    "outDir": "build/lib",
    "module": "commonjs",
    "target": "es5",
    "lib": ["es5", "es6", "es7", "es2017", "dom"],
    "sourceMap": true,
    "allowJs": false,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDirs": ["src", "stories"],
    "baseUrl": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "declaration": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "scripts"]
}
---

{
  "compilerOptions": {
    "baseUrl": "./",
    "allowSyntheticDefaultImports": true,
    "module": "es2015",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": false,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": "../",
    "outDir": "dist",
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "declaration": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "build",
    "dist",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.ts",
    "**/*/*.test.ts",
    "examples"
  ]
}

```

cd my-react-app && getstorybook
npm run storybook


# 타입스크립트
interface Props 는 컴포넌트에 들어오는 인자에 대한 타입들을 TypeScript 문법으로 미리 선언
기존의 React에서는 컴포넌트에서 사용하는 인자들에 대한 정의를 PropTypes로 정의 하였지만 TypeScript는 interface라는 구현체를 구현