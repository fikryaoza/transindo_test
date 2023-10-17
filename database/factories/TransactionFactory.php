<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
       return [
            'category_id' => fake()->name(),
            'quantity' => 1,
            'price' => 1000,
            'subtotal' => 1000, // password
            'craeted_by' => "fikry", // password
            'status' => "Process",
        ];
    }
}
