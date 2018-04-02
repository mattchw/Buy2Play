# Welcome to Buy2Play
Buy2Play is a Web application specially designed for second-hand game retailing. We hope to provide a user-friendly and robust platform for people to trade second-hand games. We have designed a few important functions for the Web application to address the problem of the current second-hand game trading platforms.

****

Please create MySQL database before you run the server.
```
CREATE DATABASE csci3100
```

Then, create different table for the structure of our website.
```
CREATE TABLE account(
id int AUTO_INCREMENT, 
username VARCHAR(20) NOT NULL,
password VARCHAR(15) NOT NULL,
email VARCHAR(40) NOT NULL,
phone VARCHAR(20),
image VARCHAR(100),
PRIMARY KEY(id));
```

```
CREATE TABLE transaction(
tid int AUTO_INCREMENT, 
id int, 
gamename VARCHAR(50), 
platform VARCHAR(50),
preview VARCHAR(100),
price int not null, 
description VARCHAR(500),
location VARCHAR(200),
date VARCHAR(25),
search int,
likes int,
PRIMARY KEY(tid),
FOREIGN KEY(id) REFERENCES account(id));
```

```
CREATE TABLE transactionImage(
tid int,
path VARCHAR(100),
FOREIGN KEY(tid) REFERENCES transaction(tid));
```

```
CREATE TABLE wishlist(
tid int,
id int,
FOREIGN KEY(tid) REFERENCES transaction(tid),
FOREIGN KEY(id) REFERENCES account(id));
```

```
CREATE TABLE likes(
tid int,
id int,
FOREIGN KEY(tid) REFERENCES transaction(tid),
FOREIGN KEY(id) REFERENCES account(id));
```

```
CREATE TABLE comments(
tid int,
id int,
date VARCHAR(25),
comment VARCHAR(500),
FOREIGN KEY(tid) REFERENCES transaction(tid),
FOREIGN KEY(id) REFERENCES account(id));
```

Start the Node.js server
```
npm start
```

__Enjoy Shopping at Buy2Play!__
