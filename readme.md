# Readme

## notes & questions:

after running 2 hours I found that the first hour of live chat messages were not being reported. reloading the chat in a (non-owner) browser also showed only the most recent (whether top comments or all).

how is it resolved when: unlisted, but "publish to subscribed users' feed?" (default)

## usage

remove token.json if you want to change user

When the script runs you must oauth as someone who owns/admins the broadcasts

## How to get the livechatid:

either:
1:

```
auth as the channel owner/admin and then
listAllBroadcasts (get liveChatId for the relevant one) -> listLiveChatMessages
```

OR

```
auth as the channel owner/admin
listLiveBroadcastByID(youtube-video-id)
```

OR

```
if the video is public, not unlisted...
auth as anyone
listSearchForLiveVideos(channel)
```

- TODO: "This app hasn't been verified by Google yet. Only proceed if you know and trust the developer."
- TODO: get all pages of live chat messages
- TODO: optionally filter "cheats"
- TODO: take input of correct answers: a6 b2 c7 d3 e1 f10 g10 h5 i7 j7
- TODO: consider decimals?
- TODO: detect and ignore/ban users chatting the answer submission after the answer has been revealed
  - Timestamp? after jon says something in chat?
- TODO: can I check the livebroadcasts of someone without enabling live streaming on my account?
- TODO: output who got the most right
- TODO: show percentages of the vote for any given question:

e.g.

- 1: 19%
- 2: 2%
- 3: 2%
- 4: 3%
- 5: 30%
- 6: 41%
- 7: 3%
- 8: 0%
- 9: 0%
- 10: 0%
