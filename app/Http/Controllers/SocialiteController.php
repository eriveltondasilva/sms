<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

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

        $user = User::where('email', $providerUser->getEmail())->firstOr(function () {
            return 'Usuário inexistente no sistema';
        });

        if (! $user->updatedWithinDay() || ! $user->provider_id) {
            $user->update([
                'username'    => $providerUser->getNickname(),
                'avatar_url'  => $providerUser->getAvatar(),
                'provider_id' => $providerUser->getId(),
            ]);
        }

        Auth::login($user);

        return to_route('dashboard');
    }
}
