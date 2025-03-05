<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Banner extends Component
{
    public function __construct(
        public ?string $title = null,
        public string $tone = 'info',
    ) {}

    public function render()
    {
        return view('dash-ui::components.banner');
    }
}
