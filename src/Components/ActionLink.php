<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class ActionLink extends Component
{
    public function __construct(
        public string $label,
        public ?string $helpText = null,
        public string $as = 'button',
        public bool $active = false,
        public bool $destructive = false,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.action-link');
    }
}
