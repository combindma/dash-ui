<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class TopBar extends Component
{
    public function __construct(
        public string $menuId,
        public string $logo,
        public string $url,
        public string $userName,
        public string $userInitials,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.top-bar');
    }
}
