# BeatBox
Final group project, beatbox application


## User Story

As a modern consumer, I want an easy to use application that can help keep me entertained for a few minutes at a time.

As someone who enjoys music, I want an accessible and fun way to create my own musical arrangements with very little effort.


## Acceptance Criteria

When I navigate to the application, I am presented with the landing page 

Where I can interact with a digital beatbox/drum kit.

When I press a key on my keyboard assigned to a specific sound effect, my browser plays the sound in real time.

When I enter a dollar amount in the 'tip jar', I am redirected to an external webpage

Where I can send a donation to the developer.

If I click on the login button, I am taken to a working login/sign up page.

When I submit a sign up form, my login credentials are saved in a secure database.

Once I submit the correct login criteria, I am directed back to the main page, now with more features available for use.

When I click the record button, the application will record the beatbox sounds I play within the application

Until I press the stop button, at which point a recording is rendered.

When I click the playback button, I hear the most recent recording I have made.

When I click the save button, my new recording is saved to a localized database.

When I navigate to my profile page, I am presented with a personalized homepage

Where I have access to a list of my saved audio recordings, as well as my account information and profile image.

When I upload my own profile image, it is stored in the local database and displayed on my profile page.

When I click the logout button, I am signed out of my page and redirected to the landing page.


## Screenshots

[Homepage](/client/public/assets/main-page.png)

[Login](/client/public/assets/login-page.png)

[Profile](/client/public/assets/profile-page.png)


## Deployment

[Deployed App](https://project-3-aiv6.onrender.com/)

The application's homepage allows the user to "play" with the beatbox. The user can press the corresponding keys on their keyboard to play specified sounds. The user can play with the application and make their own music without logging in. However, once the user logs in they have access to recording and saving the music they make. The record button will turn recording on and off. The playback button will play back the most recent user recording. And the save button will save the current recording to a local database.

All pages of the application have a 'tip jar' in the footer section of the page. If the user is feeling generous, they can send a dontation to the developer. There is a navigation button in the top-right corner of the page, which provides the user with the options 'sign out' and 'profile'.

When the user is directed to the profile page, they are presented with their name, email address, and a generated list of all the user's saved recordings, each of which can be played by clicking the arrow button next to the saved audio file.


## Authors

Alejandro Meza, Chris Moore, Khoi Mai


## Future Development

### Fixes

- A timing delay can affect a recording by a few milliseconds, which can be very noticeable in this application. Refactor code to minimize delays in recording/playing sounds.

- Styles are currently a work in progress.

### Features

- Add more themes with dynamic backgrounds.
- Multiple beatbox configurations with different sound libraries, selectable.
- A more robust profile page.
- Track layering and looping. 
- Sort/delete saved tracks on tracklist.
- Download saved tracks.
- Download application.
- Share tracks and playlists with other users.


## License

MIT License

Copyright (c) 2024 Chris Moore

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.