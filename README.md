# Aplikasi Bank Sampah

Aplikasi administrasi Bank Sampah

## Tech Stack

**Client:** ReactJS 18, AntDesign, NodeJS 16++,

**Server:** Laravel 9, PHP 8.2.0

**DB:** MariaDB 10

## Demo

http://178.128.54.119:3030
email : admin@admin.com
password : admin

## Installation

Make sure your environment fit with the requirement.

Backend

```bash
  git clone https://github.com/fikryaoza/transindo_test.git
  cd transindo_test
  composer install
    #Setting koneksi database di file .env (DB_DATABASE, DB_USERNAME, DB_PASSWORD).
    DB_CONNECTION=mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_DATABASE=crud
    DB_USERNAME=root
    DB_PASSWORD=


    php artisan migrate
    php artisan db:seed
    php artisan serve --host 0.0.0.0
```

backend URL : http://localhost:8000

Frontend

```bash
    cd Frontend
    npm install
    npm run start
```

frontend URL : http://localhost:4000
