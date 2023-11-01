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
        Schema::table('ideas', function (Blueprint $table) {
            $table->string('idea')->nullable()->change();
            $table->string('brand')->nullable()->change();
            $table->string('link')->nullable()->change();
            $table->string('details')->nullable()->change();
            $table->boolean('promo')->nullable()->change();
            $table->string('promo_details')->nullable()->change();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ideas', function (Blueprint $table) {
            $table->string('idea')->nullable(false)->change();
            $table->string('brand')->nullable(false)->change();
            $table->string('link')->nullable(false)->change();
            $table->string('details')->nullable(false)->change();
            $table->boolean('promo')->nullable(false)->change();
            $table->string('promo_details')->nullable(false)->change();
        });
    }
};
