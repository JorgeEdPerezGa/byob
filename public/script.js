submitButton.addEventListener('click', handleSubmit)

async function handleSubmit() {
  const name = userName.value;
  const email = userEmail.value;

  try {
      const url =`/api/v1/authenticate`;
      const getToken = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({appName: name, email})
      });

      if (getToken.status > 299) {
        throw new Error('could not supply token');
      } else {
        const token = await getToken.json();
        handleAppend(token.token)
        return token

      }
    } catch (error) {
      throw (error);
  }
}

function handleAppend(token) {
  $('.token-container').append(`<p>${token}</p>`)
}
