# Noto Sans TC — Listen to Your Code subset

Provided by Google Fonts under the adjacent SIL Open Font License. The complete font was downloaded from the public upstream; all subsetting happened locally. No film text was sent to a font service.

[Upstream font and license](https://github.com/google/fonts/tree/main/ofl/notosanstc)

The subset includes the current film’s Traditional Chinese characters, Latin letters, digits and punctuation. Variable font weights are preserved. Regenerate the subset when introducing other Chinese characters. `characters.txt` records the retained characters.

Local reproduction after downloading the upstream NotoSansTC variable TTF:

    pyftsubset NotoSansTC-full.ttf --text-file=characters.txt --layout-features='*' --output-file=NotoSansTC-Listen.ttf
