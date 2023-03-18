import logo from './logo.svg';
import './App.css';

const todoList = [
  { title: "开发任务-1", status: "23-03-17 17:18" },
  { title: "开发任务-3", status: "23-03-17 17:18" },
  { title: "开发任务-4", status: "23-03-17 17:18" },
  { title: "测试任务-3", status: "23-03-17 17:18" },
]

const ongoingList = [
  { title: "开发任务-2", status: "23-03-17 17:18" },
  { title: "开发任务-6", status: "23-03-17 17:18" },
  { title: "测试任务-2", status: "23-03-17 17:18" },
]

const doneList = [
  { title: "开发任务-7", status: "23-03-17 17:18" },
  { title: "开发任务-8", status: "23-03-17 17:18" },
  { title: "开发任务-9", status: "23-03-17 17:18" },
  { title: "开发任务-5", status: "23-03-17 17:18" },
  { title: "测试任务-1", status: "23-03-17 17:18" },
]

//  看板-卡片 组件
const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  )
}

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
            {/* 遍历数组中的对象，作为参数传给卡片组件 */}
            {todoList.map(props => <KanbanCard {...props} />)}
          </ul>
        </section>
        <section className="kanban-column column-ongoing">
          <h2>进行中</h2>
          <ul>
            {ongoingList.map(props => <KanbanCard {...props} />)}
          </ul>
        </section>
        <section className="kanban-column column-done">
          <h2>已完成</h2>
          <ul>
            {doneList.map(props => <KanbanCard {...props} />)}
          </ul>
        </section>
      </main>
    </div>
  );
}
export default App;