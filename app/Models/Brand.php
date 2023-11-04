<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
    //Une BRAND peut avoir plusieurs IDEAS
    public function ideas(): HasMany
    {
        return $this->hasMany(Idea::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'brand',
        'membership',
        'membership_reduction',
    ];


}
