# Problem decomposition: complete raw draft

Captured from Terry's message on **2026-10-03** for
[the problem decomposition film](README.md).

Preserve this draft in full during later polishing. Only paragraph formatting
has been normalized; repetitions, fillers, wording, and transcription slips
are retained. It is source material, not the final two-minute script.

## Original draft

Let's talk about problem decomposition. Um, in software development. Decomposition is one of the most important thing in software development.

Okay, so it's, it represent the most foundational philosophy of development lifecycle. Now, one disclaimer is, we are talking about the external problem decomposition. So decompose to break the big problem into a smaller problem so that we can solve one at a time so that we can make a plan of solving it.

Okay. Most people cannot distinguish these two kind of decomposition, the problem, decomposition, and the solution decomposition. Solution decomposition is, you have the solution already, and the solution needs a structure, so it has a neat structure, and you decompose it into the structure, that is, well, representation of your solution, and then, so that, it could be understood, and, uh, uh, uh, later maintained.

We are here talking about problem decomposition. Okay, so, uh, it's, uh, so most people, uh, they see, uh, problem decomposition, that they can initially, they probably be able to see that big problem, can be decomposed into smaller problems. But after that, most of engineers quickly switched to their engineering thinking, they are speculating about the solution.

And then the further this composition will be based on their solutions. rather than a smaller breaking down into smaller problems. Okay? So this is not necessarily right.

As I mentioned, it represents certain philosophy. Okay? So here we have two premises.

One is a big problem, external user problem can be break down into smaller user centric, smaller problems with narrow scope. And if it's too big, we can still, like, break it down into even smaller user centric, smaller user centric problems, scenarios. So without open the box and see the solution.

Okay? That's one premise. And the other premise is, uh, no plan actually guaranteed a successful, a successful solution.

So software development is problem solving, and no problem, no process, guarantees a solution. So we don't pretend it will. OK?

So the plan is an attempt to solve the problem, not a guaranteed procedure to solve the problem. If it's guaranteed, it doesn't really matter. So you can start with a solution as gradually build it, but our premise is, it is not.

It just attempt, okay? Okay, after that, we have two goals based on our philosophy. So our decomposition want to achieve 2 goals.

Okay? By this way of decomposing. So first, we want the problem to be decomposed in smaller problems so that the weekend receive value and get feedback from the value.

Okay, that's the first one. Let me elaborate a little bit about the value. So value here, there are two values.

One is external user value. Okay, so what the customer, who is paying for the development, benefit from this? Okay.

So, the other one, so each of these decomposition, the thing we get, the unit we get, independently deliver that value. Okay? And by itself.

And another value is an option value, option as in stock option, or in this case, more like a real option. So it's the potential the product have. The speculative potential that the product have, that it will be very cheap for the product in the future, to implement some important new feature without actually doing it right now, because actually doing it, actually reduce the option value, because once you implement one weight, the of doing it another way is closed.

So the option value is a speculative potential, like the most likely future high value, high external value stuff can be obtained with low cost. Okay? That's the option value.

So we receive, the first one is very easy to get. The second value is a bit hard to evaluate. But anyway, so the first goal is to deliver value and be able to receive feedback.

Okay, each of them, we can get feedback from it. The second goal of our approach of splitting is that... We want to split in such a way that we can do each of the unit, okay, and stop at any time.

So that whatever effort we spent on, on, like the finished unit, the value is already delivered. The feedback is already received. It already materialized.

And whatever in the decomposition, we haven't done yet. If we change direction, we don't do that anymore. There's no waste, okay?

So, there's nothing that promised, but not delivered, and there's no damage, and, uh, yeah. So, and no cleaning up to make sure that that doesn't damage any of these 2 values. But these are the 2 values.

Two goals. Okay, so I would call the goals, as I mentioned, the optimization goals. So what are we trying to optimize? by using this way of decomposing problems?

And, uh, just now, it was the 1st optimizational goal of this way of decomposition, which is, we want, uh, to decompose it in such a way that each, uh, unit, independently, uh, represents something that we can deliver of value and get feedback from delivered value. As I mentioned, the values, there are 2 part in the value, the external customer value, the reality check, we are making useful things, and it's actually useful. And uh, the option value, which is uh, the value that uh, uh, the owner of the product, uh, having the options.

So that's 1st goal, okay? 2nd goal is we want a decomposition that we can stop at any time. So, let's say if one big problem is solved, uh, uh, decomposed into a few, uh, uh, slices, and then we complete uh, a few of them and we didn't start the others.

Okay? We can stop at any time, uh, like, then, whatever we have done, we have spent effort on the presumed value is already delivered. The value doesn't depend on other things to be integrated. to be realized, they are already realized.

So, uh, that's part one and part 2 is whatever we haven't done, uh, there's no waste. Uh, Because, uh, we didn't do, uh, spend much effort, uh, or deprive the option, because of, uh, deprive the options, because of those uh, not started units. So we can just stop at any time without extra cost.

