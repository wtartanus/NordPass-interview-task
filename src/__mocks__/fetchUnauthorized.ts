export async function fetchUnauthorized(url, config) {
    switch (url) {
      case 'test/api/login': {
        return {
          ok: true,
          status: 401,
          json: async () => ({}),
        }
      }
      case 'test/api/user': {
        return {
          ok: true,
          status: 401,
          json: async () => ({}),
        }
      }
      case 'test/api/items': {
        return {
          ok: true,
          status: 401,
          json: async () => ({}),
        }
      }
      default: {
        throw new Error(`Unhandled request: ${url}`)
      }
    }
  }