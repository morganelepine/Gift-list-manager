<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GiftListController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/privatecode', function () {
    return Inertia::render('PrivateCode');
})->middleware(['auth', 'verified'])->name('privatecode');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/ideas/index/{list}', [IdeaController::class, 'index_idea'])->name('ideas.index_idea');
    Route::get('/ideas/create/{list}', [IdeaController::class, 'create_idea'])->name('ideas.create_idea');
    Route::post('/lists/follow', [GiftListController::class, 'followList'])->name('lists.followList');
});

Route::resource('ideas', IdeaController::class)
->only(['index', 'create', 'store', 'update', 'destroy'])
->middleware(['auth', 'verified']);

Route::resource('lists', GiftListController::class)
->only(['show', 'index', 'create', 'store', 'update', 'destroy'])
->middleware(['auth', 'verified']);

Route::resource('users', UserController::class);

// Custom routes
Route::patch('/ideas/status/{idea}', [IdeaController::class, 'updateStatus'])->name('ideas.updateStatus');

require __DIR__.'/auth.php';
