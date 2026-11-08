#!/bin/sh
set -e

# 1. Create run & log directories for Nginx (required on Alpine Linux)
mkdir -p /run/nginx /var/log/nginx

# 2. Configure dynamic listening port from Railway (dual listen on $PORT and 80)
PORT="${PORT:-80}"
echo "Configuring Nginx ports (PORT=${PORT})..."

php -r '
    $port = getenv("PORT") ?: "80";
    $confFile = "/etc/nginx/http.d/default.conf";
    $conf = file_get_contents($confFile);
    $listens = "listen " . $port . ";";
    if ($port !== "80") {
        $listens .= "\n    listen 80;";
    }
    $conf = str_replace("listen LISTEN_PORT;", $listens, $conf);
    file_put_contents($confFile, $conf);
'

# 3. Ensure proper permissions for Laravel storage and cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 4. Clear old caches
php artisan optimize:clear || true

# 5. Start PHP-FPM in background
echo "Starting PHP-FPM..."
php-fpm -D

# 6. Run database migrations & seed in background so HTTP port responds immediately for Railway healthcheck
(
  sleep 3
  echo "Running database migrations and seed in background..."
  php artisan migrate --force --seed || true
  echo "Database migrations finished."
) &

# 7. Test Nginx configuration and start Nginx in foreground
echo "Testing Nginx configuration..."
nginx -t

echo "Starting Nginx on port ${PORT}..."
exec nginx -g "daemon off;"
