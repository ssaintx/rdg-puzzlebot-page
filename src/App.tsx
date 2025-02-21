import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const TOKEN = process.env.TOKEN
    const getUrlParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const chatId = searchParams.get('chatId');
      const instId = searchParams.get('instId');
      return { chatId, instId };
    };

    // Function to make API request and then redirect
    const processRedirect = async () => {
      const { chatId, instId } = getUrlParams();
      
      if (!chatId || !instId) {
        console.error('Missing required parameters');
        return;
      }

      try {
        // Make the API request
        await fetch(`https://api.puzzlebot.top/?token=${TOKEN}&method=sendCommand`, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            command_name: 'add_n',
            tg_chat_id: chatId
          })
        });
        
        // Redirect to Instagram immediately after the request is complete
        window.location.href = `https://instagram.com/p/${instId}`;
      } catch (error) {
        console.error('Error processing redirect:', error);
        // Still redirect to Instagram even if the API request fails
        window.location.href = `https://instagram.com/p/${instId}`;
      }
    };

    // Execute the process immediately when component mounts
    processRedirect();
  }, []); 

  return <div>Redirecting...</div>;
}

export default App;