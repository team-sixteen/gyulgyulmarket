# 귤귤마켓🍊

### 🔸 프로젝트 개요

귤귤마켓 서비스는 자신의 스토어에서 판매하고 있는 상품(감귤)을 등록하여 홍보할 수 있는 SNS입니다.<br>
상품등록 뿐만이 아닌 글과 사진과 함께 게시물을 작성하여 자신의 일상을 공유할 수도 있습니다.<br>
다른 귤귤마켓 유저들을 팔로우하고 소식을 홈피드에서 확인해보세요. 다른 사용자와 메시지를 주고 받을 수 있습니다.<br>
피드를 구경하다가 마음에 드는 게시물을 발견했다면 좋아요를 누를 수 있고 댓글을 남기거나 공유를 할 수도 있습니다.
#### 프로젝트 기간 : 2022-01-03 ~ 2022-01-19
### 🔸 팀원 
<table>
    <tr height="160px">
        <td align="center" width="160px">
            <a href="https://github.com/dahhnym"><img height="130px" width="130px" src="https://github.com/dahhnym.png"/></a>
            <br />
            <strong>김다님</strong> <br />
            <strong>2022-01-03 ~ 07</strong>
        </td>
        <td align="center" width="160px">
            <a href="https://github.com/skgml0"><img height="130px" width="130px" src="https://github.com/jma1020.png"/></a>
            <br />
            <strong>김정민</strong> <br />
            <strong>2022-01-09 ~ 19</strong>
        </td>
        <td align="center" width="160px">
            <a href="https://github.com/junho0956"><img height="130px" width="130px" src="https://github.com/junho0956.png"/></a>
            <br />
            <strong>김준호</strong> <br />
            <strong>2022-01-03 ~ 19</strong>
        </td>
        <td align="center" width="160px">
            <a href="https://github.com/BigHuni"><img height="130px" width="130px" src="https://github.com/BigHuni.png"/></a>
            <br />
            <strong>허대훈</strong> <br />
            <strong>2022-01-03 ~ 19</strong>
        </td>
        <td align="center" width="160px">
            <a href="https://github.com/skgml0"><img height="130px" width="130px" src="https://github.com/skgml0.png"/></a>
            <br />
            <strong>황나희</strong> <br />
            <strong>2022-01-03 ~ 19</strong>
        </td>
    </tr>
</table>

<br>

## 1. 목표와 기능

### 1.1 목표
- 상품을 등록하여 홍보 및 공유할 수 있는 전자상거래 서비스 플랫폼
- 판매 목적의 본 취지를 달성할 뿐만 아니라 웹상에서 인적 네트워크를 형성할 수 있는 SNS 플랫폼
- 판매자와 거래자 간의 지속적인 거래 및 소통으로 신뢰도를 쌓아 믿고 거래할 수 있는 플랫폼 
- 기존 타사 중고거래 플랫폼과 역할이 겹치지 않는 차별성을 둘 수 있는 상호 보완적인 플랫폼

### 1.2 기능
- 판매 관리가 가능한 플랫폼(귤귤마켓 API 활용)
- 프로필 및 팔로우 관리 기능(귤귤마켓 API 활용)
- 게시글 관리 기능(목록, 등록, 삭제, 상세, 신고)
- 상품 관리 기능(목록, 등록, 삭제, 상세, 수정)
- 좋아요 및 댓글, 채팅 등 실시간 양방향 소통이 가능한 플랫폼
- 로그인 URL을 요청하여 미가입 혹은 허가되지 않은 사용자 접근 차단

<br>

## 2. 개발 환경 및 배포 URL
### 2.1 개발 환경

- Web Framework
  - HTML
  - CSS3
  - JavaScript
  - Figma
  - Asana(프로젝트 관리)

- 서비스 배포 환경
  - Github Page

### 2.2 배포 URL
- https://team-sixteen.github.io/gyulgyulmarket/

<br>

## 3. 프로젝트 구조와 개발 일정
### 3.1 프로젝트 구조

```bash

gyulgyulmarket
    ├─ modules
    ├─ chatroom
    ├─ chatlist
    ├─ 404
    │  
    ├─ login
    │       index
    │       login
    │       signup
    │       
    ├─ profile
    │       my_profile
    │       setting_profile
    │       modification_profile
    │                            
    ├─ follow      
    │       home
    │       followers
    │       followings   
    │                 
    ├─ post       
    │       post
    │       upload
    │            
    ├─ product  
    │       add_product
    │       mod_product
    └─      list_product                                                                      
```

