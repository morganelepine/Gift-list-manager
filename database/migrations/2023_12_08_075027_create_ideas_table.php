<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ideas', function (Blueprint $table) {
            //Les champs qui seront ajoutés à la table des idées :
            $table->id();
            $table->foreignId('list_id')->constrained('gift_lists')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('user_name');
            $table->string('idea')->nullable();
            $table->string('brand')->nullable();
            $table->string('link')->nullable();
            $table->string('details')->nullable();
            $table->integer('price')->nullable();
            $table->boolean('favorite')->default(0);
            $table->boolean('promo')->nullable();
            $table->string('promo_details')->nullable();
            $table->string('membership')->nullable();
            $table->string('membership_reduction')->nullable();
            $table->string('status')->default('available')->nullable();
            $table->string('status_user')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ideas');
    }
};
