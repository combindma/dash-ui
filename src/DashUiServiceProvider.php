<?php

namespace Combindma\DashUi;

use Combindma\DashUi\Components\Box;
use Combindma\DashUi\Components\Button;
use Combindma\DashUi\Components\ButtonGroup;
use Combindma\DashUi\Components\CalloutCard;
use Combindma\DashUi\Components\Card;
use Combindma\DashUi\Components\CardStack;
use Combindma\DashUi\Components\Divider;
use Combindma\DashUi\Components\EmptyState;
use Combindma\DashUi\Components\MediaCard;
use Combindma\DashUi\Components\Popover;
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
                Popover::class,
                CalloutCard::class,
                Box::class,
                Card::class,
                CardStack::class,
                Divider::class,
                EmptyState::class,
                MediaCard::class,
            )
            ->hasViews();
    }
}
