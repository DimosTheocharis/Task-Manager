# General

Task Manager is a full stack project built with Angular in frontend and Nest.js in backend. The data are stored in MySQL database. The main purpose that Task Manager serves, is to allow users to handle their tasks. Supported features:

- Create and log in your account
- Create, edit, delete a task and update it's status
- Filter the tasks and show only the open, completed etc ones
- Time bar at the top of the screen that tells you how much time has left for your log-in session

The tasks are distinguished in 3 categories:
1. **OPEN**: The tasks that user hasn't started to work on yet. [![Task with status = Open](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/taskOpen.png "Task with status = Open")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/taskOpen.png)
2. **IN PROGRESS**: The tasks that user has started working on but hasn't yet complete. [![Task with status = In Progress](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/taskInProgress.png "Task with status = In Progress")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/taskInProgress.png)
3. **COMPLETED**: The tasks that user has completed and won't work on them anymore. [![Task with status = Completed](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/taskCompleted.png "Task with status = Completed")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/taskCompleted.png)

The app runs live at link: 

# How to create an account

In order to use the app, you should have an account. You can create an account by filling the form in Register Screen. The form will provide you with information about the validity of the fields. 

[![Register Screen](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/registerScreen.png "Register Screen")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/registerScreen.png). 

You can navigate to Register Screen through the menu.

[![Register Button](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/registerButton.png "Register Button")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/registerButton.png)

# How to login

You can log in your account and then manage your tasks, by filling the form with your credentials in Login Screen.

[![Login Screen](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/loginScreen.png "Login Screen")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/loginScreen.png). 

You can navigate to Login Screen through the menu [![Login Button](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/loginButton.png "Login Button")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/loginButton.png) 

When user logs in, the backend signs a JWT token with information about the logged user, and the period of time he can use the app. A visual representation of user session's time left is viewed at the timebar. 

[![Time Bar](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/timeBar.png "Login Screen")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/timeBar.png)

# How to create a task

Once logged in. a user may create a task by clicking the 'Create new todo' button in top left corner of home screen. 

[![New task Button](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/newTaskButton.png "New task button")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/newTaskButton.png). 

Then, a popup window is appearing that prompts you to fill the values that describe a task, ie title and description. The initial status of a task is open. Similar with any form in the app, the form for task creation will provide you with information about the validity of the fields.

[![New task window](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/newTaskWindow.png "New task window")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/newTaskWindow.png)

# How to edit a task

In order to alter the status of a task or change information about it, you can click the edit button at the right side of the task. 

[![Edit Button](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/editButton.png "Edit Button")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/editButton.png). 

Then, the now-familiar popup window will be appeared allowing you perform the changes you desire. Once you are done with the changes click 'Save' at the bottom right corner of the window.

# How to delete a task

In order to delete a task you can click the delete button at the right side of the task. 

[![Delete Button](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/deleteButton.png "Delete Button")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/deleteButton.png)

Then, a popup window will be appeared that will prompt you to confirm the deletion of the todo.

[![Delete task window](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/deleteTaskWindow.png "Delete task window")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/deleteTaskWindow.png)

# How to filter tasks

The app allows user to filter the tasks in order to show the tasks that belong to one specific category only by specifing the category in the 'Status button', at the top right corner of home screen. 

[![Filter Button](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/filterButton.png "Filter Button")](https://github.com/DimosTheocharis/Task-Manager/blob/main/docs/images/filterButton.png)

