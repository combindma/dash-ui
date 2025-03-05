<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Card extends Component
{
    public function __construct(
        public string $variant = 'basic',
        public bool $reset = false,
        public bool $hasDivider = false,
    ) {}

    public function render()
    {
        return view('dash-ui::components.card');
    }
}
