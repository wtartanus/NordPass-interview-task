const response = {
  ok: false,
  status: 404,
  json: async () => {
      throw new Error('not found');
  },
};

export const fetchFail = async (url) => {
  switch (url) {
    case 'test/api/login': {
      return response;
    }
    case 'test/api/user': {
      return response;
    }
    case 'test/api/items': {
      return response;
    }
    default: {
      throw new Error(`Unhandled request: ${url}`)
    }
  }
}
