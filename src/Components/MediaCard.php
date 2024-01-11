<?php

namespace Combindma\DashUi\Components;

use Illuminate\View\Component;

class MediaCard extends Component
{
    public function __construct(
        public string $id,
        public bool $portrait = false
    )
    {
    }

    public function render()
    {
        return view('dash-ui::components.media-card');
    }
}
