<?php

namespace Combindma\DashUi\Tests;

use Combindma\DashUi\DashUiServiceProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();

        /*Factory::guessFactoryNamesUsing(
            fn (string $modelName) => 'Combindma\\DashUi\\Database\\Factories\\'.class_basename($modelName).'Factory'
        );*/
    }

    protected function getPackageProviders($app)
    {
        return [
            DashUiServiceProvider::class,
        ];
    }

    public function getEnvironmentSetUp($app)
    {
        config()->set('database.default', 'testing');
        config()->set('database.connections.testing', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);
        config()->set('app.locale', 'fr');
        /*
        $migration = include __DIR__.'/../database/migrations/create_dash-ui_table.php.stub';
        $migration->up();
        */
    }
}
