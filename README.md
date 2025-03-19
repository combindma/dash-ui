# UI components library for Laravel Blade, crafted with TailwindCSS and Javascript for simplicity and elegance.

[![Latest Version on Packagist](https://img.shields.io/packagist/v/combindma/dash-ui.svg?style=flat-square)](https://packagist.org/packages/combindma/dash-ui)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/combindma/dash-ui/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/combindma/dash-ui/actions?query=workflow%3Arun-tests+branch%3Amain)
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
npm install -D tailwindcss postcss @tailwindcss/postcss @tailwindcss/aspect-ratio @tailwindcss/forms @tailwindcss/typography
```

#### 2. Add Tailwind to your PostCSS configuration
Add @tailwindcss/postcss to your postcss.config.mjs file, or wherever PostCSS is configured in your project.
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
```

#### 3. Import Dashui CSS
Import the css files and add the @tailwind and source directives to your ./resources/css/tailwind.css file.

TIP: You can specify your primary color by editing primary colors.
```css
@import 'tailwindcss';
@import '../../vendor/combindma/dash-ui/resources/css/dashui.css' layer(utilities);

@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/aspect-ratio';
@plugin '@tailwindcss/typography';

@source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
@source '../../vendor/combindma/dash-ui/resources/views!**!*.blade.php';
@source '../../storage/framework/views/*.php';
@source '../**/*.blade.php';


@custom-variant dark (&:is(.dark *));

@theme {
    --font-sans: Inter, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';

    --text-*: initial;
    --text-xs: 0.75rem;
    --text-sm: 0.8125rem;
    --text-base: 0.875rem;
    --text-lg: 1.25rem;
    --text-xl: 1.5rem;
    --text-2xl: 1.875rem;
    --text-3xl: 2.25rem;
    --text-4xl: 3.052rem;

    --color-primary-50: #fafaf9;
    --color-primary-100: #f5f5f4;
    --color-primary-200: #e7e5e4;
    --color-primary-300: #d6d3d1;
    --color-primary-400: #a8a29e;
    --color-primary-500: #78716c;
    --color-primary-600: #57534e;
    --color-primary-700: #44403c;
    --color-primary-800: #292524;
    --color-primary-900: #1c1917;
    --color-primary-950: #0c0a09;
}
```

#### 4. Import javascript components to your js file
Import the js file to your ./resources/js/app.js file.
```javascript
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
            input: ['resources/css/tailwind.css', 'resources/js/app.js'],
            refresh: true,
        }),
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
    <link rel="preconnect" href="https://rsms.me/">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @vite(['resources/css/tailwind.css'])
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
