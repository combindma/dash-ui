<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class PageHeader extends Component
{
    public function __construct(
        public string $title,
        public string $backAction = '',
        public string $subtitle = '',
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.page-header');
    }
}
