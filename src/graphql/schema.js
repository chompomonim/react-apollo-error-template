import sample from 'lodash/sample';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

function peopleData () {
  return [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sara Smith' },
    { id: 3, name: 'Budd Deey' },
    { id: 4, name: sample(['Steve Balmer', 'Bill Gates'])}
  ];
}

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData(),
    },
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
