FROM php:8.2.7-apache-buster AS builder
COPY . /var/www/html

RUN apt-get update
RUN curl -s https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin/ --filename=composer
RUN #composer update

FROM php:8.2.7-apache-buster
COPY --from=builder /var/www/html /var/www/html
#RUN composer install
RUN chmod -R 755 storage/
RUN php artisan key:generate
