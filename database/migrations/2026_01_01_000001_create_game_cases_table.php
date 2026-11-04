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
        Schema::create('game_cases', function (Blueprint $table) {
            $table->id();
            $table->string('case_code')->unique();
            $table->string('category')->index(); // 'kasus', 'diff', 'criminal', 'deeplearn', 'scanner'
            $table->string('type')->nullable(); // 'phishing', 'lovescam', 'jobscam', 'url', 'news', etc.
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('difficulty')->nullable();
            $table->longText('scenario_data'); // JSON encoded scenario structure
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_cases');
    }
};

