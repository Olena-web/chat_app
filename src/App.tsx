import React, { useEffect, useState } from 'react';
import { ChannelSort, StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const userToken = process.env.REACT_APP_USER_TOKEN;
const accessKey = process.env.REACT_APP_ACCESS_KEY;
const appId = process.env.REACT_APP_APP_ID;

const filters = { type: 'messaging', members: { $in: ['purple-sunset-9'] } };
const sort: ChannelSort = { last_message_at: -1, updated_at: -1 };

const App = () => {
  const [chatClient, setChatClient] = useState(null) as [StreamChat | null, Function];

  useEffect(() => {
    const initChat = async () => {
      const client = new StreamChat(accessKey? accessKey: '');
      //const client = StreamChat.getInstance(accessKey);

      await client.connectUser(
        {
          id: 'purple-sunset-9',
          name: 'purple-sunset-9',
          image: 'https://getstream.io/random_png/?id=purple-sunset-9&name=purple-sunset-9',
        },
        userToken,
      );

      setChatClient(client);
      
    };

    initChat();
  
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme='messaging light'>
      <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
