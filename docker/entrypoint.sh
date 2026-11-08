#!/bin/sh
set -e

# 1. Ensure run, log, and tmp directories exist with proper permissions for www-data
mkdir -p /run/nginx /var/log/nginx \
    /var/lib/nginx/tmp/client_body \
    /var/lib/nginx/tmp/fastcgi \
    /var/lib/nginx/tmp/proxy \
    /var/lib/nginx/tmp/uwsgi \
    /var/lib/nginx/tmp/scgi
chown -R www-data:www-data /run/nginx /var/log/nginx /var/lib/nginx
chmod -R 775 /run/nginx /var/log/nginx /var/lib/nginx

# 2. Switch nginx user to www-data so it matches PHP-FPM and Laravel storage
sed -i 's/user nginx;/user www-data;/g' /etc/nginx/nginx.conf 2>/dev/null || true

# 3. Configure dynamic listening port from Railway
PORT="${PORT:-8080}"
echo "Configuring Nginx ports (PORT=${PORT})..."

php -r '
    $port = getenv("PORT") ?: "8080";
    $confFile = "/etc/nginx/http.d/default.conf";
    $conf = file_get_contents($confFile);
    $listens = "listen " . $port . ";";
    if ($port !== "80") {
        $listens .= "\n    listen 80;";
    }
    $conf = str_replace("listen LISTEN_PORT;", $listens, $conf);
    file_put_contents($confFile, $conf);
'

# 4. Ensure proper permissions for Laravel storage and cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 5. Clear old caches safely
php artisan optimize:clear || true

# 6. Start PHP-FPM in background
echo "Starting PHP-FPM..."
php-fpm -D 2>&1

# 7. Test Nginx configuration
echo "Testing Nginx configuration..."
nginx -t 2>&1

# 8. Run database migrations & seed in background
(
  sleep 2
  echo "Running database migrations and seed in background..."
  php artisan migrate --force --seed || true
  echo "Database migrations finished."
) &

# 9. Start Nginx in foreground with error_log stderr
echo "Starting Nginx on port ${PORT}..."
exec nginx -g "daemon off; error_log stderr warn;"
