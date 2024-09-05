<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GiftList extends Model
{
    use HasFactory;

    // A list can only belong to one user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // A list can contain several ideas
    public function ideas(): HasMany
    {
        return $this->hasMany(Idea::class);
    }

    // Each list can be followed by several users and each user can follow several lists
    public function followers()
    {
        return $this->belongsToMany(User::class, 'followed_lists')->withPivot('private_code');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'user_name',
        'name',
        'private_code',
        'isPrivate',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        // 'private_code',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // 'private_code' => 'hashed',
    ];
}
