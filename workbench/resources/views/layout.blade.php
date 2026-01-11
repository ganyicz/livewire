<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="dark:bg-zinc-900">
    <livewire:dynamic-component :is="$component" />

    <script>
        document.addEventListener('livewire:init', () => {
            window.livewirePendingRequests = 0;

            Livewire.hook('request', ({ url, options, payload, respond, succeed, fail }) => {
                window.livewirePendingRequests++;

                window.dispatchEvent(new CustomEvent('livewire:request'))

                succeed(() => {
                    window.livewirePendingRequests--;

                    window.dispatchEvent(new CustomEvent('livewire:response'))
                })

                fail(() => {
                    window.livewirePendingRequests--;

                    window.dispatchEvent(new CustomEvent('livewire:response'))
                })
            })
        })
    </script>
</body>
</html>