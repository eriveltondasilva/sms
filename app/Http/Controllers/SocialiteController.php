<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

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

        $shouldUpdateUser = ! $user->updatedWithinDay() || ! $user->provider_id;

        if ($shouldUpdateUser) {
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
