<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    
});

Route::get('/{file}', function ($file) {
    return view('layout', [
        'component' => str_replace('.blade.php', '', $file)
    ]);
})->where('file', '.*');