<?php

declare(strict_types=1);

namespace App\Data;

use App\Enums\FlashType;
use Inertia\Inertia;

final readonly class FlashData
{
    public function __construct(
        public FlashType $type,
        public string $message,
    ) {}

    public static function success(string $message): self
    {
        return new self(FlashType::Success, $message);
    }

    public static function error(string $message): self
    {
        return new self(FlashType::Error, $message);
    }

    public static function warning(string $message): self
    {
        return new self(FlashType::Warning, $message);
    }

    public static function info(string $message): self
    {
        return new self(FlashType::Info, $message);
    }

    public function send(): void
    {
        Inertia::flash('toast', [
            'type'    => $this->type,
            'message' => $this->message,
        ]);
    }
}
