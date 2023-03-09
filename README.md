## install Node.js and npm
To install Node.js and npm on your Debian use the following commands:
```
sudo apt update
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs
```

One the installation is completed, verify it by typing:
```
nodejs --version
```
## Create project
initialize project:
```
mkdir chat-app
npm init --yes
```


To use ES6 syntax add this attribute to package.json:
```
"type": "module",
```

### backend
install requirments:
```
sudo npm install nodemon -g
sudo npm install -g create-react-app
npm install apollo-server
npm install prisma
npm install bcryptjs
npm install jsonwebtoken
npm install apollo-server-express
npm insatll ws
npm install graphql-ws 
npm install @graphql-tools/schema
npm install express
npm install graphql-subscriptions
```

#####  Adding the MySQL Software Repository
```
sudo apt update
sudo apt install gnupg
cd /tmp
wget https://dev.mysql.com/get/mysql-apt-config_0.8.22-1_all.deb
sudo dpkg -i mysql-apt-config*
sudo apt update
```

##### Installing MySQL
```
sudo apt install mysql-server
sudo systemctl status mysql
```
##### Securing MySQL
```
mysql_secure_installation
```
##### Create database
```
sudo mysql -u root -p
CREATE DATABASE chatapp_db;
exit;
```

##### create MySQL tabel based on the model
```
npx prisma db push
```

start server:
```
nodemon server.js
```

 ### frontend
 Create react app:
```
npx create-react-app client 
```

install requirments:
```
cd client/
npm install @mui/material @emotion/react @emotion/styled 
npm install @mui/icons-material npm i react-router-dom
npm install @apollo/client graphql
npm install graphql-ws 
```

start:
```
npm start
```