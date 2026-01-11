// Resolves immediately if there are no pending Livewire requests,
// otherwise waits for the next 'livewire:response' event and then resolves.
export function noPendingLivewireRequests() {
    return new Promise(resolve => {
        let resolver = () => {
            if (window.livewirePendingRequests == 0) {
                window.removeEventListener('livewire:response', resolver)

                requestAnimationFrame(() => resolve())
            }
        }

        window.addEventListener('livewire:response', resolver); resolver()
    })
}

// Waits for the next 'livewire:response' event and resolves only if
// there are no pending Livewire requests at that time.
export function livewireRequestsFinished() {
    return new Promise(resolve => {
        let resolver = () => {
            if (window.livewirePendingRequests == 0) {
                window.removeEventListener('livewire:response', resolver)

                requestAnimationFrame(() => resolve())
            }
        }

        window.addEventListener('livewire:response', resolver);
    })
}