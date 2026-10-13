# Freedom and trust

The English conclusion to Terry's three-part TPS and AI films joins the two
operating pillars with the people and learning that sustain them. Jidoka
preserves learned judgment and frees attention. Just in time entrusts a capable
response to real need. Responsibility and usable authority belong with the
same people: they decide, collaborate, stop, and improve the shared product.
The result sought is less waiting, rework and changeover burden, with quality
visible and maintained.

The final test returns to the original talk: are teams more freed than
constrained by what they've built, and can we entrust them with the next real
problem? The conclusion is “Build the product. Grow the people. Keep learning.”

## Source and shared performance

[film-script.json](film-script.json) owns eight scenes, English narration and
captions, headings, artwork references, provenance and the final credit.
The target is 86 seconds at 30 fps, 1080 × 1080. The original paper palette,
Georgia headings, talk paintings, quiet TPS score and upper-right Odd-e logo
connect the trilogy. Mobile captions occupy the established bottom region and
use no more than two authored lines. The exact **Idea and film from Terry**
credit holds from 83 seconds through the end.

The English voice is OpenAI's synthetic Cedar, not Terry's recorded voice.
The retained take, actual transcript, measured words, clause placement and
hashes in [narration-en.json](narration-en.json) make the performance reusable.
[produce_audio.py](produce_audio.py) regenerates the final track offline by
default. Paid generation must be explicitly selected; retained takes are not
overwritten. The approved 86-second score keeps its final three-second fade;
the common speech envelope lowers it under measured narration.

## Accuracy and interpretation

The talk's [triad and reinforcing cycle](../../slides/tps-and-ai/slides.md),
especially claims [3](../claims/03-jidoka-enables-jit-trusts-respect-grows.md),
[10](../claims/10-freedom-and-trust-reinforce-through-jidoka.md),
[12](../claims/12-respect-for-people-who-can-think.md) and
[18](../claims/18-continuous-improvement-towards-perfection.md), own the
software argument. “Jidoka frees / Just in time entrusts” and the reinforcing
cycle are Terry's interpretation. They are not authenticated Toyota quotations.
The script records that distinction in its caption provenance.

[Toyota's TPS explanation](https://global.toyota/en/company/vision-and-philosophy/production-system/)
supports abnormality detection and stopping, less continuous watching, and
synchronized production of what is needed at the required time and quantity.
Minimum ready stocks remain compatible with Just in time.

[Toyota's TPS explanation](https://global.toyota/en/company/vision-and-philosophy/production-system/)
connects daily **kaizen** with easier work, human wisdom and developing people
who can think independently. The film explains kaizen as continuous improvement.
[Fujio Cho's 2012 message](https://www.toyota-global.com/company/history_of_toyota/75years/message/index.html)
connects respect with independent thinking and improving the work. The film
keeps both principles within Terry's TPS argument without introducing another
framework. These primary sources were checked on 13 October 2026.

The film's cost claim is reduction of waste, waiting, rework and the burden of
the next change. It promises no automatic minimum total cost, zero inventory,
or reduction in people. Trust requires capability, support, responsible
results and safeguards. Learning and trust take time.

## Art and direction

Artwork remains byte-identical to the original files listed in the JSON.
The balanced scale is the cover's visual answer to the talk's freedom/control
contrast. Responsibility and authority converge on the same collaborating
people and their shared lantern. The respect painting shows the same learner
first investigating with support, then supporting another person. The SMED
painting is an analogy for making the next change easier, not a real machine
operating procedure. A simple animated loop restages the talk's relationships
for mobile viewing. The released crane concludes the film.

New translations belong in the shared script's translation maps. Another
language edition should reuse this scene tree, timing, art, score and accepted
proof, with work focused on translation, voice, font shaping and text fit.

## Reproduce and deliver

From the default repository checkout with the locked dependencies:

```sh
pnpm --dir terry-moves render:tps-and-ai:finale
```

Select **TPSAndAIFinaleFilm** in Remotion Studio. The delivery MP4, English SRT
and cover are under `terry-moves/out/`, using the `tps-and-ai-finale` prefix.
Source, retained takes and final narration are tracked; delivery exports and
temporary review artifacts stay in the ignored output directory.
