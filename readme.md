# freeradius-config-parser

This project exposes a simple clas API to read and write freeradius config files.

Example Parsing:
```typescript
import { File } from '@trickfilm400/freeradius-config-parser';

const obj = new File('block {\nsetting = yes\n}');

const result = obj.getElements();
//result =
//   [
//     Block {
//     children: [Value { key: 'setting', operator: '=', value: 'yes' }],
//     names: ['block'],
//   },
//   ];

//or mostly useful: specify file path of freeradius config
const obj = new File('/etc/freeradius/3.0/sites-available/default', /*parseDirectly*/ true);
//without 'parseDirectly'=true
obj.parse();
```

Example Writing:
```typescript
//to save a new file
const obj = new File("./file.conf", /*writeDirectly=*/false, [
  new Block("block", [
    new Value("setting", "=", "yes"),
    new Blank(1),
    new Comment("# comment"),
  ]),
]);

obj.write();
```



&copy; 2024

Created with ♥ by [typescript-project-scaffolding](https://github.com/Trickfilm400/typescript-project-scaffolding)