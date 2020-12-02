const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const config = require('./utils/config');
const Book = require('./models/book');
const Author = require('./models/author');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result = await Book.find({}).populate('author');

      if (args.author) {
        result = result.filter((book) => book.author.name === args.author);
      }
      if (args.genre) {
        result = result.filter((book) => book.genres.includes(args.genre));
      }
      return result;
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => await Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.SECRET) };
    },
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author });
      let currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        if (!author) {
          author = new Author({ name: args.author, id: uuid() });
          await author.save();
        }
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }

      let book = new Book({ ...args, author: author.id, id: uuid() });
      try {
        await book.save();
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
      book.author = author;
      return book;
    },
    editAuthor: async (root, args, context) => {
      let authorToEdit = await Author.find({ name: args.name });
      let currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        authorToEdit = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
      return authorToEdit;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
