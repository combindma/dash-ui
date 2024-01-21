<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class ExpandableSearch extends Component
{
    public function __construct(
        public bool $preventSubmit = false,
    ) {
    }

    public function render()
    {
        return view('dash-ui::components.expandable-search');
    }
}
