# 🐘 woomam-server 🐘

우아한맘모스(우아한코끼리) 백엔드 개발 담당 박재용(@jaypyon)입니다. 개발은 **Node.js**, **MySQL**을 사용하여 진행되었습니다. 

## Main Features
1. 회원가입에 대한 CRUD 구현.
2. 로그인에 대한 검증 절차 구현. (JWT Token)
4. 세탁기 상태를 받아오고, 갱신할 수 있는 API 구현.
5. QR 본인인증으로 특정 URL로 POST 요청되었을 떄 실행될 기능(세탁기 상태 갱신) 구현. 

## Architecture
이번 프로젝트에서 서버는 3-Layer Architecture대로 설계되었습니다.
![image](https://user-images.githubusercontent.com/72537190/132680540-45efa243-12b8-48c3-8794-97255bb7dbd0.png)

## Deployed Diagram
![image](https://user-images.githubusercontent.com/72537190/132680984-aa556f34-b56a-49d2-95b7-977cfab80cc8.png)


## DB Schema

#### woomam_users
> 사용자는 본인인증을 위한 고유 식별자로서 핸드폰 번호를 사용합니다. 비밀번호는 SHA-512 해시함수를 사용하여 일방향 암호화를 진행하여 보안의 3원칙을 준수하도록 합니다. 고유식별자인 phone_num을 P.K로 설정합니다.
```sql
CREATE TABLE woomam_users (
    user_name VARCHAR(50) ,
    phone_num VARCHAR(50) PRIMARY KEY,
    user_password CHAR(128),
    written_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```
#### woomam_stores
> store의 고유식별자는 범용고유식별자인 UUID(또는 GUID)를 부여하고, 이를 P.K로 지정합니다. 또, Front-end단에서 Map API와 연동하여 지도 위에 위치를 표시할 수 있도록 위도와 경도를 지정합니다.
```sql
CREATE TABLE woomam_stores (
    store_uid CHAR(36) NOT NULL PRIMARY KEY,
    store_name VARCHAR(50) NOT NULL,
    written_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    longitude VARCHAR(20) NOT NULL,
    latitude VARCHAR(20) NOT NULL
);
```
#### woomam_wms
> ardu_state와 wm_state가 둘 다 만족 되었을 떄, 세탁기가 열립니다. 각각의 상태는 QR이 인증되었을 때, 아두이노로부터 온 요청에 대해 서버에서 시간을 확인했을 때 정해진 시간이 지나있다면 갱신하도록 하는 두가지 경우에 대해 세탁기가 열리도록 변경합니다. 어떤 가게에 종속된 세탁기인지 구별하기 위해 store의 UID를 F.K로 지정하였고, 어떤 유저가 예약을 했는지 참조해야하기 때문에 사용자의 phone_num을 F.K로 지정했습니다.
```sql
CREATE TABLE woomam_wms (
    store_uid CHAR(36) NOT NULL,
    wm_uid CHAR(36) NOT NULL PRIMARY KEY,
    task_from TIMESTAMP,
    task_to TIMESTAMP,
    ardu_state ENUM('opened','closed'),
    wm_state ENUM('running','turnedoff'),
    phone_num VARCHAR(50),
    FOREIGN KEY (store_uid) REFERENCES woomam_stores (store_uid),
    FOREIGN KEY (phone_num) REFERENCES users (phone_num)
);
```
