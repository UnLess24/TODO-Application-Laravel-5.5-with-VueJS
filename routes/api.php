<?php

use Illuminate\Http\Request;

Route::resource('todos', 'TodosController', [
    'except' => ['create', 'edit', 'show']
]);
