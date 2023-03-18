import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My board</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>待处理</h2>
          <ul>
            {
              new Array(10).fill('').map(item => (
                <li className="kanban-card">
                  <div className="card-title">开发任务-1</div>
                  <div className="card-status">22-05-22 18:15</div>
                </li>
              ))
            }
          </ul>
        </section>
        <section className="kanban-column column-ongoing">
          <h2>进行中</h2>
          <ul></ul>
        </section>
        <section className="kanban-column column-done">
          <h2>已完成</h2>
          <ul></ul>
        </section>
      </main>
    </div>
  );
}
export default App;