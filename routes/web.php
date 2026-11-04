<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuardianController;

Route::get('/', [GuardianController::class, 'index'])->name('guardian.home');
Route::get('/home', [GuardianController::class, 'index']);
