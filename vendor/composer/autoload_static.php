<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit8ef0d26bbb9a1bf4d95c5999c7ea3a00
{
    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'TelegramBot\\Api\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'TelegramBot\\Api\\' => 
        array (
            0 => __DIR__ . '/..' . '/telegram-bot/api/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit8ef0d26bbb9a1bf4d95c5999c7ea3a00::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit8ef0d26bbb9a1bf4d95c5999c7ea3a00::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit8ef0d26bbb9a1bf4d95c5999c7ea3a00::$classMap;

        }, null, ClassLoader::class);
    }
}
