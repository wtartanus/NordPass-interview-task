const response = {
  ok: true,
  status: 401,
  json: async () => ({}),
}

export async function fetchUnauthorized(url, config) {
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
