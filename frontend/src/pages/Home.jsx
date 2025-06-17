export default function Home() {
  return (
    <main className='px-5 py-4'>
      <section className="text-center">
        <h1>Bem-vindo à aplicação da Empresa</h1>
        <h4>"Listar Colaboradores"</h4>
      </section>
      <section className="m-5 text-center">
        <div>
          <p>O meu nome é Ruben Pinto, sou desenvolvedor FullStack.</p>
          <p>Esta aplicação está dividida entre backend e frontend. Foi desenvolvida com várias tecnologias tendo uma REST API que alimenta o Frontend:</p>
          <div className="row lign-items-center m-5">
              <div className="col">
                <h3>Backend</h3>
                <ul>
                  <li>C# .Net</li>
                  <li>SQLite</li>
                </ul>
              </div>
              <div className="col">
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