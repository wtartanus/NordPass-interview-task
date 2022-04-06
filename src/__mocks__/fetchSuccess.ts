const response = {
  ok: true,
  status: 200,
}

export const fetchSuccess = async (url) => {
  switch (url) {
    case 'test/api/items': {
      return {
        ...response,
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
        ...response,
        json: async () => ({
          id: "00001",
          username: "admin",
          email: "user@organization.com",
          password: "admin"
        }),
      }
    }
    case 'test/api/login': {
      return {
        ...response,
        json: async () => ({
            token: 'token',
        }),
      }
    }
    case 'test/api/logout': {
      return {
        ...response,
        json: async () => ({}),
      }
    }
    default: {
      throw new Error(`Unhandled request: ${url}`)
    }
  }
}