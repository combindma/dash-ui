<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class Button extends Component
{
    public function __construct(
        public string $as = 'button',
        public string $variant = 'default',
        public string $tone = 'default',
        public string $size = '',
        public bool $disabled = false,
        public bool $fullWidth = false,
        public bool $pressed = false,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.button');
    }
}
