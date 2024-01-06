<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class AccountConnection extends Component
{
    public function __construct(
        public string $variant = 'default',
        public string $tone = '',
        public string $size = '',
        public string $icon = '',
        public string $iconPosition = 'left',
        public bool $disabled = false,
        public bool $fullWidth = false,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.account-connection');
    }
}
