#!/bin/sh
php artisan queue:work --tries=3
