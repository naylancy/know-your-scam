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
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->string('log_code')->nullable();
            $table->string('user_id')->nullable();
            $table->string('user_name');
            $table->string('module');
            $table->text('decision');
            $table->float('vulnerability_score')->default(5.0);
            $table->string('status')->default('INFO'); // 'SECURED', 'COMPROMISED', 'BREACH_PREVENTED', 'INFO'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};

