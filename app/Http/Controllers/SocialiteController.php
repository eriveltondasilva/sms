<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

// use Illuminate\Http\Request;

class SocialiteController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $providerUser = Socialite::driver('google')->user();
        $user = User::where('email', $providerUser->getEmail())->firstOrFail();

        $user->update([
            'avatar_url' => $providerUser->getAvatar(),
            'provider_id' => $providerUser->getId(),
            'provider_name' => $provider->value,
        ]);

        Auth::login($user);

        return to_route('dashboard');
    }
}
