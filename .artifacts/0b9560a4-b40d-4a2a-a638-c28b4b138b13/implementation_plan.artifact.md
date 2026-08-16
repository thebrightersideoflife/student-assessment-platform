# Fix Recursive Daily Typing Practice Notification

The `NotificationBell` component currently persists the `deleted` state of the typing goal reminder indefinitely. If a user deletes the notification, it will not reappear on subsequent days, even though it is intended to be a daily goal reminder.

## Proposed Changes

### [NotificationBell.jsx](file:///C:/Users/ABC/Documents/The Brighter Side/student-assessment-platform/src/components/NotificationBell.jsx)

Update the `useEffect` hook that handles reminder hydration to specifically check if the `typing-goal-reminder` should be reset for a new day.

#### [MODIFY] [NotificationBell.jsx](file:///C:/Users/ABC/Documents/The Brighter Side/student-assessment-platform/src/components/NotificationBell.jsx)

- Update the logic in the `useEffect` that monitors `typingGoalMinutes` and `todayMinutes`.
- If the `typing-goal-reminder` exists and its `day` property is different from the current day, reset its `deleted` and `read` status to `false` and update the `day` to the current date.

## Verification Plan

### Manual Verification
1. Open the application and set a daily typing goal.
2. Verify the "Daily typing goal" notification appears in the bell.
3. Delete the notification using the trash icon.
4. Simulate a day change (e.g., by changing the system clock or temporarily modifying the `currentDay` logic in the code).
5. Verify the notification reappears as unread for the new day.
