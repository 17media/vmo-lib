export const localStorageMock = () => {
  global.window = global.window ?? Object.create(window);
  let store: any = {};

  const mock = () => ({
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  });

  Object.defineProperty(window, 'localStorage', {
    value: mock(),
  });
};

export const urlMock = (url: string) => {
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
    },
  });
};
