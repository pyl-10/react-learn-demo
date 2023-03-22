import logo from './logo.svg';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
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
    // <main className="kanban-board">{children}</main>
    <main css={css`
    /* 多余空间分配权重为10，溢出空间平均分，占用大小，看width设置 */
      flex: 10;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      /* 上1rem 右1rem 下0 左1rem */
      margin: 0 1rem 1rem;
    `}>{children}</main>
  )
}

// column组件
const KanbanColumn = ({ children, bgColor, title }) => {
  // const combinedClassName = `kanban-column ${className}`
  return (
    // <section className={combinedClassName}>
    <section css={css`
      display: flex;
      flex-direction: column;
      border: 1px solid gray;
      border-radius: 1rem;
      flex: 1;
      background-color: ${bgColor};

      & > h2 {
        margin: 0.6rem 1rem;
        padding-bottom: 0.6rem;
        border-bottom: 1px solid gray;

        & > button {
          float: right;
          border: 0;
          border-radius: 1rem;
          height: 2rem;
          line-height: 1rem;
          font-size: 1rem;
          padding: 0.2rem 0.5rem;
        }
      }

      & > ul {
        /* flex 属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto */
        /* flex:1 flex-grow:1 flex-shrink:1 flex-basis:0 */
        /* 多余空间分配权重为1，溢出空间平均分，占用大小，看width设置 */
        flex: 1;
        /* 分配子项目的占用空间 */
        flex-basis: 0;
        margin: 1rem;
        /* 为什么一定要设置padding为0，不设置padding为40多 */
        padding: 0;
        overflow: auto;
        /* 由浏览器定夺，如果内容被修剪，就会显示滚动条 */
      }
    `}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  )
}

const kanbanCardStyles = css`
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;

  &:hover{
    box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,0.2), inset 0 1px #fff;
  }
`
const kanbanCardTitleStyles = css`
  min-height: 3rem;
`

//  看板-卡片 组件
const KanbanCard = ({ title, status }) => {
  return (
    <li css={kanbanCardStyles}>
      <div css={kanbanCardTitleStyles}>{title}</div>
      <div css={css`
        text-align: right;
        font-size: 0.8rem;
        color: #333;
      `}>{status}</div>
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
    <li css={kanbanCardStyles}>
      <h3>添加新卡片</h3>
      <div css={css`
        ${kanbanCardTitleStyles}
        & > input[type="text"]{
          width: 90%;
        }
      `}>
        <input type="text" value={title} onChange={handleChange} onKeyDown={handleKeyDown} />
      </div>
    </li>
  )
}

const COLUMN_BG_COLORS = {
  todo: "#c9af97",
  ongoing: "#ffe799",
  done: "#c0e8ba"
}

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
        <KanbanColumn bgColor={COLUMN_BG_COLORS.todo} title={
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
        <KanbanColumn bgColor={COLUMN_BG_COLORS.ongoing} title="进行中">
          {ongoingList.map(props => <KanbanCard key={props.title} {...props} />)}
        </KanbanColumn>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.done} title="已完成">
          {doneList.map(props => <KanbanCard key={props.title} {...props} />)}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}
export default App;