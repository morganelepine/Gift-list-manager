<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GiftListController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\IdeaReservedController;
use App\Http\Controllers\IdeaPurchasedController;
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
    Route::get('/my-purchases', [ProfileController::class, 'purchase'])->name('profile.purchase');

    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');

    Route::get('/ideas/create/{list}', [IdeaController::class, 'create_idea'])->name('ideas.create_idea');
    Route::post('/ideas/{idea}/reserve', [IdeaReservedController::class, 'reserveIdea'])->name('ideas.reserve');
    Route::delete('/ideas/{idea}/cancelReserve', [IdeaReservedController::class, 'cancelReservation'])->name('ideas.cancelReserve');
    Route::post('/ideas/{idea}/purchase', [IdeaPurchasedController::class, 'purchaseIdea'])->name('ideas.purchase');
    Route::delete('/ideas/{idea}/cancelPurchase', [IdeaPurchasedController::class, 'cancelPurchase'])->name('ideas.cancelPurchase');

    Route::get('/my-lists', [GiftListController::class, 'authLists'])->name('lists.authLists');
    Route::get('/lists-to-follow', [GiftListController::class, 'listsToFollow'])->name('lists.listsToFollow');
    Route::get('/lists-followed', [GiftListController::class, 'followedLists'])->name('lists.followedLists');
    Route::post('/lists/follow', [GiftListController::class, 'followList'])->name('lists.followList');
    Route::patch('lists/{list}/archive', [GiftListController::class, 'archive'])->name('lists.archive');
});

Route::resource('ideas', IdeaController::class)
->only(['index', 'store', 'update', 'destroy'])
->middleware(['auth', 'verified']);

Route::resource('lists', GiftListController::class)
->only(['show', 'index', 'create', 'store', 'update', 'destroy'])
->middleware(['auth', 'verified']);

Route::resource('users', UserController::class);

require __DIR__.'/auth.php';
