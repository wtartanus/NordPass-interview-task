export async function fetchFail(url, config) {
    switch (url) {
      case 'test/api/login': {
        return {
          ok: true,
          status: 404,
          json: async () => {
              throw new Error('not found');
          },
        }
      }
      case 'test/api/user': {
        return {
          ok: true,
          status: 404,
          json: async () => {
              throw new Error('not found');
          },
        }
      }
      case 'test/api/items': {
        return {
          ok: true,
          status: 404,
          json: async () => {
              throw new Error('not found');
          },
        }
      }
      default: {
        throw new Error(`Unhandled request: ${url}`)
      }
    }
  }