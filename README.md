# Fen Model Show registration/judging app


A custom, mobile-friendly app created with Node.js, Express and MongoDB/Mongoose to handle registration, judging and prize awards at the Fen Model Show miniatures exhibition/contest.
Live here: [https://fenmodelshow.glitch.me/](https://fenmodelshow.glitch.me/).

## Features
### Registration
* Participants' names and number of models are entered, as well as whether they are a junior or adult and taking part in the competition or not
* Participants are assigned a unique sequential ID to put on their display
* The list of entries on this page is not clickable by default, but becomes clickable if the "Edit" button is selected in case a participant's info needs to be amended
* Name, number of models, junior/adult and in competition/not in competition can only be edited here, the Judging page is exclusively for assignment of prizes

### Judging
* Shows a list of all the entries highlighted in different colours to make it easier for judges:
    * Red: In competition and not yet judged
    * Green: In competition and judged
    * Gray: Not in competition
* Entries not in competition are still eligible for some of the prizes, hence their presence in this list
* Opening an entry will display options for the appropriate prizes:
    * All entries in competition can receive Highly Commended, Bronze, Silver, or Gold medals
    * Medals are checkboxes despite being mutually exclusive choices as radio buttons don't allow for unselecting - the checkboxes are coded to only allow one selection
    * Adults in competition can receive Best of Show
    * Juniors in competition can receive Junior Best of Show
    * All entries can receive People's Choice, CORRR (a special award for entries the hosters particularly enjoy) and sponsor prizes
* Sponsor prizes are a free text entry field as the full list of sponsors willing to award prizes is not known before the event
    * Multiple sponsor prizes must be entered separated by commas, spaces and casing are irrelevant
* If attempting to award a unique prize like Best of Show when it's already been awarded, the checkbox will automatically be unselected, a warning will show, and the entry that has this prize will be displayed

### Filters
* This page is used for the prize-giving ceremony
* "No prizes" was included as a category at the organisers' request to enable a quick sanity check ensuring no display ended up without any awards despite deserving one
* "No prizes" is listed by In Competition and Out of Competition as well as Juniors and Adults
* Most other prizes only distinguish by Juniors and Adults as competition status is either obvious or irrelevant
* Sponsor prizes are listed by sponsor in alphabetical order

### The above categories are login gated to protect participants' personal data

### Stats
* Just shows interesting statistics about the number of entrants and models


## Feedback/To-Do after first FMS event using the app (15/07/23)
* Critical error occurred when a sponsor prize was entered followed by a comma even though it was currently the only one - fix for this (disallowing the empty string in the sponsor prizes array as it would have caused issues even if the attempt to title case it hadn't crashed the server) will be going live with this README update (and issue was resolved quickly on the day)
* Forms needed to be a bit bigger on tablet-size screen as it was easy to mistap, but this is low prio as the tablet ended up not being the device of choice due to its reliance on (poor) Wi-Fi
* Next year will likely require some changes such as the introduction of Masters vs Standard categories or a yellow colour flag in Judging to allow for a "first pass" round before finalising an entry as judged
* Will remove limit on CORRR prizes (keep warning functionality, just not disallow assigning more) as organisers ended up awarding 8 instead of the planned 6
* All in all, very positive feedback for the app :)

## Change wishlist for FMS 2024
* Categories now Out of Competition, Junior, Standard, Masters - replaces previous inCompetition and junior
* Separate screens for judging Standard+Junior, Masters, and assigning non-judging prizes
* Prizes on "filters" to all go on same page (as loading times at the venue made the individual categories counterproductive), only separated by:
    * Standard: All sponsored prizes, Junior commended/bronze/silver/gold/best of show, Standard commended/bronze/silver/gold/best of standard, people's choice, standard corrr
    * Masters: Masters commended, bronze, silver, gold, corrr, best of show
* "First pass" option between judged and not judged





