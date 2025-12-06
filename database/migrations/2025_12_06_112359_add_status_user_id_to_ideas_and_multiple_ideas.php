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
        // Table ideas
        Schema::table('ideas', function (Blueprint $table) {
            $table->unsignedBigInteger('status_user_id')->nullable()->after('status');
            $table->foreign('status_user_id')->references('id')->on('users')->nullOnDelete();
        });

        // Table multiple_ideas
        Schema::table('multiple_ideas', function (Blueprint $table) {
            $table->unsignedBigInteger('status_user_id')->nullable()->after('status');
            $table->foreign('status_user_id')->references('id')->on('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ideas', function (Blueprint $table) {
            $table->dropForeign(['status_user_id']);
            $table->dropColumn('status_user_id');
        });

        Schema::table('multiple_ideas', function (Blueprint $table) {
            $table->dropForeign(['status_user_id']);
            $table->dropColumn('status_user_id');
        });
    }
};
