#!/bin/sh
set -e

# Substitute dynamic PORT from Railway (defaults to 80 if not set)
PORT="${PORT:-80}"
sed -i "s/LISTEN_PORT/${PORT}/g" /etc/nginx/http.d/default.conf

# Clean optimize cache
php artisan optimize:clear || true

# Run database migration safely if DB is reachable
php artisan migrate --force || true

# Start php-fpm in background
php-fpm -D

# Start nginx in foreground
exec nginx -g "daemon off;"

