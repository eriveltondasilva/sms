<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /** Register any application services. */
    public function register(): void
    {
        //
    }

    /** Bootstrap any application services. */
    public function boot(): void
    {
        $this->configureDefaults();
    }

    /** Configure default behaviors for production-ready applications. */
    protected function configureDefaults(): void
    {
        // Use CarbonImmutable for all date operations
        Date::use(CarbonImmutable::class);

        // Prohibit destructive commands in production
        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        // Set default password requirements
        Password::defaults(
            fn(): ?Password => app()->isProduction()
                ? Password::min(8)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
                : null
        );

        // Enable strict mode and eager loading in local development
        Model::shouldBeStrict(
            app()->isLocal()
        );
        Model::automaticallyEagerLoadRelationships(
            app()->isLocal()
        );
    }
}
