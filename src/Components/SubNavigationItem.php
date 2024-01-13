<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class SubNavigationItem extends Component
{
    public function __construct(
        public string $label,
        public string $url,
        public bool $selected = false,
        public bool $external = false,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.sub-navigation-item');
    }
}
