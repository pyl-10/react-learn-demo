import logo from './logo.svg';
import React, { useState } from "react"
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

// board组件
const KanbanBoard = ({ children }) => {
  return (
    <main className="kanban-board">
      {children}
    </main>
  )
}

// column组件
const KanbanColumn = ({ children, className, title }) => {
  const combinedClassName = `kanban-column ${className}`
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  )
}

//  看板-卡片 组件
const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  )
}

// 添加-卡片 组件
const NewCard = ({ onSubmit }) => {
  // 设置一个title的状态为“”
  const [title, setTitle] = useState("")
  // 获取输入的值？
  const handleChange = (evt) => {
    setTitle(evt.target.value)
  }
  // 监听回车键，发送title的值
  const handleKeyDown = (evt) => {
    if (evt.key === "Enter") {
      onSubmit(title)
    }
  }

  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </li>
  )
}

// const todoTitle = (
//   <span>待处理</span>
//   <button onClick={handleAdd} disable={showAdd}>
//     &#8853;添加新卡片
//   </button>
// )

function App() {
  // useState？ setShowAdd?  设置 showAdd的状态为false
  // 当点击事件被触发时，改为true
  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = (event) => {
    setShowAdd(true)
  };
  // unshift：在数组最开头插入一个数据
  const handleSubmit = (title) => {
    todoList.unshift({ title, status: new Date().toDateString() })
    setShowAdd(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>My board</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
        <KanbanColumn className="column-todo" title={
          <>
            待处理
            <button onClick={handleAdd} disable={showAdd}>
              &#8853;添加新卡片
            </button>
          </>
        }>
          {showAdd && <NewCard onSubmit={handleSubmit} />}
          {/* 遍历数组中的对象，作为参数传给卡片组件 */}
          {todoList.map(props => <KanbanCard key={props.title} {...props} />)}
        </KanbanColumn>
        <KanbanColumn className="column-ongoing" title="进行中">
          {ongoingList.map(props => <KanbanCard key={props.title} {...props} />)}
        </KanbanColumn>
        <KanbanColumn className="column-done" title="已完成">
          {doneList.map(props => <KanbanCard key={props.title} {...props} />)}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}
export default App;