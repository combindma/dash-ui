<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class NavigationItem extends Component
{
    public function __construct(
        public string $label,
        public string $url,
        public ?string $badge = null,
        public bool $selected = false,
        public bool $open = false,
        public bool $childSelected = false,
        public bool $external = false,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.navigation-item');
    }
}
