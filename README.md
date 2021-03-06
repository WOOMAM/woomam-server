# π woomam-server π

μ°μνλ§λͺ¨μ€(μ°μνμ½λΌλ¦¬) λ°±μλ κ°λ° λ΄λΉ λ°μ¬μ©(@jaypyon)μλλ€. κ°λ°μ **Node.js**, **MySQL**μ μ¬μ©νμ¬ μ§νλμμ΅λλ€. 

## Main Features
1. νμκ°μμ λν CRUD κ΅¬ν.
2. λ‘κ·ΈμΈμ λν κ²μ¦ μ μ°¨ κ΅¬ν. (JWT Token)
4. μΈνκΈ° μνλ₯Ό λ°μμ€κ³ , κ°±μ ν  μ μλ API κ΅¬ν.
5. QR λ³ΈμΈμΈμ¦μΌλ‘ νΉμ  URLλ‘ POST μμ²­λμμ λ μ€νλ  κΈ°λ₯(μΈνκΈ° μν κ°±μ ) κ΅¬ν. 

## Architecture
μ΄λ² νλ‘μ νΈμμ μλ²λ 3-Layer Architectureλλ‘ μ€κ³λμμ΅λλ€.

## Deployed Diagram
![image](https://user-images.githubusercontent.com/72537190/132680984-aa556f34-b56a-49d2-95b7-977cfab80cc8.png)


## DB Schema

#### woomam_users
> μ¬μ©μλ λ³ΈμΈμΈμ¦μ μν κ³ μ  μλ³μλ‘μ νΈλν° λ²νΈλ₯Ό μ¬μ©ν©λλ€. λΉλ°λ²νΈλ SHA-512 ν΄μν¨μλ₯Ό μ¬μ©νμ¬ μΌλ°©ν₯ μνΈνλ₯Ό μ§ννμ¬ λ³΄μμ 3μμΉμ μ€μνλλ‘ ν©λλ€. κ³ μ μλ³μμΈ phone_numμ P.Kλ‘ μ€μ ν©λλ€.
```sql
CREATE TABLE woomam_users (
    user_name VARCHAR(50) ,
    phone_num VARCHAR(50) PRIMARY KEY,
    user_password CHAR(128),
    written_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```
#### woomam_stores
> storeμ κ³ μ μλ³μλ λ²μ©κ³ μ μλ³μμΈ UUID(λλ GUID)λ₯Ό λΆμ¬νκ³ , μ΄λ₯Ό P.Kλ‘ μ§μ ν©λλ€. λ, Front-endλ¨μμ Map APIμ μ°λνμ¬ μ§λ μμ μμΉλ₯Ό νμν  μ μλλ‘ μλμ κ²½λλ₯Ό μ§μ ν©λλ€.
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
> ardu_stateμ wm_stateκ° λ λ€ λ§μ‘± λμμ λ, μΈνκΈ°κ° μ΄λ¦½λλ€. κ°κ°μ μνλ QRμ΄ μΈμ¦λμμ λ, μλμ΄λΈλ‘λΆν° μ¨ μμ²­μ λν΄ μλ²μμ μκ°μ νμΈνμ λ μ ν΄μ§ μκ°μ΄ μ§λμλ€λ©΄ κ°±μ νλλ‘ νλ λκ°μ§ κ²½μ°μ λν΄ μΈνκΈ°κ° μ΄λ¦¬λλ‘ λ³κ²½ν©λλ€. μ΄λ€ κ°κ²μ μ’μλ μΈνκΈ°μΈμ§ κ΅¬λ³νκΈ° μν΄ storeμ UIDλ₯Ό F.Kλ‘ μ§μ νμκ³ , μ΄λ€ μ μ κ° μμ½μ νλμ§ μ°Έμ‘°ν΄μΌνκΈ° λλ¬Έμ μ¬μ©μμ phone_numμ F.Kλ‘ μ§μ νμ΅λλ€.
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
