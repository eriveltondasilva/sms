import type { Inertia, App } from '@/wayfinder/types'

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: Inertia.SharedData
        flashDataType: {
            toast?: { type: App.Enums.FlashType; message: string }
        }
    }
}
