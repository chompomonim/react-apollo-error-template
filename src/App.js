import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';

class PeopleComponent extends Component {
  render() {
    const {data: {loading, people}, attempt} = this.props

    if (loading)
      return <p>Loading…</p>

    return (
      <div>
        Attempt: {attempt}
        <ul>
          {people.map(person => (
            <li key={person.id}>
              {person.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const People = graphql(
  gql`{
    people {
      id
      name
    }
  }`, {
    options: {
      fetchPolicy: 'network-only',
      // pollInterval: 1000
    }
  }
)(PeopleComponent)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {attempt: 1}
  }

  render() {
    const { attempt } = this.state
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>

        <People attempt={attempt} />

        <button onClick={() => this.setState({attempt: attempt + 1})}>Reload</button>
      </main>
    );
  }
}

export default App
