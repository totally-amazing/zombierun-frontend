# 🧟‍♂️Zombierun

`#달리기` `#건강` `#좀비` `#게임`

### 좀비와 함께 살벌한 ‘러닝’을 시작하세요

<br />

# 📖contents

[About Zombierun](#about-zombierun)
[기술스택](#기술스택)  
[파일구조](#파일구조)  
[동기](#동기)  
[스케쥴](#스케쥴)  
[파일](#파일)  
[에러와 함께](#에러와-함께)  
[이런 것에 관심을 갖게 되었습니다](#이런-것에-관심을-갖게-되었습니다)  
[리뷰](#리뷰)

<br />

# About Zombierun

<details>
<summary>General</summary>
<div markdown="1">

- 구글 oAuth 로그인
- 이전 러닝의 결과 기록 열람
- 종합 러닝 기록 열람

<img width="345" alt="스크린샷 2022-03-28 15 20 49" src="https://user-images.githubusercontent.com/80472881/160341676-35438477-12b5-46ba-bb08-8e1f913d6b7a.png">
<img width="345" alt="스크린샷 2022-03-28 15 43 08" src="https://user-images.githubusercontent.com/80472881/160341811-68d27cf1-98dc-44c1-ba7d-598e0d78f7fd.png">
<img width="345" alt="스크린샷 2022-03-28 15 43 22" src="https://user-images.githubusercontent.com/80472881/160341844-db9e3170-bd6b-459b-bf14-880471e75aa0.png">
</div>
</details>
<br />

<details>
<summary>Running</summary>
<div markdown="1">

- 러닝 시간, 좀비 속도 입력 가능
- 5초의 카운트 다운 후 200m의 거리 차이를 두고 게임 시작
- 하단에 좀비와 유저 사이의 거리 표시
- 거리에 따라 좀비의 이미지 확대 축소 및 음량 변동
- 결과 화면에서 메시지와 러닝 관련 정보 표시 (속도, 거리, 시간, 이동경로)

<img width="345" alt="스크린샷 2022-03-28 15 43 46" src="https://user-images.githubusercontent.com/80472881/160342075-387fe60f-d485-4f26-b2da-1011819883bf.png">
<img width="345" alt="스크린샷 2022-03-28 15 46 11" src="https://user-images.githubusercontent.com/80472881/160342166-25db7c7c-4efa-4132-b7d0-2653b1079e52.png">
</div>
</details>
<br />

<details>
<summary>Solo Mode</summary>
<div markdown="1">

- 러닝 시간, 좀비 속도 선택 가능
- 우상단에 옵션 버튼 클릭 시 배경음, 효과음 끄고 켜기 및 러닝 종료 가능
- 러닝 일시정지 가능
- 좀비와의 거리가 0 이하가 되면 게임 실패로 러닝 종료
- 좀비에게 잡히지 않은 채 러닝 시간이 끝나면 게임 승리로 러닝 종료

</div>
</details>
<br />

<details>
<summary>1:1 Mode</summary>
<div markdown="1">

- 1:1 모드 선택 시 인간, 좀비 중 역할 선택 가능
- 플레이어 모두 Ready 버튼을 누르면 Start 버튼으로 전환
- 상대방과 자신의 거리 차이 하단에 표시
- 인간 역할일 시 좀비에게 잡히지 않고 러닝이 종료되면 승리
- 좀비 역할일 시 인간을 따라 잡으면 승리

<img width="345" alt="스크린샷 2022-03-28 15 46 49" src="https://user-images.githubusercontent.com/80472881/160342307-582e3183-c009-4de3-805c-48b428c8c96a.png">
</div>
</details>
<br />

<details>
<summary>Survival Mode</summary>
<div markdown="1">

- 2명 이상의 다수 인원 방에 참여 가능
- 플레이어 모두 Ready 버튼을 누르면 Start 버튼으로 전환
- 러닝 스크린에서 살아남은 플레이어 수 좌상단에 표시
- 좌상단의 숫자가 1이 될 시에 승리

<img width="345" alt="스크린샷 2022-03-28 15 47 07" src="https://user-images.githubusercontent.com/80472881/160342442-ec1e6bed-2c17-416f-83dd-3fa02c2527b5.png">
</div>
</details>
<br />

# 기술스택

### Common

Husky, Eslint, Prettier, Git

### Front-End

  <details>
  <summary>Expo</summary>
  <div markdown="1">

- Expo - av: 사운드 관련 파일 사용을 위해 Expo에서 공식 지원하는 라이브러리
  </div>
  </details>

    <details>
    <summary>React-Native</summary>
    <div markdown="1">

  - React-navigation V6: 스크린 전환 및 UI 헤더

  </div>
  </details>

    <details>
    <summary>Redux</summary>
    <div markdown="1">

  - Redux Tool Kit
  - Redux Thunk
  </div>
  </details>

    <details>
    <summary>Network</summary>
    <div markdown="1">

  - axios
  - socket.io-client
  </div>
  </details>

    <details>
    <summary>Test</summary>
    <div markdown="1">

  - Jest
  - TestingLibrary
  </div>
  </details>

    <details>
    <summary>Geolocation api</summary>
    <div markdown="1">

- Expo Location
- Google Map API
</div>
</details>

### Back-End

  <details>
  <summary>MongoDB</summary>
  <div markdown="1">

  - Mongoose
- Atlas(Database Management)
  </div>
  </details>

    <details>
    <summary>Node.js</summary>
    <div markdown="1">
    </div>
    </details>
   
    <details>
    <summary>Express</summary>
    <div markdown="1">

    - express-async-errors: 비동기 에러 핸들링
    </div>
    </details>
   
    <details>
    <summary>Socket.io</summary>
    <div markdown="1">
    </div>
    </details>

    <details>
    <summary>Test</summary>
    <div markdown="1">

  - jest
  - http-node-mocks
</div>
</details>  
<details>
<summary>JWT</summary>
<div markdown="1">  
</div>
</details>

# 파일구조

![파일 구조](https://user-images.githubusercontent.com/80461702/154829278-43b00953-5ecd-4956-9804-0bdbd55577a5.png)

# 동기

좀비런 프로젝트는 달리기를 게임처럼 즐겁게 만들어 유산소 운동에 대한 심리적 장벽을 낮추고자 하는 생각에서 시작되었습니다. 하루 30분의 유산소 운동은 두뇌 발달에 긍정적 영향을 미치고 사망위험을 29% 낮춘다고 합니다. 어릴 적 술래잡기를 할 땐 숨차는지 모르고 달렸던 것처럼, 좀비와의 게임을 통해 몸도 마음도 건강해지는 달리기를 시작해보시는건 어떠신가요?

<br />

# 스케쥴

개발기간 : 2월 3일 ~ 2월 19일 (16일)

- 1주차
  - 개발환경 세팅 및 프론트엔드 및 백엔드 파일구조 작성
  - 깃 연결 및 백엔드 REST API 설정
  - 공통 컴포넌트 및 스크린 작성
  - 로그인 구현 및 코드 PR에 대한 의논
- 2주차
  - 핵심 기능 플로우 작성
  - 프론트엔드와 백엔드 연결 및 앱 구동
  - 리펙토링 및 버그 수정
  - 배포

<br />

# 파일

[apk 다운로드](https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40hyemin916/zombierun-2fd5e34cdf854f05893933cb6b627d5f-signed.apk)

<br />

# 에러와 함께

### Redux reducer에서 socket.io를 사용해서 마주쳤던 Proxy 에러

리덕스 리듀서 내부에서 socket 통신에 반응하여 state를 변경하는 로직을 작성하다가 `proxy has already been revoked. no more operations are allowed to be performed on it`라는 에러를 마주쳤다. immer로 인해 발생된 에러였다. Redux Toolkit은 리듀서에 자체적으로 immer를 적용시킨다. immer는 사용자가 state를 변경할 때, 원본 객체의 proxy 객체인 draft에 변경 사항을 적용하는 방식으로 원본 데이터의 불변성을 유지시켜준다. immer의 소스 코드를 보니 immer는 draft가 업데이트 되면 proxy를 revoke하는 함수를 호출했다. state가 한차례 업데이트 되어 proxy가 revoke 됐음에도, 리듀서 함수 내부에서 연결된 socket으로 state를 변경하는 코드가 다시 실행되어 에러가 발생한 것이었다.

### 잘못된 문제 정의

안드로이드 apk 파일로 앱을 빌드한 이후에 기존에 잘 작동하던 Navigation이 한 컴포넌트에서 작동되지 않았다. 개발 환경에서는 발생하지 않았던 문제였기에 팀원들 모두 적잖게 당황했고 다들 Navigation의 동작 문제로만 정의하고 해당 문제를 해결하기 위해 많은 시간을 쏟았다. 해결의 실마리는 에러가 발생한 컴포넌트에서 사용되는 라이브러리와 공식 문서를 살피며 찾아 낼 수 있었다. 알고보니 Google Map의 API Key에 값이 할당되지 않아 발생한 문제였다. 무언가 문제가 발생하면 섣부르게 문제를 판단하지 말고 관련 라이브러리의 공식 문서 등을 다시 찾아보고 고심해서 문제를 정의해야 함을 깨달았다. 문제를 해결하는 것 뿐만이 아니라 문제를 정의 하는 것 또한 중요하다는 점을 명심하게 되었다.

### 디버깅 관련 에러처리

리엑트 네이티브 경우 디버깅을 할 때 안드로이드 스튜디오 또는 Xcode에서 가상의 휴대폰을 사용해서 화면을 보며 앱을 만들 수 있었다. 웹을 통해 디버깅을 할 때보다 느린 이슈와 잦은 렉으로 인한 시간이 많이 소요됐다. 특히 구현 과정 중 하나 였던, 1대1 모드에서 두 개의 가상 휴대폰을 킬 경우 이슈들이 더 심해져서 디버깅에 많은 시간이 소요가 됐다. 사전에 디버깅 관련 툴이나 라이브러리를 조사한 후 확인했다면 시간단축과 버그들을 빠른 시간내에 발견할 수 있는 점을 간과했었다. 하지만 이 시간을 통해 디버깅의 중요성과 한 번을 디버깅하더라도 자세하고 꼼꼼하게 해야 하는 부분을 다 잡았던 시간이였다.

<br />

# 이런 것에 관심을 갖게 되었습니다

개발을 시작한 후 첫번째 협업으로 저희는 지금까지 만든 앱 중 가장 규모가 큰 앱을 만들게 되었습니다. 새로운 경험을 통해 저희는 이런 것에 대해 더 관심을 갖게 되었습니다.

### 함수형 프로그래밍

앱의 기능이 하나씩 늘어날수록 코드의 복잡도가 기하급수적으로 늘어나는 것을 느꼈다. 특히 리액트 컴포넌트, 리덕스 리듀서, 소켓으로 데이터가 전달되는 과정에서 함수에서 어떤 데이터가 어떻게 가공되는지 추적이 어려워 작은 버그에도 디버깅 시간이 매우 길어졌다. 함수형 프로그래밍에 더 알아보고 코드에도 적용시켜 다음 프로젝트에서는 좀 더 예측 가능하고 디버깅이 용이한 앱을 만들어보고 싶어졌다.

### 객체 지향 프로그래밍

이번 프로젝트에서 es6의 클래스 문법으로 로직을 분리하여 객체 지향을 구현하려 해보았지만 아쉬움이 많이 남았다. 클래스들이 각자 맡은 책임에 대해 강한 응집력을 가지고 있는지, 모듈끼리의 디커플링은 잘 되었는지 좀 더 고심해볼 수 있는 좋은 계기가 된 것 같다. 다음에는 더 발전된 객체 지향 코드를 구현해서 유지보수하기 좋은 앱을 만들어보고 싶다.

### Geolocation API

Geolocation API는 이번 프로젝트의 핵심 기능과 관련이 깊다. 단순히 유저가 직접 입력하는 값이 아니라, 움직이는 유저의 실시간 데이터를 받아서 처리하는 코드를 짤 수 있는 기회는 이번이 처음이었다. 그렇기에 해당 API를 다룰 때의 옵션 설정이나 처리 방식에 있어서 미숙한 면이 있었는데 만약 차후에 비슷한 프로젝트를 진행한다면 해당 API가 제공하는 다른 기능들과 유저와 밀접한 다른 데이터들 활용해보고 싶다.

### 상태관리

앱의 기능이 커지고 props drilling이 깊어지다보니, 지역 상태를 다른 컴포넌트에서 활용할 때 발생하는 리렌더링으로 버그가 생겨 불편해졌다. 그래서 리덕스 스토어에서 전역 상태로 관리를 하기 시작했다. 그 결과, 코드가 깔끔해졌다. 또한 다른 컴포넌트에서도 해당 상태를 사용할 수 있기 때문에 때문에 관리가 훨씬 편해졌다. 부트캠프에서 상태관리에 대한 중요성을 많이 들었을때는 크게 와닿지 않았었는데, 이번 팀 프로젝트를 통해 상태관리 중요성을 많이 느꼈다. 리액트와 리덕스의 차이와 리덕스의 장점 및 상태관리에 대한 부분을 같이 알아보면서 깊게 생각 할 수 있었던 시간이였다.

<br />

# 리뷰

[박혜민](https://github.com/hyemin916)

협업하며 프로젝트를 꾸리는 것은 혼자서 작은 규모의 코드를 쓰는 것과는 아주 다르다는 점을 느꼈다. 협업할 때는 계획을 섬세하게 세우고 커뮤니케이션에도 많은 노력을 쏟아야 한다는 것을 알게 되었다. 명확한 변수명, 모듈간 낮은 의존성, 관심사의 분리 등이 왜 좋은 코드의 전제가 되는지 직접 체험해보고 깨달을 수 있는 시간이었다. 2주라는 짧은 시간 동안 포기하지 않고 열심히 달려와 준 팀원들에게도 감사한 마음을 전하고 싶다.

[신요한](https://github.com/yohrran)

어떤 프로젝트를 만든적도 처음이지만 팀원과 함께 팀을 이루어서 같이 프로젝트가 처음이라 생소하면서도 기대가 됐다. 빈 도화지를 놓고 기획하고 계획을 짜며 서로 다름에서 나오는 시너지로 같이 코딩을 한다는 것은 생각보다 재밌으면서도 때론 어려운 상황도 마주치기도 했다. 그러면서 서로의 다름을 인정하면서도 더 좋은 로직을 짜기 위해서 더 힘을 모았던 것 같다. 자연스럽게 팀 분위기도 살아나고, 스스로에게 맡겨진 하루의 일과를 끝내면서 점점 코드가 통일성있게 맞춰가는 모습을 보면서 신기하면서도 굉장히 놀라웠다. 2주라는 시간이 정말 빠르게 흘러갔지만 그 누구도 포기하지 않고 같이 잘 마무리할 수 있어서 정말 감사했고 좋은 시간이였던 것 같다.

[구완모](https://github.com/Vaatz95)

이번에 팀 프로젝트를 진행 하기전 부터 번아웃 상태가 와서 심적으로 고생을 많이 하고 있었다. 나의 생산력이 떨어지는 건 곧 팀 전체의 생산력에 영향력을 미치는 부분 이었기에 팀원 들에게 폐를 끼치지 않기 위해 노력하였다. 팀 프로젝트에 있어서 가장 중요한 것은 팀원과의 협업 이고 서로의 싱크를 맞추는 ‘소통’이 이 부분에 가장 큰 영향력을 미쳤다. 팀원들은 나의 상태를 이해해주고 매번 격려 해주면서 내가 이 상황을 극복하기 위해 도와주고 또한 다그치면서 나를 이끌어 주었다. 번아웃 상태 였지만 프로젝트의 가장 핵심 컴포넌트 기능을 팀원들의 응원을 통해 완성할 수 있었다. 프로젝트 중간에 서로의 성향 차이로 인해 한 차례 홍역을 겪었지만 마음을 터놓고 서로의 감정을 공유하면서 서로의 다름을 인정하고 이러한 차이를 무시하는게 아니라, 어떻게 하면 팀 전체의 시너지를 위해 돌릴 수 있을지 고민하면서 팀 전체가 성장 할 수 있는 좋은 기회가 되었다고 생각한다. 2주 동안, 지쳐버린 나 자신과의 싸움, 팀원 과의 다름으로 인해 오는 스트레스, 기한에 대한 압박감.. 여러 모로 힘든 상황에 둘러 쌓였지만 '팀' 과 함께에서 헤쳐 나갈 수 있었던거 같다. 이번 프로젝트를 통해 성장한 나, 그리고 고생한 팀원에게 아낌없는 칭찬을 주고 싶다.
