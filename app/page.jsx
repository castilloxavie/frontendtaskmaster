import FormTask from "./components/FormTask"
import ListTask from "./components/ListTask"

export const dynamic = "force-dynamic"

function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-white mb-4">Task App</h1>

      <div className="flex flex-col sm:flex-row gap-x-10 gap-y-6">
        <FormTask />
        <ListTask />
      </div>
      
    </div>
  )
}

export default HomePage
