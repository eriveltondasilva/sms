<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Data\FlashData;
use App\Http\Controllers\Controller;
use App\Models\School;
use App\Services\ImpersonationService;
use Illuminate\Http\RedirectResponse;

final class ImpersonationController extends Controller
{
    public function __construct(private readonly ImpersonationService $impersonation) {}

    public function start(School $school): RedirectResponse
    {
        if ($school->is_active === false) {
            FlashData::error('Não é possível visualizar uma escola inativa.')->build();

            return back();
        }

        $this->impersonation->start($school);

        FlashData::info("Visualizando como: {$school->short_name}")->build();

        return to_route('dashboard');
    }

    public function stop(): RedirectResponse
    {
        $this->impersonation->stop();

        FlashData::info('Impersonação encerrada.')->build();

        return to_route('admin.schools.index');
    }
}
