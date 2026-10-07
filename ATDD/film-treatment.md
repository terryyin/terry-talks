# ATDD — Work through one scenario — film treatment

English · 1080 × 1080 · 30 fps · **149.03 seconds**

A narrated ATDD film adapted from Terry Yin's workshop. The full
[content analysis](content-analysis.md) retains the source argument.

Two recreated whiteboard diagrams drive the presentation: a solution
tree and a clockwise chain of evolving acceptance-test sheets. Local
test loops and a five-person split/rejoin show how the team develops
one scenario together. Settings only annotate that process.

The [diagram analysis](diagram-analysis.md) maps the topology and
changing states to the source frames and timed explanation. Human
avatars clarify the spoken collaboration; board checkpoint marks
remain saved evidence. The legacy account names are abstracted.

| Time | Scene | Spoken narration |
| --- | --- | --- |
| 0.00–14.00s | The imagined solution tree | Picture software as a tree: front end, back end, and smaller parts. It seems we must build from the bottom, then integrate upward. But assumptions about those parts can be wrong. We build things the result never needed. |
| 14.00–26.60s | A narrow result grows the structure | Instead, define one small end-to-end scenario with an automated test. Build enough to pass it; let the structure grow as needed. As it forms, useful internal tests can cover several lower parts together. |
| 26.60–35.70s | A sprint item becomes meaningful scenarios | Break a sprint item into small Given, When, Then scenarios. Each should satisfy a user need on its own. Here, we change a setting and check the displayed result. |
| 35.70–46.40s | Automate a step and observe it | Take one scenario. Automate its first step using what already exists. Run it, and see it pass. Keep that executable evidence. The rest of the scenario is still unfinished. |
| 46.40–55.40s | The next step really fails | Add selection. Run it: the test fails because the dropdown is missing. We have evidence of the missing work. The earlier green step stays on the sheet. |
| 55.40–65.40s | A temporary implementation reaches feedback | A temporary hard-coded dropdown gets us through sooner. Implementing it properly now is another choice. Either way, run the test again. The important result is still ahead. |
| 65.40–73.13s | Update pulls implementation work | Add Update. If running it exposes a missing implementation, that failure tells us the next work. Follow it into the relevant logic. |
| 73.13–84.73s | A local red, green, refactor loop | Protect the existing behavior we touch. Then use a local test: red, green, refactor. Repeat for the details this scenario needs. Return to the acceptance test. Now those earlier steps pass. |
| 84.73–92.57s | Passing actions are not the result | But we still need Then. Add the result check and run it. The displayed result is wrong. Passing the actions did not finish the scenario. |
| 92.57–105.17s | Five people briefly split into three and two | Five people have been working together. Once the next work is clear, three can implement the returned result, using a local test loop. Two can finish the acceptance automation at the same time. Both groups serve the same scenario. |
| 105.17–114.73s | Reunite around the complete result | Then reunite, integrate, and run the complete acceptance test. All its steps pass together. Split for brief parallel exploration, and come back quickly. |
| 114.73–127.87s | Finish all the work, then take the next scenario | Done includes the required implementation and cleanup. Keep related domain concepts together from the beginning; make the structure coherent. Replace needed shortcuts under the checks. Finish the scenario completely. Only then take the next. |
| 127.87–136.80s | An advanced option starts at Then | There's also an advanced option: make Then real first, so the result is already observable. Earlier steps can begin as fakes and become real gradually. |
| 136.80–149.03s | AI helps inside the protected work | AI can help throughout this work, inside the scenario and its protective checks. Grow that scope deliberately. Acceptance Test Driven Development: work through one scenario. |

Narration: **Cedar**, synthesized by OpenAI, not a recording or
imitation of Terry. One continuous take; no internal speech is cut
to meet the runtime. Actual-audio transcription is audited against
the script, allowing equivalent digit/word number spellings.

Captions and scene boundaries follow measured word spans. Burned-in
captions are concise; the SRT preserves all spoken words. Automated
alignment is not a claim of human listening.

The quiet original series score is adapted from Problem Decomposition
to this film's duration. Narration is mastered to −18 LUFS; the score
retains the series' restrained mix. Audio assets are encoded as MP3
for local playback and rendering.

Render with the saved narration and score using the commands in the
[film guide](README.md#watch-and-reproduce). The measured script, word
alignment and performance hashes are preserved from source commit `c379fd4`;
audio regeneration is outside this restaging workflow.