Now we need this is because uh, uh, when we achieve our 1st goal, okay, when one uh, a unit deliver its value, and we can receive feedback, and then we realize we need to adjust the plan and change direction. But if we are following a plan that uh, we cannot really stop without uh, 0 uh, lost. A cost, uh, then the switching direction will become expensive.

Um, uh, we cannot really just adjust the direction that. So this is, uh, the, uh, Second goal we want to achieve. So, uh, I want to add to the beginning, uh, content that, uh, the goal of a problem solving is to derive a plan so that we can follow, and in the hope that we can get the problem solved.

And it's typically incomplete because it's, I mean, it's a boundary, it's fuzzy. Okay. So those are the premises and optimizational goals.

And the next, when we're following this, there's a few principles. The first one is, uh, typically, uh, imply vertical slicing. But because each of the units will represent external user value, then usually it's it's not confined to a certain structure of our production existing solution.

So it will cut across the text deck vertically, and likely one slicing will touch every part. We might refer to this as a 3 Vs. The 3 Vs can be fined in one of my ADRs in other projects, apply to it.

Okay, that's one principle to follow. And the 2nd one is one at a time, the one piece flow. So, uh, It's actually trickier than that.

Yeah, so we want to, uh, complete, uh, uh, one thing, uh, uh, at the time. So starting a few things, uh, in parallel, is, uh, uh, defeating our 2nd goal. So, uh, then the switching cost will be, uh, high if we have too much work in progress.

So if multiple teams are working, we want them to work on multiple items that belongs to the same larger goals. And for the integration, it's their internal communication collaboration problem. It's just different from the planning.

Yeah, it might provide a good opportunity for them to collaborate. The second one, the third one is... It's fractal, it's fractal, because at a higher level, when we get the high, big customer problem, we could decompose it into smaller problem with the smaller scope to solve.

And then we can further decompose it into like a smaller scenario, more specific scenarios, to solve. And when we are engineering those solutions, we can follow the similar pattern, like we decompose our actions into plans that still, like, decomposed by external user value, but we make it into actions that we can make smaller commit, like, every five to ten minutes. And then each of them still deliver, uh, a fraction of the same thing, like, which is, uh, it's, uh, external value is embodied and then, uh, it's, and then there's no waste.

We don't have anything that is just only preparing for the future. But instead, we only do things that is serving the current purpose. So it's a fractal structure.

And then the next principle is... Whole product focus. So, whole product of whole product focus, sons, contradicting, because it sounds like the whole product, if it's a huge product, if you focus on the whole product, that means no focus.

But actually, the whole focus is, because the nature of this way of planning, there's no mapping between the plan and the goal of the plan to the solution structure. As I mentioned earlier, we do eventually need a proper internal solution structure. The thing do need to have a good internal design.

Except there's no direct map. Actually, through the process of following these planning, by gradually applying these sliding, we are growing the design organically. Except there's no mapping, dark mapping, so that when people are actually following this plan, a sequence to do the problem solving, when they are applying the solution, they need to be able to change whichever part they need to change.

And then they need to take care of the entire health, healthy of health, of the whole system, the whole system need to be cohesive and have a clear mapping and direct mapping to the business domain. Okay? This sounds intimidating, but typically, because the scope of the story itself, the scope of the slicing each unit is of the user value is narrow.

Therefore, the potential impact of the actual change they need to make in the Prussian code, or in the solution, is also limited. So it's scoped, not by the structure of the solution, but scoped by the requirement. So, it's the same kind of, like, reducing the cognitive load.

So it still can be handled. Okay? So, the whole product focus is extremely important.

Uh, so that we are not merely just solving the problem, but uh, damaging the uh, health of the product. Actually, if we follow this principle, it's actually a good opportunity to create a better design, organically, and we are increasing the option value of the product instead of accumulating technical debt. So these are the principles we need to follow while executing this.

So, um, we might need to decide a few terminologies as well. Uh, because I didn't, I try not to use the word stories, uh, but at, uh, the higher levels, uh, breaking, we might call the slightest, uh, stories. Uh, yeah, and the lower level one we might call it uh, slices or leaves.

This is up to be decided. Oh, another thing is, um, The 2 optimizational goals need to be linked to the just in time concept in GPS. We're probably not naming TPS, but just in time need to be there.

So we delivered the, uh, user value just in time. When the user actually needed, and we, uh, deliver to get feedback so that we do not deliver more than they can feedback. Okay?

And then, um, uh, it's also in the, Same spirit of just in time when people are trying, when developers are trying to deliver it, they will, uh, need to be resourceful and utilize whatever they have at hand and try their best to satisfy the customer's need. Uh, and then after that, the 3rd goal also matched just in time because it, uh, uh, reduced the switching cost, uh, because, uh, yeah. You can stop at any time.

Uh, without, uh, provide, uh, producing waste by, uh, uh, still continuing when something is already wrong. When the direction is already wrong. Okay, so that need to be there as well.
