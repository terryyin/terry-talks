# AI and test automation — Terry's supplied transcript

Captured from Terry's request on 2026-10-04. Original wording, including
transcription slips, repetitions, and self-corrections, is retained below;
paragraph breaks replace the supplied speech separators. The
[film story](seed.md#testing-without-unmanageable-complexity) records the
production brief and the interpreted argument.

## The idea

Should you ask AI to write automated test for you? I find, surprisingly, the right answer might not be yes. So, yes, automated test, like, and to test a unit test, they have assumed value.

They could be very useful to your project to protect things that are valuable, valuable to you. and enable you to do more. But before that value, actually, is delivered. First and foremost, an automated test is code.

Code need to run, kill code need to be maintained, code may be broke, code need to be understood to maintain, and it cause a lot of cognitive... load. Okay? So introducing automated test, before you get any benefit, is just to introduce more complex cities into your system.

If your system is in a state that the complexity of it, it's already beyond your what you can handle. Like, people cannot attend to the defects fast enough, and the backlog for buck fixing is accumulating faster than your developers can fix them. Then introducing more complexity, like automated test into the system, is just adding fuel to the fire.

It's not going to help. So in AI is a very abedient, efficient tool. If you ask it to do automated test, before we have any value from it, one thing for sure is, you'll have more code to maintain.

That is for sure. Okay? So, in that situation, a smarter way, if you have spare token to use from the AI, maybe is to first, of course, you have to establish a stable testing environment that is repeatable. isolated from the other people, so that you can do whatever you want to it.

And then you make sure you can do manual testing on it manually. And then you learn how to do it. It is, you confirm it's doable, and then you use your spare token to ask AI to perform the menu testing. to find the books, and then you fix them.

Find places need to be fixed, and then you'll fix them. Now, the good thing about this is... you are doing a lot of manual work in the background. And, uh... they are not making any damage, at least.

They are not adding anything to a repostory. So, at least it doesn't bring more complexity to the system. And as applauses, it identifies places to improve in your system without introducing new complexity to your system.

Okay, so this is the good thing about manual testing. So ask AI to do part of your manual testing, and if you have a lot of spare token to burn, don't use them to make more features. Or build automated test for your system.

Use it to run automated test. Sorry, use it to perform menu test. Manual test doesn't bring new complexity, complexity to your system.

Okay? So, and this might, this is not enough, of course, this, and with the other effort, you gradually reduce the complexity in the system, the bug in the system, to a level you can handle. And then, you have accumulated a lot of experience from this repeated, like, even AI can do it the kind of menu testing.

You can gradually transform them into your end to end test, automated style. But keep only the useful ones. Okay?

And then you can handle with the complexity of automated tests with ease, because usually, uh, to be honest, which I didn't point out from the very beginning, uh, test automation is one of the hardest, uh, area of programming. So, test automation is a programming problem. It's not a testing problem.

But because it's even harder than your most normal other problem, in domain to solve. So, that's yet another reason, introducing test automation, while your system have more complexity than you handle, it's a bad idea. So now you need to really treat it very carefully to have the test automation built in your system.

And also use your AI. If you have spare token to spare, not to add more test, okay? Or maybe build more feature.

If you have, don't build more features, just because you have more token to per. Use it to optimize the test, use it to choice best to make the test run as fast as possible. That's what.

Another thing is after that, when you have a lot of experience running this automated end to end test, you and your AI will identify, there's a lot of redundancy and waste of time. You don't really need to spend so much resource on running all these end to end tests. And then you gradually remove some of them.

I mean, aggressively. Deleting tests is very important. And then transform some of the redundant ones into the unit has a format.

So they can run really, really fast. This is a much more reasonable approach of test automation with AI.
