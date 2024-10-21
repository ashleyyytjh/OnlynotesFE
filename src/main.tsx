import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
            <Toaster />
        </Provider>
    </QueryClientProvider>,

    // </StrictMode>
)
