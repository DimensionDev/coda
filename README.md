# Coda [![Node.js CI][workflow-badge]][workflow]

Make Codec Interesting Again. ([I:b])

## Usages

```javascript
import Codec from "@dimensiondev/coda";

;(() => {
    // Build codec from utf8 string
    const codec = Codec.fromUtf8("Maskbook");
    
    // Encode to any encoding you want
    const hex = codec.toHex();
    const b64 = codec.toBase64();
    const emojis = codec.toBase1024();
})();
```

## Desc

All data will be formated into `Uint8Array` while we constructing the 
Codec class, for example, Let's format the word `Mask`!
 
### Base1024
 
| Text    | Binary       | Index   |
| :----:  | :----------: | :-----: |
| 0x1f41f | 0100110101   | 309     |
| 0x1f502 | 1000010111   | 535     |
| 0x1f3c1 | 0011011010   | 218     |
| 0x1f694 | 1100000000   | 768     |
 
### UTF-8
 
| Text   | Binary     | Index   |
| :----: | :--------: | :-----: |
| M      | 01001101   | 77      |
| a      | 01100001   | 97      |
| s      | 01110011   | 115     |
| k      | 01101011   | 107     |
 
### Base64
 
| Text   | Binary   | Index   |
| :----: | :------: | :-----: |
| T      | 010011   | 19      |
| W      | 010110   | 22      |
| F      | 000101   | 5       |
| z      | 110011   | 51      |
| a      | 011010   | 26      |
| s      | 110000   | 48      |
| =      | 000000   |         |
 
### Hex
 
| Text   | Binary   | Index   |
| :----: | :------: | :-----: |
| 4      | 0100     | 4       |
| d      | 1101     | 13      |
| 6      | 0110     | 6       |
| 1      | 0001     | 1       |
| 7      | 0111     | 7       |
| 3      | 0011     | 3       |
| 6      | 0110     | 6       |
| b      | 1011     | 11      |

## References

+ [twemojis][twemojis]
+ [Full Emoji List, v13.0][full-emoji-list]

## LICENSE

AGPL-3.0

[twemojis]: https://github.com/twitter/twemoji
[workflow]: https://github.com/DimensionDev/coda/actions?query=workflow%3A%22Node.js+CI%22
[workflow-badge]: https://github.com/DimensionDev/coda/workflows/Node.js%20CI/badge.svg
[full-emoji-list]: https://unicode.org/emoji/charts/full-emoji-list.html
