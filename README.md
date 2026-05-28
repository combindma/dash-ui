# UI components library for Laravel Blade, crafted with TailwindCSS and Javascript for simplicity and elegance.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/combindma/dash-ui.svg?style=flat-square)](https://packagist.org/packages/combindma/dash-ui)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/combindma/dash-ui/fix-php-code-style-issues.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/combindma/dash-ui/actions?query=workflow%3A"Fix+PHP+code+style+issues"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/combindma/dash-ui.svg?style=flat-square)](https://packagist.org/packages/combindma/dash-ui)


If you ever dreamed of having a Shopify admin, DashUI offers a suite of UI components, all inspired by [Shopify Polaris](https://polaris.shopify.com/components), exclusively crafted with TailwindCSS, Laravel Blade and Javascript. These components are designed for effortless integration and offer various customization options.

## About Combind Agency

[Combine Agency](https://combind.ma?utm_source=github&utm_medium=banner&utm_campaign=package_name) is a leading web development agency specializing in building innovative and high-performance web applications using modern technologies. Our experienced team of developers, designers, and project managers is dedicated to providing top-notch services tailored to the unique needs of our clients.

If you need assistance with your next project or would like to discuss a custom solution, please feel free to [contact us](mailto:hello@combind.ma) or visit our [website](https://combind.ma?utm_source=github&utm_medium=banner&utm_campaign=package_name) for more information about our services. Let's build something amazing together!

## Demo
Experience DashUI in action by visiting the [Demo Project](https://github.com/combindma/demo-dashui). The demo provides a practical showcase of the DashUI components, allowing you to see how they can be integrated and customized in a real Laravel application.

## Installation

You can install the package via composer:

```bash
composer require combindma/dash-ui
```

Optionally, if you intend to use [Blade Google Material Design Icons](https://github.com/codeat3/blade-google-material-design-icons) as it is the case in the demo, run this command:

```bash
composer require codeat3/blade-google-material-design-icons
```

We recommend you to enable icon caching using:
```bash
php artisan icons:cache
```

Optionally, you can publish the views using:

```bash
php artisan vendor:publish --tag="dash-ui-views"
```

## Setup

#### 1. Installing Tailwind CSS
Install tailwindcss and its peer dependencies via npm.
```bash
npm install -D tailwindcss @tailwindcss/forms @tailwindcss/typography @tailwindplus/elements
```

#### 2. Import Dashui CSS
Import the css files and add the @tailwind and source directives to your ./resources/css/app.css file.

```css
@import 'tailwindcss';
@import '../../vendor/combindma/dash-ui/resources/css/dashui.css';

@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/typography';

@source '../../vendor/combindma/dash-ui/resources/views/**/*.blade.php';
@source '../../vendor/combindma/dash-ui/resources/js/dashui.js';
```

#### 4. Import JavaScript components to your js file
Import the js file to your ./resources/js/app.js file.
```javascript
import '@tailwindplus/elements';
import '../../vendor/combindma/dash-ui/resources/js/dashui.js';
```

#### 5. Update vite config file
Add this to your file vite.config.js
```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
```

#### 6. Start your build process
Run your build process with
```bash
npm run build
```

#### 7.Start using Dash UI in your project
Make sure your compiled CSS and Javascript are included in your main layout.
```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600&display=swap" rel="stylesheet" />
    @vite(['resources/css/app.css'])
</head>
<body class="antialiased">

@vite(['resources/js/app.js'])
</body>
</html>
```

## Usage
See the full [documentation](https://combind.notion.site/Dash-UI-288a0eaa11854c69acae5da7842ee788?pvs=4) for all components and how to use them.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Combind](https://github.com/Combind)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
