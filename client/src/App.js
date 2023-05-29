import React from 'react';
import ReactPlayer from 'react-player';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const App = () => {
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://api.staging.magic.dapperlabs.com/consumer/graphql',
    // url: 'ws://localhost:9001/graphql',
    connectionParams: {
      "x-id-token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkFyR215S3VxemotZHN1Qmw4eXRtVSJ9.eyJodHRwczovL3N0YWdpbmcuYWNjb3VudHMubWVldGRhcHBlci5jb20vaWRlbnRpdHlfdmVyaWZpZWQiOnRydWUsImh0dHBzOi8vc3RhZ2luZy5hY2NvdW50cy5tZWV0ZGFwcGVyLmNvbS9mbG93X2FjY291bnRfaWQiOiI5MmU5MjY4NGY2NDU0YjAwIiwiaHR0cHM6Ly9zdGFnaW5nLmFjY291bnRzLm1lZXRkYXBwZXIuY29tL2lzTmV3QWNjb3VudCI6ZmFsc2UsImh0dHBzOi8vc3RhZ2luZy5hY2NvdW50cy5tZWV0ZGFwcGVyLmNvbS9pcCI6IjM1LjE5Ny4xMDIuMTgyIiwiaHR0cHM6Ly9zdGFnaW5nLmFjY291bnRzLm1lZXRkYXBwZXIuY29tL2lzUmVhZE9ubHkiOmZhbHNlLCJuaWNrbmFtZSI6ImNvcmV5Lmh1bWVzdG9uIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaW1wcmVzc2l2ZV9jZWxlcnk0NTcxIiwibmFtZSI6ImNvcmV5Lmh1bWVzdG9uQGRhcHBlcmxhYnMuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kYXBwZXItcHJvZmlsZS1pY29ucy9hdmF0YXItZGVmYXVsdC5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMy0wNS0wOFQxODowNzozMC4wNjlaIiwiZW1haWwiOiJjb3JleS5odW1lc3RvbkBkYXBwZXJsYWJzLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9hdXRoLnN0YWdpbmcubWVldGRhcHBlci5jb20vIiwiYXVkIjoiSm4yUUF6UkdKRkZPVVdYMUQ1R1hBMVE1a1g2TTRuRmQiLCJpYXQiOjE2ODQ1Mjg4OTIsImV4cCI6MTY4NDUyOTc5Miwic3ViIjoiYXV0aDB8NjFlNmUwY2JkOTlmZmU2MTMyN2I1NTM0In0.h839VkZGMPiuNdNBWQYNp-KhS00sWnfN_yUWbpSh-h6qmqAFXS5G9iU2VAvAdi-0rxOgjX9XrNG-PVJfprQ0oiIKIIX2hRiCxgtnUnl-B4Gg3YTBhXNis2gU6d-vjJTugyODNss8WS-M-Mh40eJDrTaWk_Xw1S3OC-A6uhJRlmR8E8v8rN_ywN7e8wlc2sZXn8fhXwnhmI26VZ2RmhlXY_FdohU04L5_ccGPSlZwHgv2Tp_J3WoUvrPhReZion_2BKA9B7sC7vi4GxfojVol-1t_2lRpb4jyU1CmoC--pJHhmhXPrMSSD8GX2iO6dp1avKMTAV-VQM3-HQ5kzvj4Gg"
    },
  }));

  const client = new ApolloClient({
    // uri: "http://localhost:8000/graphql",
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

// subscription.onClose(() => {
//   console.log('WebSocket connection closed.');
// });
  return (
    <div>
      <ReactPlayer
        url='http://localhost:8080/videos/singler.mp4'
        controls={true}
        width='100%'
        height='100%'
      />
    </div>
  );
};

export default App;



