import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Calendar = ({value, jumpToMonth, returnToday, handleClickDay, todolist}) => {
  const [calendar, setCalendar] = useState([]);

  const startDay = value.clone().startOf('month').startOf('week');
  const endDay = value.clone().endOf('month').endOf('week');

  useEffect(() => {
    const day = startDay.clone().subtract(1, 'day');
    const a = [];
    while(day.isBefore(endDay, 'day')) {
      a.push(
        Array(7).fill(0).map(() => day.add(1, 'day').clone())
      )
    }
    setCalendar(a);

  }, [value]);

  function isSelected(day, value) {
    return value.isSame(day, 'day');
  }

  function grayed(day) {
    return value.format('MM') !== day.format('MM')
  }

  function isToday(day) {
    return day.isSame(new Date(), 'day')
  }


  function dayStyles(day, value, todolist) {
    if(grayed(day)) return 'grayed';
    if(isSelected(day, value)) return 'selected';
    if(isToday(day)) return 'today';
    return ''
  }

  const todoDoneState = (day, todolist) => {
    const list = todolist.filter(el => el.date === day.format('YYYYMMDD'));
    const doneList = list.filter(el => el.isDone === true);

    if(doneList.length !== list.length) {
      return 'tododo'
    } else if(doneList.length > 0 && list.length > 0 && doneList.length === list.length) {
      return 'tododo2'
    } else if(list.length === 0) {
      return ''
    }

  }


  return (
    <CalendarWrap>
      <ControlBtn>
        <button onClick={() => jumpToMonth(0)}>
          <MdArrowBackIos />
        </button>
        <YearMonth onClick={returnToday}>{value.format('MMMM YYYY')}</YearMonth>
        <button onClick={() => jumpToMonth(1)}>
          <MdArrowForwardIos />
        </button>
      </ControlBtn>
      <Dayweek>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((el) => (
          <div key={el}>
            <span>{el}</span>
          </div>
        ))}
      </Dayweek>
      <div>
        {calendar.map(week => 
          <Week key={week}>
          {week.map(day => 
            <Day key={day} onClick={() => handleClickDay(day)}>
              <div className={dayStyles(day, value, todolist)} id={todoDoneState(day, todolist)}><span>{day.format('D').toString()}</span></div>
            </Day>)}
          </Week>)}
      </div>
    </CalendarWrap>
  )
}

export default Calendar;

const CalendarWrap = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Dayweek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: .9rem;

  div {
    padding: 1rem 0;

    &:first-of-type span{
      color: red;
    }
    &:last-of-type span{
      color: blue;
    }
  }
`;

const ControlBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 1rem;
    border: 0;
    background: transparent;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const YearMonth = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  cursor:  pointer;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const Day = styled.div`
  text-align: center;
  cursor: pointer;

  &:nth-of-type(7n) span{
    color: blue;
  }

  &:nth-of-type(8n+1) span {
    color: red;
  }

  div {
    padding: 1rem .5rem;
  }

  .selected {
    position: relative;

    &:after {
      content: '';
      display: block;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 1px solid #999;
      border-radius: 10px;
    }
  }

  .today span{
    background-color: #ddd;
    border-radius: 3px;
  }

  .grayed span{
    color: #c9c9c9;
  }

  #tododo span {
    position: relative;
    
    &:after {
      content:"";
      display: block;
      box-sizing: border-box;
      position: absolute;
      bottom: -7px;
      left: 50%;
      margin-left: -3.5px;
      width: 7px;
      height: 7px;
      border: 2px solid salmon;
      border-radius: 50%;
    }
  }

  #tododo2 span {
    position: relative;
    
    &:after {
      content:"";
      display: block;
      position: absolute;
      bottom: -7px;
      left: 50%;
      margin-left: -3.5px;
      width: 7px;
      height: 7px;
      background-color: salmon;
      border-radius: 50%;
    }
  }
`;