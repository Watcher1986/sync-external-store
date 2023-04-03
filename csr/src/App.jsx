import { useSyncExternalStore, useEffect } from 'react';
import store from './store';

// const useStore = (selector = (state) => state) => {
//   const [state, setState] = useState(selector(store.getState()));

//   useEffect(() => store.subscribe((state) => setState(selector(state))), []);

//   return state;
// };

const useStore = (selector = (state) => state) =>
  useSyncExternalStore(store.subscribe, () => selector(store.getState()));

const IncrementValue = ({ item }) => (
  <button
    onClick={() => {
      const state = store.getState();
      store.setState({
        ...state,
        [item]: state[item] + 1,
      });
    }}
  >
    Increment {item}
  </button>
);

const DisplayValue = ({ item }) => {
  return (
    <div>
      {item}: {useStore((state) => state[item])}
    </div>
  );
};

function App() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 1,
        maxWidth: 600,
      }}
    >
      <div>
        <IncrementValue item='value1' />
        <DisplayValue item='value1' />
      </div>
      <div>
        <IncrementValue item='value2' />
        <DisplayValue item='value2' />
      </div>
    </div>
  );
}

export default App;
