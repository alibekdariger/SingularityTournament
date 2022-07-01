import AlertMessage from '../functions/alert';

export default function StartButton(id) {
  return (
    <button
      onClick={() => {
        start(id);
      }}
      className="sliding-button"
    >
      <span>Start</span>
    </button>
  );
}

async function start(id) {
  try {
    const token = sessionStorage.getItem('token');
    const req = await fetch(
      `http://localhost:8189/api/v1/app/tournament/start/${id.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await req.json();
    if (res.statusCode === 406) {
      AlertMessage(res.message, 'error');
    } else {
      AlertMessage(res.message, 'success');
    }
  } catch (error) {
    console.log(error);
  }
}