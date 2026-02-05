### Hexlet tests and linter status:
[![Actions Status](https://github.com/disya08/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/disya08/frontend-project-46/actions)

## Example

```bash
$ gendiff file1.json file2.json
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}

### Plain format example:
```bash
gendiff --format plain file1.json file2.json
```