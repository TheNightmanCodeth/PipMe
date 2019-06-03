//  Copyright 2019 Joseph Diragi
//  
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//  
//      http://www.apache.org/licenses/LICENSE-2.0
//  
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

/// Make the pip button
var pipButton = document.createElement('button');
pipButton.className = 'ytp-pip-button ytp-button';
pipButton.title = 'Picture in Picture';
pipButton.setAttribute('aria-label', 'Picture in Picture');
pipButton.setAttribute('aria-haspopup', true);
pipButton.innerHTML = '<svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><use class="ytp-svg-shadow" xlink:href="#ytp-id-22"></use><path d="M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 Z" fill="#f00" id="ytp-id-22"></path></svg>';
///Assign the click action
pipButton.onclick = (async () => {
    const video = document.querySelectorAll('video')[0];
    if (video.hasAttribute('__pip__')) {
        await document.exitPictureInPicture();
    } else {
        await video.requestPictureInPicture();
        video.setAttribute('__pip__', true);
        video.addEventListener('leavepictureinpicture', event => {
            video.removeAttribute('__pip__');
        }, { once: true });
        chrome.runtime.sendMessage({ message: 'enter' });
    }
});
/// Get the youtube player controlbar
var controlbar = document.getElementsByClassName('ytp-right-controls')[0];
/// Add the pip button to it
controlbar.appendChild(pipButton);