### 3.1 개발 일정(WBS)
* 일정표는 https://app.asana.com/ 에서 작성되었습니다.

<img width="1104" alt="개발일정 보드" src="https://user-images.githubusercontent.com/79084294/150372116-f31479e7-710c-4ad0-b1f2-69261bb7375c.png">

- 컴포넌트 단위로 스타일링 관리에 용이하기 때문에 초기 CSS 모듈화 작업부터 실시

- 작업 동시 진행(초기)
    - 홈 - 검색
    - 로그인 - 회원가입
    - 프로필

- 작업 동시 진행(중기 ~ 종결)
    - 게시글 - 상품등록
    - 채팅
    - 스플래시

- 리팩토링
    - 불필요한 코드 삭제 & 수정
    - 적절한 메서드 사용
    - 모듈 및 클래스

<br>

## 4. 역할 분담
- 김다님 : CSS 모듈화
- 김정민 : 프로필, 상품 등록, 게시글, 팔로우
- 김준호 : 프로필, 로그인, 회원가입, 게시글
- 허대훈 : 프로필, 모달, 모듈 리팩토링
- 황나희 : 프로필, 홈, 검색, 팔로우, 채팅

<br>

## 5. UI
- 기능단위별 웹 페이지 UI

<table>
    <tr height="160px">
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150641525-e57ed10a-5aeb-4870-a1f5-6a60f9b85d5f.png"/>
            <br />
            <strong>홈</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150641581-d685f285-f78e-4066-b93f-989345a51471.png"/>
            <br />
            <strong>회원가입</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150641600-1666f4ca-05d5-44b3-ac68-77ac416dbaa7.png"/>
            <br />
            <strong>로그인</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150641607-c2aae996-bfcb-4b92-8286-31dcd3382083.png"/>
            <br />
            <strong>프로필 수정</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150651331-4927586c-0764-499c-aaf0-ac936ef984e4.png"/>
            <br />
            <strong>개인 프로필 정보</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150651345-cd5d93f1-48ce-4331-91a0-c6ab7ecd96e6.png"/>
            <br />
            <strong>유저 검색</strong> <br />
        </td>
    </tr>
</table>

<table>
    <tr height="160px">
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150651354-4f035bad-2e05-440a-aaa3-5813378e879a.png"/>
            <br />
            <strong>계정 게시글 목록</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150651362-998b0c95-b553-4f1d-a686-e466a6c56efb.png"/>
            <br />
            <strong>게시물 작성</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150651374-6361b37a-6836-4496-b53b-86dfbf4ba233.png"/>
            <br />
            <strong>게시글 상세 정보</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150651381-c02c3751-3d3c-44f5-bbfa-1315077f4601.png"/>
            <br />
            <strong>댓글 작성</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150651397-d572c1af-267c-461c-bae0-65b1d8dd7aa7.png"/>
            <br />
            <strong>상품 정보</strong> <br />
        </td>
        <td align="center" width="160px">
            <img height="160px" width="130px" src="https://user-images.githubusercontent.com/79084294/150651406-fdde633f-de38-4752-b7d5-58aa2f03ca6b.png"/>
            <br />
            <strong>상품 리스트</strong> <br />
        </td>
    </tr>
</table>



<br>

## 6. API

|Action|Method|Source|Status|
|:---:|:---:|:---:|:---:|
|회원가입|POST|`/user`|201|
|로그인|POST|`/user/login`|201|
|프로필 수정|PUT|`/user`|200|
|개인 프로필 정보|GET|`/profile/:accountname`|200|
|유저 검색|GET|`/user/searchuser/?keyword=keyword`|200|
|계정 목록|GET|`/post/:accountname/userpost`|200|
|게시물 작성|POST|`/post`|201|
|게시글 상세 정보|GET|`/post/:post_id`|200|
|댓글 작성|POST|`/post/:post_id/comments`|201|
|상품 등록|POST|`/product`|201|
|상품 리스트|GET|`/product/:accountname`|200|

<br>

## 7. 개발하며 느낀점
- 

