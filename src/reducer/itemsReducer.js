import { v4 as uuidv4 } from 'uuid';

export default function itemsReducer(items, action) {
  switch (action.type) {
    case 'added': {
      const { content } = action;
      return [...items, { id: uuidv4(), content, completed: false }];
    }

    case 'deleted': {
      const { id } = action;
      return items.filter(item => item.id !== id);
    }

    case 'checked': {
      const { id } = action;
      return items.map(item =>
        item.id !== id ? item : { ...item, completed: !item.completed }
      );
    }
  }
}
