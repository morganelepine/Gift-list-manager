<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Idea extends Model
{
    use HasFactory;

    // Une idée ne peut avoir été créée que par un user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Une idée ne peut être que dans une liste
    public function giftList(): BelongsTo
    {
        return $this->belongsTo(GiftList::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'list_id',
        'user_id',
        'user_name',
        'idea',
        'brand',
        'link',
        'details',
        'price',
        'favorite',
        'promo',
        'promo_details',
        'membership',
        'membership_reduction',
        'status',
        'status_user',
    ];
}
