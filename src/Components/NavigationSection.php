<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class NavigationSection extends Component
{
    public function __construct(
        public ?string $title = null,
        public bool $sticky = false
    ) {}

    public function render()
    {
        return view('dash-ui::components.navigation-section');
    }
}
