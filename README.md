# Brief

To create a memory game using entirely functional components. The rules are:

- The user is presented with a selection of pictures and must click one
- On each click, a new set of pictures is displayed
- For each new set of pictures, the user must try to click a new picture

## Thoughts before beginning

I want this one to look good, so I intend on creating a few animations and will make it at least basically responsive. I'm relatively sure that wherever I choose to store the 'score' logic, there'll be a better solution out there (perhaps involving Redux), but I'm pretty sure I can get functionality there.

## Thoughts after finishing

I guess I've managed to fulfil my brief, but I feel this project took me far longer than it could have for all the extra criteria I set myself. Two things I particularly didn't like with other user submissions were:

- Usually one set of pictures being shuffled around. I wanted an enormous pool of pictures (in my case 40) from which a set would be pulled on each refresh (in my case, 9), with logic to guarantee that the final set would include at least 1 unclicked picture.
- I wanted a 'win state' alerting the user and recommencing the game.

This presented a _lot_ of challenges, with random number calculations and subsequent mapping of objects from an array taking long enough to introduce asynchronicity to the program when this is essentially my first React hook-based project. I found myself researching `useMemo`, `useCallback`, `suspense` and many other advanced features which I don't yet feel fully equipped to understand. However, there are some successes of which I'm proud:

## Successes

- Code accounting for:
  - Any number of images
  - Any sized grid (as long as total tiles < number of images)
- Animations and coloured visual cues for a more 'pleasant' game experience
- Responsive page design (with a little CSS distinction between touch vs mouse)

## Areas for improvement (were time infinite)

So many more deep-dives I'd have love to have done, but I have to accept that I could work on this project forever and have to stop somewhere.

### Optimise rendering

As things stand, I felt that the course was recommending that I take the opportunity to separate state concerns in to individual values, but I'm aware that this means that if many values need to be updated at once, this will cause multiple renders of the component. `<Game />` renders several times on each click, I'd like to come back to this when I have more knowledge and experience and improve render efficiency.

### Optimise images

This is begging for a `srcset`, but I wasn't ready for the complication it would add to my `imageLoader` and subsequent code.

### Improve transition logic

For now I just use fading in and out and `setTimeout` to stop image pop-in on load. Ideally each image should have something like `onLoad={props.reportLoad}` which only sets opacity to 1 on success, but I was getting random fires on the function when I tried it. Again, I'd need to fully understand how React works to debug, so I decided to put a pin in this until I'm more experienced.

### Improve user experience

- The scoreboard's pretty basic, it could do with much more creativity.
- The win state is currently just an alert, ideally it should be a whole other component which appears, maybe a floating box with a congratulatory message.

## TO FIX

There's a nasty bug I couldn't track down, where _randomly_ on successful completion of the game, the board will reset with one image duplicated. I can't tell if it's my `useEffect` hook checking for and replacing a clicked item if all items are clicked at some unusual point in the game state reset or something else entirely. However, having not yet completed the testing module, I could only replicate the bug when _manually successfully completing the game with the full picture count multiple times_ (read: spend 10mins playing the game repeatedly to get one error report), so it was just too much of a timesink. I look forward to learning about testing!

Anyway, if you win (well done, it's a tough game) and the bug affects you, sorry!

**NOTE: Images used under fair use, I shall remove them immediately if requested**
