<nav class="relative flex h-full flex-grow flex-col py-4 z-[1] lg:py-6">
    {{ $slot }}
</nav>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const subNavItems = document.querySelectorAll('.sub-navigation li');
        let foundActive = false;

        subNavItems.forEach(function(li) {
            if (li.querySelector('.sub-navigation--selected')) {
                foundActive = true;
                return;
            }

            if (!foundActive) {
                const link = li.querySelector('a');
                if (link) {
                    link.classList.add('sub-navigation--before');
                }
            }
        });
    });
</script>
