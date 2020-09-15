const data = {
  products: [{
      id: 1,
      name: 'Mąka',
      categoryName: 'groceries',
      categoryId: 2,
      amount: 2,
      unit: 'kg',
      limit: 0,
    },
    {
      id: 2,
      name: 'Cukier',
      categoryName: 'groceries',
      categoryId: 2,
      amount: 1,
      unit: 'kg',
      limit: 0,
    },
    {
      id: 3,
      name: 'Olej',
      categoryName: 'groceries',
      categoryId: 2,
      amount: 0.5,
      unit: 'l',
      limit: 100,
    },
    {
      id: 4,
      name: 'Woda',
      categoryName: 'drinks',
      categoryId: 1,
      amount: 3,
      unit: 'l',
      limit: 5,
    },
    {
      id: 5,
      name: 'Kawa',
      categoryName: 'drinks',
      categoryId: 1,
      amount: 200,
      unit: 'g',
      limit: 0,
    },
    {
      id: 6,
      name: 'Karma dla psa',
      categoryName: 'animals',
      categoryId: 6,
      amount: 5,
      unit: 'kg',
      limit: 0,
    },
    {
      id: 7,
      name: 'Banany',
      categoryName: 'fruits',
      categoryId: 5,
      amount: 4,
      unit: 'szt',
      limit: 5,
    },
    {
      id: 8,
      name: 'Ziemniaki',
      categoryName: 'fruits',
      categoryId: 5,
      amount: 10,
      unit: 'kg',
      limit: 20,
    },
    {
      id: 9,
      name: 'Żel pod prysznic',
      categoryName: 'cosmetics',
      categoryId: 4,
      amount: 2,
      unit: 'szt',
      limit: 4,
    },
    {
      id: 10,
      name: 'Papier toaletowy',
      categoryName: 'cosmetics',
      categoryId: 4,
      amount: 10,
      unit: 'rolki',
      limit: 0,
    },
  ],

  category: [{
      id: 1,
      title: 'Napoje',
      name: 'drinks',
      icon: 'Category/drink.png',
    },
    {
      id: 2,
      title: 'Artykuły spożywcze',
      name: 'groceries',
      icon: 'Category/groceries.png',
    },
    {
      id: 3,
      title: 'Pieczywo',
      name: 'breads',
      icon: 'Category/breads.png',
    },
    {
      id: 4,
      title: 'Kosmetyki',
      name: 'cosmetics',
      icon: 'Category/cosmetics.png',
    },
    {
      id: 5,
      title: 'Owoce i warzywa',
      name: 'fruits',
      icon: 'Category/fruit.png',
    },
    {
      id: 6,
      title: 'Dla zwierząt',
      name: 'animals',
      icon: 'Category/animals.png',
    },
  ],
  editedIdProduct: null,
};

const rootReducer = (state = data, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: [...state.products].filter((item) => item.id !== action.payload.id),
      };

    case 'SET_LIMIT':
      return {
        ...state,
        products: [...state.products].map((product) => {
          if (product.id === action.payload.id) {
            product.limit = action.payload.limit;
            return product;
          }
          return product;
        }),
      };

    case 'EDIT_PRODUCT':
      return {
        ...state,
        products: [...state.products].map((product) => {
          if (product.id === action.payload.id) {
            product.amount = action.payload.amount;
            product.unit = action.payload.unit;
            return product;
          }
          return product;
        }),
      };

    case 'EDITED_ID_PRODUCT':
      return {
        ...state,
        editedIdProduct: action.payload.id,
      };

    default:
      return state;
  }
};

export default rootReducer;