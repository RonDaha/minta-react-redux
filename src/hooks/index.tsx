import { useLocation } from 'react-router-dom'

/* Custom Hook to extract the pathname */
export const usePath = () => {
    const location = useLocation()
    return location.pathname.replace('/', '')
}
