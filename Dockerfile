FROM php:8.2-fpm-alpine

# Install system dependencies & nginx
RUN apk add --no-cache \
    nginx \
    curl \
    git \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    postgresql-dev \
    oniguruma-dev \
    libzip-dev

# Install PHP extensions required for Laravel & Postgres/MySQL
RUN docker-php-ext-install pdo pdo_pgsql pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install PHP dependencies without dev packages
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Create necessary directories and set permissions
RUN mkdir -p /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache \
    /run/nginx \
    /var/log/nginx \
    /var/lib/nginx/tmp/client_body \
    /var/lib/nginx/tmp/fastcgi \
    /var/lib/nginx/tmp/proxy \
    /var/lib/nginx/tmp/uwsgi \
    /var/lib/nginx/tmp/scgi && \
    chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /run/nginx /var/log/nginx /var/lib/nginx && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache /run/nginx /var/log/nginx /var/lib/nginx

# Copy Nginx config and entrypoint script
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080 80

CMD ["/usr/local/bin/entrypoint.sh"]

