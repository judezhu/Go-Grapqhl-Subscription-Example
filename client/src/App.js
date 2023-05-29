import React from 'react';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const App = () => {
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://api.staging.magic.dapperlabs.com/consumer/graphql',
    // url: 'ws://localhost:9001/graphql',
    connectionParams: {
      "x-id-token":"your_jwt_token"}
  }));

  const client = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache()
  });

  const subscriptionQuery = gql`
  subscription{
  secureMessageFeed(channelRoom: PACK_PURCHASE_INTENT){
    ... on PurchaseIntent {
     purchaseIntentId
    }
  }
}
`;


// Subscribe to the new message subscription
const subscription = client.subscribe({ query: subscriptionQuery });

// Handle the received messages
subscription.subscribe({
  next(response) {
    const message = response.data;
    console.log('New message received:', message);
  },
  error(err) {
    console.error('GraphQL subscription error:', err);
  },
});

// You can also handle the WebSocket connection lifecycle events if needed
client.wsClient.onOpen(() => {
  console.log('WebSocket connection established.');
});

  return (
    <div>
      <p>Welcome to Subscription Example!</p>
    </div>
  );
};

export default App;



