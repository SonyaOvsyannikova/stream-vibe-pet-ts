import '../shared/styles'
import Router from "@/app/Router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // refetchOnWindowFocus: false,
            // refetchOnMount: false,
            // refetchOnReconnect: false,
        }
    }
});

const App = () => {

  return (
      <QueryClientProvider client={queryClient}>
          <Router />
      </QueryClientProvider>

  )
}

export default App
