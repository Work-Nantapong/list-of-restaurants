## Installation And Running the app

```bash
# Website
$ cd website
$ docker build -f Dockerfile-builder -t vue-builder:0.0.1 .
$ docker run --rm -v .:/app vue-builder:0.0.1 npm install

# Api
$ cd ../api
$ chmod -R 777 storage/
$ docker build -f Dockerfile-builder -t laravel-builder:0.0.1 .
$ docker run --rm -v .:/var/www/html laravel-builder:0.0.1 composer install
$ docker run --rm -v .:/var/www/html laravel-builder:0.0.1 npm install
$ cp .env.example .env

# Push your google api key on GOOGLE_API_KEY in api/.env
$ docker run --rm -v .:/var/www/html laravel-builder:0.0.1 php artisan key:generate

# docker start serve
$ cd ..
$ docker compose up -d

# Database
$ docker compose exec api bash
$ php artisan migrate
$ php artisan db:seed --class=UserSeeder

```