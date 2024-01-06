<?php

namespace Combindma\DashUi;

use Combindma\DashUi\Components\AccountConnection;
use Combindma\DashUi\Components\Box;
use Combindma\DashUi\Components\Button;
use Combindma\DashUi\Components\ButtonGroup;
use Combindma\DashUi\Components\Card;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class DashUiServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package->name('dash-ui')
            ->hasViewComponents(
                'dash-ui',
                Button::class,
                ButtonGroup::class,
                AccountConnection::class,
                Box::class,
                Card::class,
            )
            ->hasViews();
    }
}
