const { GraphQLServer } = require('graphql-yoga')


let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },
        delete: (parent, args) => {
            const idToDelete = Number(args.id)
            idCount--;
            const deletedLink = links.splice(idToDelete, 1)[0]
            console.log(deletedLink);
            return deletedLink
        },
        update: (parent, args) => {
            const index = args.id;
            delete args.id
            const oldLink = links[index]
            newLink = { ...oldLink, ...args }
            links[index] = newLink
            console.log(links[index]);
            return links[index]

        }
    }
}

const server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers,
})

server.start(() => {
    console.log(`Server is running on http://localhost:4000`);
})