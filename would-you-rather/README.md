# Reactnd-Project2
## This is the 2nd Project in Udacity's React Developer Nanodegree
- The starter code for this project was created using 'create-react-app'

## Additional Features & Changes:
- Added a "hint" (Optional) to every question, it gives a hint as to what the question is about without revealing the whole question, useful for showing the question in the home page.
- Added artificial 700 ms delay for logging in

## Possible Issues:
- handleInitialData() is called no matter if the user is authenticated or not, imo it should be changed to that it's only called after the user logs in