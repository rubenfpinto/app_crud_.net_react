export default function Home() {
  return (
    <main className='px-5 py-4 '>
      <section className="text-center fade-in">
        <h1>Welcome to the Company Portal</h1>
        <h4>"Employee List"</h4>
      </section>
      <section className="m-5 text-center">
        <div>
          <div className="m-5 fade-in fade2">
            <p>My name is <strong>Ruben Pinto</strong>, I am a <strong>FullStack</strong> developer.</p> 
            <p className="m-0">This application is divided between <strong>Backend</strong> and <strong>Frontend</strong>.</p>
            <p>It was developed using various technologies, featuring a <strong>REST API</strong> that uses a database and powers the Frontend:</p>
          </div>
          <div className="row lign-items-center m-5 tech py-2 fade-in fade3">
              <div className="col py-1">
                <h3>Backend</h3>
                <ul>
                  <li>C# .Net</li>
                  <li>SQLite</li>
                </ul>
              </div>
              <div className="col py-1">
                <h3>Frontend</h3>
                <ul>
                  <li>Html</li>
                  <li>CSS</li>
                  <li>Javascript / React</li>
                  <li>React-Router-Dom</li>
                  <li>React-Toastify</li>
                  <li>Axios</li>
                  <li>Bootstrap</li>
                </ul>
              </div>        
          </div>
        </div>
      </section>
    </main>
  )
}