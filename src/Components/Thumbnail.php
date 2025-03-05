<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Thumbnail extends Component
{
    public function __construct(
        public string $size = 'md',
        public ?string $src = null,
        public ?string $alt = null,
    ) {}

    public function render()
    {
        return view('dash-ui::components.thumbnail');
    }
}
