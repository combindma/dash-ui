<?php

namespace Combindma\DashUi;

use Combindma\DashUi\Components\Alert;
use Combindma\DashUi\Components\Avatar;
use Combindma\DashUi\Components\Badge;
use Combindma\DashUi\Components\Banner;
use Combindma\DashUi\Components\Box;
use Combindma\DashUi\Components\Button;
use Combindma\DashUi\Components\ButtonGroup;
use Combindma\DashUi\Components\CalloutCard;
use Combindma\DashUi\Components\Card;
use Combindma\DashUi\Components\CardStack;
use Combindma\DashUi\Components\CircleLoader;
use Combindma\DashUi\Components\Divider;
use Combindma\DashUi\Components\Dropzone;
use Combindma\DashUi\Components\EmptyState;
use Combindma\DashUi\Components\ExpandableSearch;
use Combindma\DashUi\Components\FlashMessage;
use Combindma\DashUi\Components\InlineError;
use Combindma\DashUi\Components\Input;
use Combindma\DashUi\Components\MediaCard;
use Combindma\DashUi\Components\Modal;
use Combindma\DashUi\Components\PageHeader;
use Combindma\DashUi\Components\Popover;
use Combindma\DashUi\Components\SearchInput;
use Combindma\DashUi\Components\Select;
use Combindma\DashUi\Components\Textarea;
use Combindma\DashUi\Components\Thumbnail;
use Combindma\DashUi\Components\Tooltip;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class DashUiServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package->name('dash-ui')
            ->hasViewComponents(
                'dashui',
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
                PageHeader::class,
                Modal::class,
                Tooltip::class,
                Avatar::class,
                Thumbnail::class,
                Badge::class,
                Banner::class,
                Alert::class,
                InlineError::class,
                FlashMessage::class,
                Input::class,
                Textarea::class,
                Select::class,
                SearchInput::class,
                ExpandableSearch::class,
                CircleLoader::class,
                Dropzone::class,
            )
            ->hasViews();
    }
}
