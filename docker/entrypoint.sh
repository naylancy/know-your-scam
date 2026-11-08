#!/bin/sh
set -e

# 1. Ensure run & log directories exist with proper permissions
mkdir -p /run/nginx /var/log/nginx
chown -R www-data:www-data /run/nginx /var/log/nginx
chmod -R 775 /run/nginx /var/log/nginx

# 2. Switch nginx user to www-data so it matches PHP-FPM and Laravel storage
sed -i 's/user nginx;/user www-data;/g' /etc/nginx/nginx.conf 2>/dev/null || true

# 3. Configure dynamic listening port from Railway (dual stack IPv4 and IPv6)
PORT="${PORT:-80}"
echo "Configuring Nginx ports (PORT=${PORT})..."

php -r '
    $port = getenv("PORT") ?: "80";
    $confFile = "/etc/nginx/http.d/default.conf";
    $conf = file_get_contents($confFile);
    $conf = str_replace("LISTEN_PORT", $port, $conf);
    if ($port !== "80") {
        $extra = "\n    listen 80;\n    listen [::]:80;";
        $conf = str_replace("listen [::]:" . $port . ";", "listen [::]:" . $port . ";" . $extra, $conf);
    }
    file_put_contents($confFile, $conf);
'

# 4. Ensure proper permissions for Laravel storage and cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 5. Clear old caches safely
php artisan optimize:clear || true

# 6. Start PHP-FPM in background
echo "Starting PHP-FPM..."
php-fpm -D

# 7. Test Nginx configuration and print config if test fails
echo "Testing Nginx configuration..."
nginx -t || { echo "Nginx test failed! Config was:"; cat /etc/nginx/http.d/default.conf; exit 1; }

# 8. Run database migrations & seed in background so HTTP port responds immediately
(
  sleep 3
  echo "Running database migrations and seed in background..."
  php artisan migrate --force --seed || true
  echo "Database migrations finished."
) &

# 9. Start Nginx in foreground
echo "Starting Nginx on port ${PORT}..."
exec nginx -g "daemon off;"
