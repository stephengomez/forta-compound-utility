Please add me as a Agent Developer [Published] on Discord, my username is ngocdiep2309#6421
# Compound Utility Rate

## Description

This agent trigger when when utility rate change 10% in 60 min

## Supported Chains

- Ethereum

## Alerts

- COMPOUND-5
  - Fired when a transaction has event when utility rate change 10% in 60 min
  - Severity is "medium"
  - Type is "Suspicious"
  - Metadata: {}

## Test Data

- 0x993ae1009e43c63c92f9bf9e559a820984fec137d495bc613c9b789cbaa9ace5
```js
{
  "name": "Compound Utilization Rate",
  "description": "Utilization Rate change out of range",
  "alertId": "COMPOUND-5",
  "protocol": "ethereum",
  "severity": "Medium",
  "type": "Suspicious",
  "metadata": {
    "totalBorrows": "1336464829045039276593",
    "totalSupply": "95136328051058"
  }
}
```

## Agent Id

```
0x22bf38a095f40f59270dce837e2526c0b0fc1c89a3f2557a6cdec20cf3597b7c
```