<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->down();
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('category_id');
            $table->decimal('quantity', $precision = 8, $scale = 2);
            $table->string('price');
            $table->string('subtotal');
            $table->string('status');
            $table->integer('created_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};
