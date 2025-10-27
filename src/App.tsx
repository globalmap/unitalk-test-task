import { useOperatorsData } from "./features/operators/hooks/useOperators";

function App() {
  const { operators, addons, isLoading, error } = useOperatorsData();

  console.log({ operators, addons, isLoading, error });
  return (
    <p>1</p>
  )
}

export default App
