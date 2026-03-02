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
        public ?array $meta = null,
    ) {}

    public static function success(string $message, ?array $meta = null): self
    {
        return new self(FlashType::Success, $message, $meta);
    }

    public static function error(string $message, ?array $meta = null): self
    {
        return new self(FlashType::Error, $message, $meta);
    }

    public static function warning(string $message, ?array $meta = null): self
    {
        return new self(FlashType::Warning, $message, $meta);
    }

    public static function info(string $message, ?array $meta = null): self
    {
        return new self(FlashType::Info, $message, $meta);
    }

    public function send(): void
    {
        Inertia::flash('toast', [
            'type'    => $this->type,
            'message' => $this->message,
            'meta'    => $this->meta,
        ]);
    }
}
