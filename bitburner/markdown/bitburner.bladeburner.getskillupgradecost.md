<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [bitburner](./bitburner.md) &gt; [Bladeburner](./bitburner.bladeburner.md) &gt; [getSkillUpgradeCost](./bitburner.bladeburner.getskillupgradecost.md)

## Bladeburner.getSkillUpgradeCost() method

Get cost to upgrade skill.

<b>Signature:</b>

```typescript
getSkillUpgradeCost(name: string): number;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  name | string |  |

<b>Returns:</b>

number

Number of skill points needed to upgrade the specified skill.

## Remarks

RAM cost: 4 GB

This function returns the number of skill points needed to upgrade the specified skill.

The function returns -1 if an invalid skill name is passed in.

