import { useSyncExternalStore, createContext, useContext } from 'react';
import store from '../store';

export function getServerSideProps() {
  return {
    props: {
      initialState: {
        value1: 12,
        value2: 17,
      },
    },
  };
}

const ServerContext = createContext();

const useStore = (selector = (state) => state) =>
  useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(useContext(ServerContext))
  );

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

function App({ initialState }) {
  store.serverInitialize(initialState);

  return (
    <ServerContext.Provider value={initialState}>
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
    </ServerContext.Provider>
  );
}

export default App;
