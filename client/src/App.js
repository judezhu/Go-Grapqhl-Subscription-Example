import React from 'react';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const App = () => {
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://api.staging.magic.dapperlabs.com/consumer/graphql',
    // url: 'ws://localhost:9001/graphql',
    connectionParams: {
      "x-id-token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFyR215S3VxemotZHN1Qmw4eXRtVSJ9.eyJwcmVmZXJyZWRfdXNlcm5hbWUiOiJqdWRlemh1MSIsInBpY3R1cmUiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vZGFwcGVyLXByb2ZpbGUtaWNvbnMvYXZhdGFyLWFic3RyYWN0LTIucG5nIiwiaHR0cHM6Ly9zdGFnaW5nLmFjY291bnRzLm1lZXRkYXBwZXIuY29tL2lkZW50aXR5X3ZlcmlmaWVkIjp0cnVlLCJodHRwczovL3N0YWdpbmcuYWNjb3VudHMubWVldGRhcHBlci5jb20vaXNOZXdBY2NvdW50IjpmYWxzZSwiaHR0cHM6Ly9zdGFnaW5nLmFjY291bnRzLm1lZXRkYXBwZXIuY29tL2lwIjoiMTMxLjIyNi40Ny42NiIsImh0dHBzOi8vc3RhZ2luZy5hY2NvdW50cy5tZWV0ZGFwcGVyLmNvbS9pc1JlYWRPbmx5IjpmYWxzZSwibmlja25hbWUiOiJqdWRlLnpodSsxIiwibmFtZSI6Imp1ZGUuemh1KzFAZGFwcGVybGFicy5jb20iLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNS0yOVQxNTo1MzoxMC43NDZaIiwiZW1haWwiOiJqdWRlLnpodSsxQGRhcHBlcmxhYnMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vYXV0aC5zdGFnaW5nLm1lZXRkYXBwZXIuY29tLyIsImF1ZCI6IkpuMlFBelJHSkZGT1VXWDFENUdYQTFRNWtYNk00bkZkIiwiaWF0IjoxNjg1Mzc1NjEzLCJleHAiOjE2ODUzNzY1MTMsInN1YiI6ImF1dGgwfDVlYTA3MmRlODQ5MTZkMGNhY2EwMTY0YyIsImFjciI6Imh0dHA6Ly9zY2hlbWFzLm9wZW5pZC5uZXQvcGFwZS9wb2xpY2llcy8yMDA3LzA2L211bHRpLWZhY3RvciIsImFtciI6WyJtZmEiXSwic2lkIjoiNmJDdFpxc3NmcHBGN3BvbEtSSEhWbFFjb0RUbnc1XzkiLCJub25jZSI6Im9VMjE3OHZDQ1J2ZHlIbWQyeUR4anVvOUItQVZFX21iNnhkWmEycFU0ZlUifQ.Mv0yYlak2YNG2GZLB-iG693UkN2Sgh1m8-ISjfeOjOmUiUGO_evO3WDQBX_DX8fjYMjzChazhrGBif3acYJo6KkhD7V3eh-OTd7Cci1kTabQdAnEiEKzrT09C-LdYR4lAPpuXCj4U0Gj_DuVB6Qy-Ls4peXD9Oq6rcFo1cPGRhMml40bqYqfaEK1NILuGg-2kJygT8qsXQZu6rysyjkT7KClTsqgKJeEjQ-MXNuzna-NLo2y1_W369QT-Ua57DQEZcgXPq3XEs8oiuO84fnet_dSc3FP-nz-vNyBrFECW66xlovo0lhxRci5wSxzOpHY1sox4SzPnT8MM_uaGpDS9Q"}
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



