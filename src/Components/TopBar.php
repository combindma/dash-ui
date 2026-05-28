<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class TopBar extends Component
{
    public function __construct(
        public string $logo,
        public string $menuId,
        public string $url,
        public string $userName,
        public string $userInitials,
        public ?string $avatar = null,
    ) {}

    public function render()
    {
        return view('dashui::components.top-bar');
    }
}
