<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdeaPurchased extends Model
{
    use HasFactory;

    protected $table = 'ideas_purchased';

    // Une idée achetée appartient à une idée spécifique
    public function idea()
    {
        return $this->belongsTo(Idea::class, 'idea_id');
    }

    // Une idée achetée appartient à un utilisateur spécifique
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['user_id', 'idea_id', 'gift_list_id', 'archived'];
}
