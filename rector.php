<?php

declare(strict_types=1);

use Rector\Caching\ValueObject\Storage\FileCacheStorage;
use Rector\Config\RectorConfig;
use RectorLaravel\Set\{LaravelSetList, LaravelSetProvider};

return RectorConfig::configure()
    ->withSetProviders(LaravelSetProvider::class)

    ->withSets([
        LaravelSetList::LARAVEL_CODE_QUALITY,
        LaravelSetList::LARAVEL_COLLECTION,
        LaravelSetList::LARAVEL_CONTAINER_STRING_TO_FULLY_QUALIFIED_NAME,
        LaravelSetList::LARAVEL_ELOQUENT_MAGIC_METHOD_TO_QUERY_BUILDER,
        LaravelSetList::LARAVEL_FACADE_ALIASES_TO_FULL_NAMES,
        LaravelSetList::LARAVEL_FACTORIES,
        LaravelSetList::LARAVEL_IF_HELPERS,
        LaravelSetList::LARAVEL_LEGACY_FACTORIES_TO_CLASSES,
        LaravelSetList::LARAVEL_TYPE_DECLARATIONS,

        // LaravelSetList::LARAVEL_ARRAY_STR_FUNCTION_TO_STATIC_CALL,
    ])

    ->withPreparedSets(
        deadCode: true,
        codeQuality: true,
        typeDeclarations: true,
        privatization: true,
        earlyReturn: true,
    )

    ->withPaths([
        __DIR__ . '/app',
        __DIR__ . '/bootstrap/app.php',
        __DIR__ . '/config',
        __DIR__ . '/database',
        __DIR__ . '/routes',
    ])

    ->withSkip([
        __DIR__ . '/database/migrations',
        __DIR__ . '/vendor',
        __DIR__ . '/storage',
    ])

    ->withBootstrapFiles([
        __DIR__ . '/bootstrap/app.php',
    ])

    ->withCache(
        cacheDirectory: __DIR__ . '/tmp/rector',
        cacheClass: FileCacheStorage::class,
    )

    ->withComposerBased(laravel: true)
    ->withImportNames(removeUnusedImports: true);
