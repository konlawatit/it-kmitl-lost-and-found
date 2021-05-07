# it-kmitl-lost-and-found

### Docker : ./ 
```
    |-> start : docker-compose up --build (หากครั้งหลังไม่มีการ Update package ไม่ต้อง --build)
    |-> Frontend : http://localhost:8080
    |-> Backend : http://localhost:8888
```

### Frontend : ./client (กณีไม่ได้ใช้ Docker)
``` 
    |-> Start server : npm run serve
    |-> Path : http://localhost:8080
    |-> Update package : npm install 
``` 

### Backend : ./server (กณีไม่ได้ใช้ Docker)
```
    |-> Start server : npm start
    |-> Path : http://localhost:8888 
    |-> Update package : npm install
```
