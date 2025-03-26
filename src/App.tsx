import { useEffect, useState } from 'react';

function App() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    const getUrlParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const chatId = searchParams.get('u');
      const instId = searchParams.get('i');
      return { chatId, instId };
    };

    // Function to make API request and then redirect
    const processRedirect = async () => {
      const { chatId, instId } = getUrlParams();

      const instLink = new URLSearchParams(window.location.search).get('i');

      if (!chatId || !instLink) {
        console.error('Missing required parameters:', { chatId, instId });
        setErrorMessage('Missing required parameters or link');
      }

      try {
        // Make the API request
        await fetch(`https://api.puzzlebot.top/?token=EBy9ZxQGYE90P92kXiE87HeUx90Dt3Yt&method=sendCommand`, {
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
        if (instLink) {
          window.location.href = instLink;
        }


      } catch (error) {
        console.error('Error processing redirect:', error);
        // Still redirect to Instagram even if the API request fails
        setErrorMessage('Something went wrong');
      }
    };

    // Execute the process immediately when component mounts
    if (!errorMessage) {
      processRedirect();
    }
  }, []);

  return (
    <div>
      {errorMessage ? <div>{errorMessage}</div> : <div>Redirecting...</div>}
    </div>
  );
}

export default App;