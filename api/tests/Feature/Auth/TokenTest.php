<?php

namespace Auth;

use App\Models\User;
use Tests\TestCase;

class TokenTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_can_get_token(): void
    {

        $user = User::factory()->create();

        $response = $this->post('/api/sanctum/token', [
            'email' => $user->email,
            'password' => 'password',
            'device_name' => 'website',
        ]);

        $this->assertTrue(true);
    }
}
