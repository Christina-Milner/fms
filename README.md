# Fen Model Show registration/judging app


A custom, mobile-friendly app created with Node.js, Express and MongoDB/Mongoose to handle registration, judging and prize awards at the Fen Model Show miniatures exhibition/contest.
Live here: [https://fen.up.railway.app](https://fen.up.railway.app).

## Features
### Registration
* Participants' names and number of models are entered, as well as their competition category (Out of Competition, Junior, Standard, Master).
* Participants are assigned a unique sequential ID to put on their display
* The list of entries on this page is not clickable by default, but becomes clickable if the "Edit" button is selected in case a participant's info needs to be amended
* Name, number of models and competition category can only be edited here, the Judging page is exclusively for assignment of prizes

### Judging
* Standard: Lists "Junior" and "Standard" entrants taking part in the competition for judging.
* Masters: Lists "Masters" entrants taking part in the competition for judging.
* Other Prizes: Lists all entrants including "Out of Competition" and allows for assigning CORRR/People's Choice/Sponsor prizes.
* The two judging pages are colour-coded:
    * Red: Not yet judged
    * Yellow: First pass
    * Green: Judged
* All entries on these pages are clickable/tappable to edit.
* Enter Sponsor prizes in the free text entry field, separated by commas in the case of multiple prizes. Capitalisation doesn't matter, but spelling does.
* Commended, Bronze, Silver, Gold and Best of Show are available in Standard/Masters judging.
* There is a Best of Show each for Junior, Standard and Masters. When judging an entry, only the appropriate BoS for that entrant's category will be displayed.

### Filters
* This page is used for the prize-giving ceremony
* "Standard" lists all prizes for the Standard prize-giving: Sponsor prizes, Commended/Bronze/Silver/Gold for each Junior and Standard, Best of Show for Junior and Standard, and CORRR for these entrants.
* "Masters" lists prizes for the Masters prize-giving: Commended/Bronze/Silver/Gold, CORRR and Best of Show for Masters.

### The above categories are login gated to protect participants' personal data

### Stats
* Just shows interesting statistics about the number of entrants and models

## Updated for FMS 2024:
* There's now Out of Competition, Juniors, Standard, Masters as distinct categories as opposed to an in competition/out of competition + adult/junior.
* Judging is split up into 3 tabs for Standard (incl. Junior) judging, Masters judging and prizes not awarded by judging (Sponsors, CORRR, People's Choice).
* Judging now includes a "first pass" option between judged and not judged.
* Instead of having buttons for each category, the Filters (used for prizegiving) now list all Standard prizes on one page and all Masters prizes on the other.
* More robust error-catching and other misc fixes.


## Feedback/To-Do after first FMS event using the app (15/07/23)
* Critical error occurred when a sponsor prize was entered followed by a comma even though it was currently the only one - fix for this (disallowing the empty string in the sponsor prizes array as it would have caused issues even if the attempt to title case it hadn't crashed the server) will be going live with this README update (and issue was resolved quickly on the day)
* Forms needed to be a bit bigger on tablet-size screen as it was easy to mistap, but this is low prio as the tablet ended up not being the device of choice due to its reliance on (poor) Wi-Fi
* Next year will likely require some changes such as the introduction of Masters vs Standard categories or a yellow colour flag in Judging to allow for a "first pass" round before finalising an entry as judged
* Will remove limit on CORRR prizes (keep warning functionality, just not disallow assigning more) as organisers ended up awarding 8 instead of the planned 6
* All in all, very positive feedback for the app :)







