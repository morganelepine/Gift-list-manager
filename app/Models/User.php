<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Un user peut avoir plusieurs listes
    public function gift_lists(): HasMany
    {
        return $this->hasMany(GiftList::class);
    }

    // Un user peut avoir plusieurs idées
    public function ideas(): HasMany
    {
        return $this->hasMany(Idea::class);
    }

    // Un user peut réserver plusieurs idées
    public function ideaReserved()
    {
        return $this->hasMany(IdeaReserved::class);
    }

    // Un user peut acheter plusieurs idées
    public function ideaPurchased()
    {
        return $this->hasMany(IdeaPurchased::class);
    }

    // Un user peut suivre plusieurs listes
    public function followed_lists(): HasMany
    {
        return $this->hasMany(FollowedList::class);
    }

    //  Each user can follow several lists and each list can be followed by several users
    public function followedLists()
    {
        return $this->belongsToMany(GiftList::class, 'followed_lists')->withPivot('private_code');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

}
