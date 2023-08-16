import { logoutTimeout } from '@/constants'

export const logoutRedirect = () => {
    setTimeout(() => {
        window.open('/logout', '_self')
    }, logoutTimeout)
}
