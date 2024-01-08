<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Avatar extends Component
{
    public function __construct(
        public string $size = 'md',
        public ?string $name = null,
        public ?string $src = null,
        public ?string $initials = null,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.avatar');
    }
}
