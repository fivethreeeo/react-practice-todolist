export default function itemsReducer(items, action) {
  const { type, item } = action;

  switch (type) {
    case 'added': {
      return [...items, item];
    }

    case 'deleted': {
      return items.filter(({ id }) => id !== item.id);
    }

    case 'updated': {
      return items.map(prev => (prev.id === item.id ? item : prev));
    }
  }
}
