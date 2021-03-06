import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postNewActivity } from '../../actions/ActivitiesActions';
import { hideActivityForm } from '../../reducers/ui_reducer';
import RoutesDropdown from './RoutesDropdown';
import {
  convertDistanceToMiles,
  convertElevationToFeet
} from '../../util/conversions';

export default function NewActivityForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [sport, setSport] = useState('bike');
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [elevation, setElevation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(new Date().toTimeString().slice(0,5));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [routeId, setRouteId] = useState('');

  const errors = useSelector(state => state.errors.activity);
  const cyclingRoutes = useSelector(state =>
    Object.values(state.entities.routes).filter(route => route.sport === 'bike')
  )
  const runningRoutes = useSelector(state =>
    Object.values(state.entities.routes).filter(route => route.sport === 'run')
  )
  const [dropdownRoutes, setDropdownRoutes] = useState(cyclingRoutes)

  const setRouteInfoFromDropdown = (e) => {
    const matchingRoute = dropdownRoutes.find(route => route.id == e.target.value);
    const distance = convertDistanceToMiles(matchingRoute.distance);
    const elevation = convertElevationToFeet(matchingRoute.elevation);

    if (distance && elevation) {
      setDistance(distance);
      setElevation(elevation);
    }

    setRouteId(e.target.value);
  }

  const dateRequiredError = () => {
    return errors.includes("Date can't be blank");
  }

  const titleRequiredError = () => {
    return errors.includes("Title can't be blank");
  }

  const submit = () => {
    const duration = hours * 3600 + minutes * 60 + seconds;

    const newActivity = {
      title,
      sport,
      time,
      date,
      distance,
      elevation,
      description,
      duration,
      routeId
    };

    dispatch(postNewActivity(newActivity)).then(response => {
      const activityId = response.activity.id;
      history.push(`/activities/${activityId}`);
    })
  }

  useEffect(() => {
    let timeOfDay;
    let hourNow = new Date().getHours();
    if (hourNow < 12) {
      timeOfDay = 'Morning';
    } else if (hourNow < 17) {
      timeOfDay = 'Afternoon';
    } else {
      timeOfDay = 'Evening';
    }

    if (sport === 'bike') {
      setTitle(`${timeOfDay} Ride`);
      setDropdownRoutes(cyclingRoutes);
      setRouteId('')
    } else if (sport === 'run') {
      setTitle(`${timeOfDay} Run`);
      setDropdownRoutes(runningRoutes);
      setRouteId('')
    }
  }, [sport])

  useEffect(() => {
    if (!routeId) {
      setDistance('');
      setElevation('');
    }
  }, [routeId])

  return (
    <form id='new-activity-form' onSubmit={submit}>
      <div id='activity-form-row-3'>
        <label>
          Sport
          <select onChange={e => setSport(e.target.value)}>
            <option value='bike'>Ride</option>
            <option value='run'>Run</option>
          </select>
        </label>
        <label>
          Known Route Taken?
          <RoutesDropdown
            update={setRouteInfoFromDropdown}
            routes={dropdownRoutes} />
        </label>
      </div>
      <div id='activity-form-row-1'>
        <label>
          Distance
          <div id='distance-elevation-divs'>
            <input
              type='number' min='0' step='0.01'
              onChange={e => setDistance(e.target.value)}
              value={distance} />
              <p>mi.</p>
          </div>
        </label>
        <label id='duration-label'>Duration
          <div id='duration-input'>
            <input type='number' min='0'
              onChange={e => setHours(e.target.value)}
              value={hours} />
            <p>hr</p>
            <input type='number' min='0'
              onChange={e => setMinutes(e.target.value)}
              value={minutes} />
            <p>min</p>
            <input type='number' min='0'
              onChange={e => setSeconds(e.target.value)}
              value={seconds} />
            <p>s</p>
          </div>
        </label>
        <label>
          Elevation
          <div id='distance-elevation-divs'>
            <input
              type='number' min='0'
              onChange={e => setElevation(e.target.value)}
              value={elevation} />
            <p>ft.</p>
          </div>
        </label>
      </div>
      <div id='activity-form-row-2'>
        <label>
          Date
          <input id='activity-date-input'
            type='date'
            onChange={e => setDate(e.target.value)}
            value={date}
            className={
              dateRequiredError() ? 'activity-date-input-error' : ''
            }/>
            <p id='activity-date-input-error'>{
              dateRequiredError() ? 'Required' : ''
            }</p>
        </label>
        <label>
          Time
          <input id='activity-time-input'
            type='time'
            onChange={e => setTime(e.target.value)}
            value={time}/></label>
      </div>
      <label id='activity-title-form'>
        Title
        <input
          id='activity-title-input'
          type='text'
          onChange={e => setTitle(e.target.value)}
          value={title}
          className={
            titleRequiredError() ? 'activity-title-input-error' : ''
          }/>
        <p id='activity-title-input-error'>{
          titleRequiredError() ? 'Required' : ''
        }</p>
      </label>
      <div id='activity-description'>
        <label>
          Description
          <textarea id=''
            placeholder='How did it go? Were you tired or rested? How was the weather?'
            onChange={e => setDescription(e.target.value)} value={description}>
          </textarea>
        </label>
      </div>
      <div id='close-form-buttons'>
        <input id='activity-submit-button' type='submit' value='Create'/>
        <button
          id='cancel-new-activity'
          onClick={() => dispatch(hideActivityForm())}>
          Cancel
        </button>
      </div>
    </form>
  )
}
