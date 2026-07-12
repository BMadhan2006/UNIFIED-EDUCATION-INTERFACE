function Loading() {
  return (
    <>
      <style>
        {`
          .loading-container{
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            background:#f5f7fb;
          }

          .loader{
            width:70px;
            height:70px;
            border:8px solid #e5e7eb;
            border-top:8px solid #2563eb;
            border-radius:50%;
            animation:spin 1s linear infinite;
          }

          @keyframes spin{
            0%{transform:rotate(0deg);}
            100%{transform:rotate(360deg);}
          }

          .loading-text{
            margin-top:20px;
            font-size:22px;
            font-weight:bold;
            color:#2563eb;
          }
        `}
      </style>

      <div className="loading-container">
        <div className="loader"></div>

        <div className="loading-text">
          Loading...
        </div>
      </div>
    </>
  );
}

export default Loading;