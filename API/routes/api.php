<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EventRegistrationController;

Route::get('/registrasi-event', [EventRegistrationController::class, 'index']);
Route::post('/registrasi-event', [EventRegistrationController::class, 'store']);
