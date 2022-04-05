export async function mockFetch(url, config) {
    switch (url) {
      case 'test/api/items': {
        return {
          ok: true,
          status: 200,
          json: async () => ({ items: [{
            id: "002",
            title: "Facebook",
            description: "Facebook account that I manage",
            password: "SuperDuper5trong!",
            createdAt: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString()
          },
          {
            id: "003",
            title: "Github",
            description: "This is where I store my projects",
            password: "Password123",
            createdAt: new Date().toISOString()
          }
        ]}),
        }
      }
      case 'test/api/user': {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            id: "00001",
            username: "admin",
            email: "user@organization.com",
            password: "admin"
          }),
        }
      }
      default: {
        throw new Error(`Unhandled request: ${url}`)
      }
    }
  }