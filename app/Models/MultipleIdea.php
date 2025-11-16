<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MultipleIdea extends Model
{
    use HasFactory;

    public function idea()
    {
        return $this->belongsTo(Idea::class, 'idea_id');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'idea_id',
        'status',
        'status_user',
        'choice',
    ];
}
