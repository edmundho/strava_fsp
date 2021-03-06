
export const fetchActivities = () => (
  $.ajax({
    method: 'get',
    url: '/api/activities',
  })
);

export const fetchActivity = activityId => (
  $.ajax({
    method: 'get',
    url: `/api/activities/${activityId}`
  })
);

export const postActivity = activity => (
  $.ajax({
    method: 'post',
    url: '/api/activities',
    data: {
      activity: {
        title: activity.title,
        sport: activity.sport,
        distance: activity.distance,
        elevation: activity.elevation,
        date: activity.date,
        time: activity.time,
        duration: activity.duration,
        route_id: activity.routeId,
        description: activity.description
      }
    }
  })
);

export const deleteActivity = activityId => (
  $.ajax({
    method: 'delete',
    url: `/api/activities/${activityId}`
  })
);